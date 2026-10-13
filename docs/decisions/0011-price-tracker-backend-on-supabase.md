# 0011 · The price tracker's backend runs on Supabase

- **Status:** Accepted
- **Date:** 2026-10-13
- **Deciders:** @stefan-florescu

## Context

`apps/price-tracker` needs what a static site can't provide: accounts, a database shared by every
user (a product is checked once however many people watch it), scheduled price checks, and a
server that can fetch store pages (browsers can't read other sites' pages). ADR
[0010](0010-apps-as-launcher-sections.md) keeps every app a static export served by the
launcher, which has no server code. The project plan suggested a separate worker host
(Railway/Fly) with BullMQ and Redis.

A spike from Supabase's network (October 2026) found that Romanian stores differ: Carrefour
serves search and product pages with schema.org JSON-LD; eMAG serves search pages but blocks
repeated product-page requests; Flanco, PC Garage, Vexio and Elefant sit behind Cloudflare
challenges; evoMAG rate-limits; Altex and Media Galaxy reset the connection.

## Decision

The app stays a static section of the launcher and talks to one Supabase project:

- **Auth:** Supabase Auth (email and password; Google once its OAuth client is set up), from the
  browser with the publishable key.
- **Database:** Postgres tables prefixed `pt_` in `public`. Row-level security lets users read
  the shared catalog (products, offers, prices) and only their own watches, matches,
  notifications and settings. Only the service role writes the catalog.
- **Price checks:** one Edge Function, `price-tracker`, identifies pasted links, searches the
  stores the user chose, adds products and checks prices. It reuses the app's tested parsing,
  matching and change-detection code, bundled with esbuild (`pnpm --filter
@stefan-florescu/price-tracker build:function`).
- **Schedule:** `pg_cron` calls the function every 15 minutes to check products whose
  `next_check_at` has passed (6–12 hours apart, with jitter and backoff).
- **Blocked stores:** pages are fetched directly. When a store refuses (403, 429, 511, a
  Cloudflare challenge), the offer is marked as blocked rather than given made-up data. A
  scraping service can be added later behind the same fetcher by setting the `SCRAPER_API_KEY`
  function secret.
- **Demo mode:** without signing in, the app keeps its browser-only demo with simulated prices.

## Consequences

- No new hosting: Vercel serves the site, Supabase runs the rest. ADR 0010 still holds.
- Edge Functions use plain HTTP, not a headless browser; stores that need JavaScript or block data
  centres need the scraping service.
- The publishable key and project URL are public by design and live in
  `apps/price-tracker/lib/supabase-config.ts`; secrets stay in Supabase.
- Schema changes are migrations in `apps/price-tracker/supabase/migrations`, applied to the
  project in order.

## Alternatives considered

| Option                                 | Why not                                                                                       |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| Worker on Railway/Fly + BullMQ + Redis | Two more services to run and pay for; needed only for headless browsers, which can come later |
| Next.js route handlers on Vercel       | Breaks ADR 0010 (section apps are static); no long-running or scheduled work                  |
| Affiliate product feeds                | Reliable and legal, but need affiliate accounts per network; a good later addition            |
