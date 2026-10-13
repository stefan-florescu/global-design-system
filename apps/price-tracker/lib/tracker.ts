import {
  bestOffer,
  dedupe,
  detectChanges,
  eventsForWatch,
  isAnomalous,
  targetEvent,
  type ChangeEvent,
} from "./changes";
import { isCountryCode, type CountryCode } from "./countries";
import {
  availabilities,
  notificationTypes,
  type Availability,
  type MatchStatus,
  type Notification,
  type Offer,
  type PricePoint,
  type Product,
  type Settings,
  type Watch,
} from "./model";
import type { CheckResult } from "./source/types";
import type { StoreChoice } from "./store-choice";

/*
 * Everything the tracker stores, and every change to it as a pure reducer, so the rules (what a
 * check records, which alerts it raises) are tested without a browser.
 */

export type TrackerState = {
  products: Product[];
  offers: Offer[];
  /** Price checks per offer id, oldest first. */
  history: Record<string, PricePoint[]>;
  watches: Watch[];
  notifications: Notification[];
  /** When each product is due its next check (plan T3.9). */
  nextCheckAt: Record<string, number>;
  settings: Settings;
};

/** Free-tier limit (plan T7.3), to keep scraping costs in check. */
export const maxWatchedProducts = 50;

/** Notifications kept: older ones are dropped. */
const maxNotifications = 200;

export const defaultSettings: Settings = {
  email: "",
  dailyDigest: false,
  notifyOnIncrease: false,
  dedupeHours: 12,
  storeLists: {},
  customStores: {},
};

export const emptyState: TrackerState = {
  products: [],
  offers: [],
  history: {},
  watches: [],
  notifications: [],
  nextCheckAt: {},
  settings: defaultSettings,
};

export type TrackerAction =
  | {
      type: "addProduct";
      product: Product;
      watch: Watch;
      offers: Offer[];
      history: Record<string, PricePoint[]>;
      nextCheckAt: number;
    }
  | { type: "removeProduct"; productId: string }
  | { type: "updateWatch"; productId: string; patch: Partial<Omit<Watch, "id" | "productId">> }
  | { type: "setOfferStatus"; offerId: string; status: MatchStatus }
  | { type: "addOffer"; offer: Offer; history: PricePoint[] }
  | {
      type: "recordChecks";
      productId: string;
      now: number;
      results: { offerId: string; result: CheckResult; backfill?: PricePoint[] }[];
      nextCheckAt: number;
    }
  | { type: "markRead"; ids?: string[] }
  | { type: "clearNotifications" }
  | { type: "updateSettings"; patch: Partial<Settings> }
  /** Remembers the websites chosen for a product, to suggest them next time. */
  | { type: "rememberStores"; country: CountryCode; domains: string[]; added: StoreChoice[] }
  /** Forgets a country's remembered choice and added websites. */
  | { type: "forgetStores"; country: CountryCode }
  | { type: "replace"; state: TrackerState };

function recordChecks(
  state: TrackerState,
  action: Extract<TrackerAction, { type: "recordChecks" }>,
): TrackerState {
  const productOffers = state.offers.filter((o) => o.productId === action.productId);
  const watch = state.watches.find((w) => w.productId === action.productId);
  const bestBefore = bestOffer(productOffers);
  const history = { ...state.history };
  const events: ChangeEvent[] = [];

  const offers = state.offers.map((offer) => {
    const entry = action.results.find((r) => r.offerId === offer.id);
    if (!entry) return offer;
    if (!entry.result.ok) return { ...offer, lastCheckedAt: action.now };

    const next = entry.result.snapshot;
    const past = history[offer.id] ?? [];
    const previous = past.at(-1);
    // A broken page or a misread price: keep the last good one and flag the offer (plan T3.10).
    if (isAnomalous(previous, next)) return { ...offer, stale: true, lastCheckedAt: action.now };

    const backfill = (entry.backfill ?? []).filter(
      (p) => p.checkedAt > (previous?.checkedAt ?? 0) && p.checkedAt < action.now,
    );
    history[offer.id] = [...past, ...backfill, { ...next, checkedAt: action.now }];
    if (offer.status === "accepted") {
      events.push(...detectChanges(offer.id, previous, next));
    }
    return {
      ...offer,
      currentPrice: next.price,
      availability: next.availability,
      lastCheckedAt: action.now,
      stale: false,
    };
  });

  let notifications = state.notifications;
  if (watch) {
    const target = targetEvent(
      watch,
      bestBefore,
      bestOffer(offers.filter((o) => o.productId === action.productId)),
    );
    if (target) events.push(target);
    const wanted = dedupe(
      eventsForWatch(events, watch, state.settings),
      state.notifications,
      action.now,
      state.settings.dedupeHours,
    );
    const created = wanted.map((event): Notification => {
      const offer = offers.find((o) => o.id === event.offerId);
      return {
        id: `${event.offerId}:${event.type}:${action.now}`,
        watchId: watch.id,
        productId: action.productId,
        type: event.type,
        payload: {
          offerId: event.offerId,
          storeName: offer?.storeName ?? "",
          currency: offer?.currency ?? "",
          oldPrice: event.oldPrice,
          newPrice: event.newPrice,
        },
        sentAt: action.now,
        read: false,
      };
    });
    notifications = [...created, ...notifications].slice(0, maxNotifications);
  }

  return {
    ...state,
    offers,
    history,
    notifications,
    nextCheckAt: { ...state.nextCheckAt, [action.productId]: action.nextCheckAt },
  };
}

export function trackerReducer(state: TrackerState, action: TrackerAction): TrackerState {
  switch (action.type) {
    case "addProduct": {
      if (state.products.some((p) => p.id === action.product.id)) return state;
      if (state.products.length >= maxWatchedProducts) return state;
      return {
        ...state,
        products: [action.product, ...state.products],
        watches: [action.watch, ...state.watches],
        offers: [...state.offers, ...action.offers],
        history: { ...state.history, ...action.history },
        nextCheckAt: { ...state.nextCheckAt, [action.product.id]: action.nextCheckAt },
      };
    }
    case "removeProduct": {
      const offerIds = new Set(
        state.offers.filter((o) => o.productId === action.productId).map((o) => o.id),
      );
      const nextCheckAt = { ...state.nextCheckAt };
      delete nextCheckAt[action.productId];
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.productId),
        watches: state.watches.filter((w) => w.productId !== action.productId),
        offers: state.offers.filter((o) => !offerIds.has(o.id)),
        history: Object.fromEntries(
          Object.entries(state.history).filter(([id]) => !offerIds.has(id)),
        ),
        notifications: state.notifications.filter((n) => n.productId !== action.productId),
        nextCheckAt,
      };
    }
    case "updateWatch": {
      return {
        ...state,
        watches: state.watches.map((w) =>
          w.productId === action.productId ? { ...w, ...action.patch } : w,
        ),
      };
    }
    case "setOfferStatus": {
      return {
        ...state,
        offers: state.offers.map((o) =>
          o.id === action.offerId
            ? {
                ...o,
                status: action.status,
                matchConfidence: action.status === "accepted" ? 1 : o.matchConfidence,
              }
            : o,
        ),
      };
    }
    case "addOffer": {
      const existing = state.offers.find(
        (o) => o.productId === action.offer.productId && o.url === action.offer.url,
      );
      if (existing) {
        // Adding a rejected or possible store again confirms it.
        return trackerReducer(state, {
          type: "setOfferStatus",
          offerId: existing.id,
          status: "accepted",
        });
      }
      // A store's link replaces its unconfirmed or rejected listing: one row per store.
      const replaced = new Set(
        state.offers
          .filter(
            (o) =>
              o.productId === action.offer.productId &&
              o.domain === action.offer.domain &&
              o.status !== "accepted",
          )
          .map((o) => o.id),
      );
      const history = { ...state.history, [action.offer.id]: action.history };
      for (const id of replaced) delete history[id];
      return {
        ...state,
        offers: [...state.offers.filter((o) => !replaced.has(o.id)), action.offer],
        history,
      };
    }
    case "recordChecks":
      return recordChecks(state, action);
    case "markRead": {
      const ids = action.ids ? new Set(action.ids) : undefined;
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          !ids || ids.has(n.id) ? { ...n, read: true } : n,
        ),
      };
    }
    case "clearNotifications":
      return { ...state, notifications: [] };
    case "updateSettings":
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case "rememberStores": {
      const known = state.settings.customStores[action.country] ?? [];
      const added = action.added.filter(
        (store, i, all) =>
          !known.some((k) => k.domain === store.domain) &&
          all.findIndex((s) => s.domain === store.domain) === i,
      );
      return {
        ...state,
        settings: {
          ...state.settings,
          storeLists: { ...state.settings.storeLists, [action.country]: [...action.domains] },
          customStores: { ...state.settings.customStores, [action.country]: [...known, ...added] },
        },
      };
    }
    case "forgetStores": {
      const storeLists = { ...state.settings.storeLists };
      const customStores = { ...state.settings.customStores };
      delete storeLists[action.country];
      delete customStores[action.country];
      return { ...state, settings: { ...state.settings, storeLists, customStores } };
    }
    case "replace":
      return action.state;
  }
}

/* ---------- Saving: history is stored as compact tuples to stay within localStorage's ~5 MB. */

const availabilityCodes = availabilities;
type SavedPoint = [checkedAt: number, price: number | null, availability: number];
type SavedState = Omit<TrackerState, "history"> & {
  version: 1;
  history: Record<string, SavedPoint[]>;
};

export function serialize(state: TrackerState): string {
  const saved: SavedState = {
    ...state,
    version: 1,
    history: Object.fromEntries(
      Object.entries(state.history).map(([id, points]) => [
        id,
        points.map((p): SavedPoint => [
          p.checkedAt,
          p.price,
          availabilityCodes.indexOf(p.availability),
        ]),
      ]),
    ),
  };
  return JSON.stringify(saved);
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isString = (value: unknown): value is string => typeof value === "string";
const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);
const isPrice = (value: unknown): value is number | null => value === null || isNumber(value);

function isProduct(value: unknown): value is Product {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.title) &&
    isString(value.sourceUrl) &&
    isCountryCode(value.country) &&
    isRecord(value.variant)
  );
}

function isOffer(value: unknown): value is Offer {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.productId) &&
    isString(value.url) &&
    isString(value.storeName) &&
    isString(value.currency) &&
    isPrice(value.currentPrice) &&
    (availabilities as readonly unknown[]).includes(value.availability) &&
    ["accepted", "possible", "rejected"].includes(value.status as string)
  );
}

function isWatch(value: unknown): value is Watch {
  return (
    isRecord(value) && isString(value.id) && isString(value.productId) && isPrice(value.targetPrice)
  );
}

function isNotification(value: unknown): value is Notification {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.productId) &&
    (notificationTypes as readonly unknown[]).includes(value.type) &&
    isRecord(value.payload) &&
    isNumber(value.sentAt)
  );
}

function parseSettings(value: unknown): Settings {
  if (!isRecord(value)) return defaultSettings;
  const storeLists: Settings["storeLists"] = {};
  const customStores: Settings["customStores"] = {};
  if (isRecord(value.storeLists)) {
    for (const [country, domains] of Object.entries(value.storeLists)) {
      if (isCountryCode(country) && Array.isArray(domains)) {
        storeLists[country] = domains.filter(isString);
      }
    }
  }
  if (isRecord(value.customStores)) {
    for (const [country, stores] of Object.entries(value.customStores)) {
      if (isCountryCode(country) && Array.isArray(stores)) {
        customStores[country] = stores.filter(
          (s): s is StoreChoice => isRecord(s) && isString(s.name) && isString(s.domain),
        );
      }
    }
  }
  return {
    email: isString(value.email) ? value.email : defaultSettings.email,
    dailyDigest:
      typeof value.dailyDigest === "boolean" ? value.dailyDigest : defaultSettings.dailyDigest,
    notifyOnIncrease:
      typeof value.notifyOnIncrease === "boolean"
        ? value.notifyOnIncrease
        : defaultSettings.notifyOnIncrease,
    dedupeHours: isNumber(value.dedupeHours) ? value.dedupeHours : defaultSettings.dedupeHours,
    storeLists,
    customStores,
  };
}

/** Reads a saved tracker, dropping anything malformed. `null` when there is nothing usable. */
export function parseState(json: string | null): TrackerState | null {
  if (!json) return null;
  let value: unknown;
  try {
    value = JSON.parse(json);
  } catch {
    return null;
  }
  if (!isRecord(value) || value.version !== 1) return null;

  const products = Array.isArray(value.products) ? value.products.filter(isProduct) : [];
  const productIds = new Set(products.map((p) => p.id));
  const offers = (Array.isArray(value.offers) ? value.offers.filter(isOffer) : []).filter((o) =>
    productIds.has(o.productId),
  );
  const history: Record<string, PricePoint[]> = {};
  if (isRecord(value.history)) {
    for (const offer of offers) {
      const points = value.history[offer.id];
      if (!Array.isArray(points)) continue;
      history[offer.id] = points
        .filter(
          (p): p is SavedPoint =>
            Array.isArray(p) && isNumber(p[0]) && isPrice(p[1]) && isNumber(p[2]),
        )
        .map(([checkedAt, price, code]) => ({
          checkedAt,
          price,
          availability: (availabilityCodes[code] ?? "unknown") as Availability,
        }));
    }
  }
  const settings = parseSettings(value.settings);
  const nextCheckAt = isRecord(value.nextCheckAt)
    ? Object.fromEntries(
        Object.entries(value.nextCheckAt).filter(([id, at]) => productIds.has(id) && isNumber(at)),
      )
    : {};

  return {
    products,
    offers,
    history,
    watches: (Array.isArray(value.watches) ? value.watches.filter(isWatch) : []).filter((w) =>
      productIds.has(w.productId),
    ),
    notifications: Array.isArray(value.notifications)
      ? value.notifications.filter(isNotification)
      : [],
    nextCheckAt: nextCheckAt as Record<string, number>,
    settings: settings as Settings,
  };
}
