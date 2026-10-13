/*
 * The price tracker's data model (plan T1.3). It mirrors the tables the backend will have —
 * Product, Store, Offer, PricePoint, Watch, Notification — so the browser store can be swapped
 * for the API without reshaping the screens.
 */

import type { CountryCode } from "./countries";

/** Stock states a store page can report (plan T3.11). */
export const availabilities = ["in_stock", "preorder", "out_of_stock", "unknown"] as const;

export type Availability = (typeof availabilities)[number];

export const availabilityLabels: Record<Availability, string> = {
  in_stock: "In stock",
  preorder: "Pre-order",
  out_of_stock: "Out of stock",
  unknown: "Unknown",
};

/** The details that tell one product apart from another, such as storage or colour. */
export type Variant = {
  color?: string;
  storage?: string;
  size?: string;
};

/** What we know about a product after reading its page (plan T3.1–T3.4). */
export type ProductIdentity = {
  title: string;
  brand?: string;
  model?: string;
  /** EAN / UPC barcode: the strongest proof that two pages sell the same product. */
  gtin?: string;
  /** The manufacturer's part number. */
  mpn?: string;
  variant: Variant;
  imageUrl?: string;
  category?: string;
  country: CountryCode;
};

export type Product = ProductIdentity & {
  id: string;
  /** The link the product was added from. */
  sourceUrl: string;
  createdAt: number;
};

export type Store = {
  id: string;
  name: string;
  domain: string;
  country: CountryCode;
  /** How its pages are read: the generic JSON-LD extractor, a custom adapter, or search. */
  scraperType: "jsonld" | "custom" | "search";
};

/**
 * `accepted` offers show in the store table and count towards the best price; `possible` ones
 * wait for the user to confirm them; `rejected` ones were marked "Not the same product".
 */
export type MatchStatus = "accepted" | "possible" | "rejected";

/** One store's listing of a product. */
export type Offer = {
  id: string;
  productId: string;
  storeId: string;
  storeName: string;
  domain: string;
  url: string;
  /** The title on the store's page, shown so users can judge a possible match. */
  title: string;
  /** `null` until a check has read a price. */
  currentPrice: number | null;
  currency: string;
  availability: Availability;
  lastCheckedAt: number;
  /** 0–1, from the matching engine (plan T3.6); 1 for links the user added. */
  matchConfidence: number;
  status: MatchStatus;
  /** Added with "Add a store link manually". */
  manual?: boolean;
  /** The last check looked wrong (plan T3.10): the price shown is the last good one. */
  stale?: boolean;
};

/** One price check of an offer. History is append-only. */
export type PricePoint = {
  price: number | null;
  availability: Availability;
  checkedAt: number;
};

/** A user's subscription to a product's price and stock. */
export type Watch = {
  id: string;
  productId: string;
  /** Alert when the best price is at or below this. */
  targetPrice: number | null;
  notifyOnDrop: boolean;
  notifyOnStock: boolean;
  active: boolean;
  createdAt: number;
};

export const notificationTypes = [
  "PRICE_DROP",
  "PRICE_INCREASE",
  "BELOW_TARGET",
  "BACK_IN_STOCK",
  "OUT_OF_STOCK",
] as const;

export type NotificationType = (typeof notificationTypes)[number];

export type Notification = {
  id: string;
  watchId: string;
  productId: string;
  type: NotificationType;
  payload: {
    offerId: string;
    storeName: string;
    currency: string;
    oldPrice?: number | null;
    newPrice?: number | null;
  };
  sentAt: number;
  read: boolean;
};

export type Settings = {
  /** Where alerts will be emailed once email delivery is connected. */
  email: string;
  /** One email a day with every change, instead of one per change. */
  dailyDigest: boolean;
  /** Also alert when a price goes up. */
  notifyOnIncrease: boolean;
  /** No repeat alert for the same change within this many hours (plan T4.4). */
  dedupeHours: number;
  /** The websites last chosen to search in each country, suggested for the next product. */
  storeLists: Partial<Record<CountryCode, string[]>>;
  /** Websites the user added to a country's list of stores. */
  customStores: Partial<Record<CountryCode, { name: string; domain: string }[]>>;
};
