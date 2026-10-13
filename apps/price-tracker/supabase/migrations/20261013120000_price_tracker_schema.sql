-- Price Tracker schema (ADR 0011). The catalog (products, offers, prices) is shared by every
-- user and written only by the price-tracker Edge Function (service role). Watches, matches,
-- notifications and settings belong to one user each.

create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;

-- Catalog ---------------------------------------------------------------------------------

create table public.pt_products (
  id uuid primary key default gen_random_uuid(),
  gtin text unique,
  mpn text,
  title text not null,
  brand text,
  model text,
  variant jsonb not null default '{}'::jsonb,
  image_url text,
  category text,
  country text not null,
  source_url text not null unique,
  created_at timestamptz not null default now(),
  next_check_at timestamptz not null default now(),
  check_failures integer not null default 0
);

create index pt_products_next_check_at_idx on public.pt_products (next_check_at);

create table public.pt_offers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.pt_products (id) on delete cascade,
  domain text not null,
  store_name text not null,
  url text not null,
  title text not null,
  current_price numeric(12, 2),
  currency text not null,
  availability text not null default 'unknown'
    check (availability in ('in_stock', 'preorder', 'out_of_stock', 'unknown')),
  last_checked_at timestamptz not null default now(),
  stale boolean not null default false,
  -- Why the last check failed, such as "blocked" (the store refused automated requests).
  last_error text,
  created_at timestamptz not null default now(),
  unique (product_id, url)
);

create index pt_offers_product_id_idx on public.pt_offers (product_id);

create table public.pt_price_points (
  id bigint generated always as identity primary key,
  offer_id uuid not null references public.pt_offers (id) on delete cascade,
  price numeric(12, 2),
  availability text not null
    check (availability in ('in_stock', 'preorder', 'out_of_stock', 'unknown')),
  checked_at timestamptz not null default now()
);

create index pt_price_points_offer_checked_idx on public.pt_price_points (offer_id, checked_at);

-- Per user ----------------------------------------------------------------------------------

create table public.pt_watches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  product_id uuid not null references public.pt_products (id) on delete cascade,
  target_price numeric(12, 2),
  notify_on_drop boolean not null default true,
  notify_on_stock boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create index pt_watches_product_id_idx on public.pt_watches (product_id);

-- Whether a user counts an offer as their product: accepted, a possible match, or rejected.
create table public.pt_watch_offers (
  watch_id uuid not null references public.pt_watches (id) on delete cascade,
  offer_id uuid not null references public.pt_offers (id) on delete cascade,
  status text not null check (status in ('accepted', 'possible', 'rejected')),
  match_confidence real not null default 1,
  manual boolean not null default false,
  primary key (watch_id, offer_id)
);

create index pt_watch_offers_offer_id_idx on public.pt_watch_offers (offer_id);

create table public.pt_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  watch_id uuid not null references public.pt_watches (id) on delete cascade,
  product_id uuid not null references public.pt_products (id) on delete cascade,
  type text not null
    check (type in ('PRICE_DROP', 'PRICE_INCREASE', 'BELOW_TARGET', 'BACK_IN_STOCK', 'OUT_OF_STOCK')),
  payload jsonb not null default '{}'::jsonb,
  sent_at timestamptz not null default now(),
  read boolean not null default false
);

create index pt_notifications_user_sent_idx on public.pt_notifications (user_id, sent_at desc);
create index pt_notifications_watch_id_idx on public.pt_notifications (watch_id);
create index pt_notifications_product_id_idx on public.pt_notifications (product_id);

create table public.pt_settings (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  email text not null default '',
  daily_digest boolean not null default false,
  notify_on_increase boolean not null default false,
  dedupe_hours integer not null default 12 check (dedupe_hours between 1 and 168),
  store_lists jsonb not null default '{}'::jsonb,
  custom_stores jsonb not null default '{}'::jsonb
);

-- Row-level security ------------------------------------------------------------------------

alter table public.pt_products enable row level security;
alter table public.pt_offers enable row level security;
alter table public.pt_price_points enable row level security;
alter table public.pt_watches enable row level security;
alter table public.pt_watch_offers enable row level security;
alter table public.pt_notifications enable row level security;
alter table public.pt_settings enable row level security;

-- The catalog is readable by signed-in users; only the service role writes it.
create policy "Signed-in users read products" on public.pt_products
  for select to authenticated using (true);
create policy "Signed-in users read offers" on public.pt_offers
  for select to authenticated using (true);
create policy "Signed-in users read prices" on public.pt_price_points
  for select to authenticated using (true);

create policy "Users read their watches" on public.pt_watches
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users update their watches" on public.pt_watches
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Users delete their watches" on public.pt_watches
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users read their matches" on public.pt_watch_offers
  for select to authenticated using (
    exists (select 1 from public.pt_watches w where w.id = watch_id and w.user_id = (select auth.uid()))
  );
create policy "Users update their matches" on public.pt_watch_offers
  for update to authenticated using (
    exists (select 1 from public.pt_watches w where w.id = watch_id and w.user_id = (select auth.uid()))
  ) with check (
    exists (select 1 from public.pt_watches w where w.id = watch_id and w.user_id = (select auth.uid()))
  );

create policy "Users read their notifications" on public.pt_notifications
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users update their notifications" on public.pt_notifications
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Users delete their notifications" on public.pt_notifications
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users read their settings" on public.pt_settings
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users create their settings" on public.pt_settings
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update their settings" on public.pt_settings
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Users delete their settings" on public.pt_settings
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Users may only change their own preferences on a watch or match, not which product or offer
-- it points at.
revoke update on public.pt_watches from authenticated;
grant update (target_price, notify_on_drop, notify_on_stock, active) on public.pt_watches to authenticated;
revoke update on public.pt_watch_offers from authenticated;
grant update (status) on public.pt_watch_offers to authenticated;
revoke update on public.pt_notifications from authenticated;
grant update (read) on public.pt_notifications to authenticated;
