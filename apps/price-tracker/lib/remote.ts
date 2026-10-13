import type { SupabaseClient } from "@supabase/supabase-js";

import { isCountryCode } from "./countries";
import {
  availabilities,
  notificationTypes,
  type Availability,
  type MatchStatus,
  type Notification,
  type NotificationType,
  type Offer,
  type PricePoint,
  type Product,
  type Settings,
  type Watch,
} from "./model";
import { defaultSettings, emptyState, type TrackerAction, type TrackerState } from "./tracker";

/*
 * A signed-in user's tracker in Supabase (ADR 0011): reading it into the same TrackerState the
 * screens use, and writing their changes back. Row-level security limits every query to the
 * user's own watches, matches, notifications and settings.
 */

const historyDays = 180;

type PointRow = { price: number | string | null; availability: string; checked_at: string };
type OfferRow = {
  id: string;
  product_id: string;
  domain: string;
  store_name: string;
  url: string;
  title: string;
  current_price: number | string | null;
  currency: string;
  availability: string;
  last_checked_at: string;
  stale: boolean;
  last_error: string | null;
  points?: PointRow[];
};
type MatchRow = {
  status: string;
  match_confidence: number;
  manual: boolean;
  offer: OfferRow | null;
};
type ProductRow = {
  id: string;
  gtin: string | null;
  mpn: string | null;
  title: string;
  brand: string | null;
  model: string | null;
  variant: Product["variant"] | null;
  image_url: string | null;
  category: string | null;
  country: string;
  source_url: string;
  next_check_at: string;
};
export type WatchRow = {
  id: string;
  product_id: string;
  target_price: number | string | null;
  notify_on_drop: boolean;
  notify_on_stock: boolean;
  active: boolean;
  created_at: string;
  product: ProductRow | null;
  matches: MatchRow[];
};
export type NotificationRow = {
  id: string;
  watch_id: string;
  product_id: string;
  type: string;
  payload: Notification["payload"];
  sent_at: string;
  read: boolean;
};
export type SettingsRow = {
  email: string;
  daily_digest: boolean;
  notify_on_increase: boolean;
  dedupe_hours: number;
  store_lists: Settings["storeLists"] | null;
  custom_stores: Settings["customStores"] | null;
};

const num = (value: number | string | null | undefined) =>
  value === null || value === undefined ? null : Number(value);

const availability = (value: string): Availability =>
  (availabilities as readonly string[]).includes(value) ? (value as Availability) : "unknown";

const matchStatus = (value: string): MatchStatus =>
  value === "accepted" || value === "possible" || value === "rejected" ? value : "possible";

/** Database rows as the screens' state. */
export function rowsToState(
  watches: WatchRow[],
  notifications: NotificationRow[],
  settings: SettingsRow | null,
): TrackerState {
  const state: TrackerState = { ...emptyState, history: {}, nextCheckAt: {} };
  const products: Product[] = [];
  const offers: Offer[] = [];
  const watchList: Watch[] = [];

  for (const row of watches) {
    const p = row.product;
    if (!p || !isCountryCode(p.country)) continue;
    products.push({
      id: p.id,
      title: p.title,
      brand: p.brand ?? undefined,
      model: p.model ?? undefined,
      gtin: p.gtin ?? undefined,
      mpn: p.mpn ?? undefined,
      variant: p.variant ?? {},
      imageUrl: p.image_url ?? undefined,
      category: p.category ?? undefined,
      country: p.country,
      sourceUrl: p.source_url,
      createdAt: Date.parse(row.created_at),
    });
    state.nextCheckAt[p.id] = Date.parse(p.next_check_at);
    watchList.push({
      id: row.id,
      productId: p.id,
      targetPrice: num(row.target_price),
      notifyOnDrop: row.notify_on_drop,
      notifyOnStock: row.notify_on_stock,
      active: row.active,
      createdAt: Date.parse(row.created_at),
    });
    for (const match of row.matches) {
      const o = match.offer;
      if (!o) continue;
      offers.push({
        id: o.id,
        productId: o.product_id,
        storeId: o.domain,
        storeName: o.store_name,
        domain: o.domain,
        url: o.url,
        title: o.title,
        currentPrice: num(o.current_price),
        currency: o.currency,
        availability: availability(o.availability),
        lastCheckedAt: Date.parse(o.last_checked_at),
        matchConfidence: match.match_confidence,
        status: matchStatus(match.status),
        manual: match.manual || undefined,
        stale: o.stale || undefined,
        lastError: o.last_error ?? undefined,
      });
      state.history[o.id] = (o.points ?? [])
        .map((point): PricePoint => ({
          price: num(point.price),
          availability: availability(point.availability),
          checkedAt: Date.parse(point.checked_at),
        }))
        .sort((a, b) => a.checkedAt - b.checkedAt);
    }
  }

  return {
    ...state,
    products,
    offers,
    watches: watchList,
    notifications: notifications
      .filter((n) => (notificationTypes as readonly string[]).includes(n.type))
      .map((n) => ({
        id: n.id,
        watchId: n.watch_id,
        productId: n.product_id,
        type: n.type as NotificationType,
        payload: n.payload,
        sentAt: Date.parse(n.sent_at),
        read: n.read,
      })),
    settings: settings
      ? {
          email: settings.email,
          dailyDigest: settings.daily_digest,
          notifyOnIncrease: settings.notify_on_increase,
          dedupeHours: settings.dedupe_hours,
          storeLists: settings.store_lists ?? {},
          customStores: settings.custom_stores ?? {},
        }
      : defaultSettings,
  };
}

/** Reads the signed-in user's whole tracker. */
export async function loadRemote(db: SupabaseClient, now = Date.now()): Promise<TrackerState> {
  const since = new Date(now - historyDays * 86_400_000).toISOString();
  const [watches, notifications, settings] = await Promise.all([
    db
      .from("pt_watches")
      .select(
        "*, product:pt_products(*), matches:pt_watch_offers(status, match_confidence, manual, offer:pt_offers(*, points:pt_price_points(price, availability, checked_at)))",
      )
      .gte("matches.offer.points.checked_at", since)
      .order("created_at", { ascending: false }),
    db.from("pt_notifications").select("*").order("sent_at", { ascending: false }).limit(200),
    db.from("pt_settings").select("*").maybeSingle(),
  ]);
  const error = watches.error ?? notifications.error ?? settings.error;
  if (error) throw new Error(error.message);
  return rowsToState(
    (watches.data ?? []) as WatchRow[],
    (notifications.data ?? []) as NotificationRow[],
    (settings.data ?? null) as SettingsRow | null,
  );
}

function settingsRow(userId: string, settings: Settings) {
  return {
    user_id: userId,
    email: settings.email,
    daily_digest: settings.dailyDigest,
    notify_on_increase: settings.notifyOnIncrease,
    dedupe_hours: settings.dedupeHours,
    store_lists: settings.storeLists,
    custom_stores: settings.customStores,
  };
}

const check = ({ error }: { error: { message: string } | null }) => {
  if (error) throw new Error(error.message);
};

/**
 * Saves a change the user made. `next` is the state after the change, already shown on screen.
 * Adding products and offers and recording checks go through the Edge Function instead.
 */
export async function applyRemote(
  db: SupabaseClient,
  userId: string,
  action: TrackerAction,
  next: TrackerState,
) {
  switch (action.type) {
    case "updateWatch": {
      const { patch } = action;
      const row: Record<string, unknown> = {};
      if (patch.targetPrice !== undefined) row.target_price = patch.targetPrice;
      if (patch.notifyOnDrop !== undefined) row.notify_on_drop = patch.notifyOnDrop;
      if (patch.notifyOnStock !== undefined) row.notify_on_stock = patch.notifyOnStock;
      if (patch.active !== undefined) row.active = patch.active;
      check(await db.from("pt_watches").update(row).eq("product_id", action.productId));
      return;
    }
    case "setOfferStatus":
      check(
        await db
          .from("pt_watch_offers")
          .update({ status: action.status })
          .eq("offer_id", action.offerId),
      );
      return;
    case "removeProduct":
      check(await db.from("pt_watches").delete().eq("product_id", action.productId));
      return;
    case "markRead": {
      const query = db.from("pt_notifications").update({ read: true });
      check(await (action.ids ? query.in("id", action.ids) : query.eq("read", false)));
      return;
    }
    case "clearNotifications":
      check(await db.from("pt_notifications").delete().eq("user_id", userId));
      return;
    case "updateSettings":
    case "rememberStores":
    case "forgetStores":
      check(await db.from("pt_settings").upsert(settingsRow(userId, next.settings)));
      return;
    case "replace":
      // "Delete everything": the user's watches (with their matches), alerts and settings.
      check(await db.from("pt_watches").delete().eq("user_id", userId));
      check(await db.from("pt_notifications").delete().eq("user_id", userId));
      check(await db.from("pt_settings").delete().eq("user_id", userId));
      return;
    case "addProduct":
    case "addOffer":
    case "recordChecks":
      return;
  }
}
