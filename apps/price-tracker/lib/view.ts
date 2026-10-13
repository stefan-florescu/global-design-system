import { bestOffer } from "./changes";
import { countries } from "./countries";
import type { Offer, PricePoint, Product, Watch } from "./model";
import { formatPrice } from "./price";
import type { TrackerState } from "./tracker";

/*
 * What the screens show, worked out from the stored state: best prices, trends, chart series.
 */

export const day = 86_400_000;

export function offersOf(state: TrackerState, productId: string) {
  return state.offers.filter((o) => o.productId === productId);
}

export function watchOf(state: TrackerState, productId: string): Watch | undefined {
  return state.watches.find((w) => w.productId === productId);
}

/** A price in the product's country format. */
export function money(product: Pick<Product, "country">, value: number | null | undefined) {
  const { currency, locale } = countries[product.country];
  return formatPrice(value, currency, locale);
}

const axisFormatters = new Map<string, Intl.NumberFormat>();

/** A whole-number price for chart axes: "4.600 RON". */
export function moneyAxis(product: Pick<Product, "country">, value: number) {
  const { currency, locale } = countries[product.country];
  const key = `${locale}:${currency}`;
  let formatter = axisFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
    axisFormatters.set(key, formatter);
  }
  return formatter.format(value);
}

/** The latest point at or before `at`, or undefined. */
function pointAt(points: PricePoint[], at: number) {
  let found: PricePoint | undefined;
  for (const point of points) {
    if (point.checkedAt > at) break;
    found = point;
  }
  return found;
}

/** The lowest price across `offers` at a moment, from their histories. */
export function bestPriceAt(state: TrackerState, offers: Offer[], at: number) {
  let best: number | null = null;
  for (const offer of offers) {
    const point = pointAt(state.history[offer.id] ?? [], at);
    if (
      point?.price !== null &&
      point?.price !== undefined &&
      point.availability !== "out_of_stock"
    ) {
      best = best === null ? point.price : Math.min(best, point.price);
    }
  }
  return best;
}

export type Trend = { direction: "down" | "up" | "flat"; change: number };

export type ProductSummary = {
  product: Product;
  watch?: Watch;
  offers: Offer[];
  accepted: Offer[];
  best?: Offer;
  /** Best price now against a week ago. */
  trend: Trend;
  inStock: boolean;
  belowTarget: boolean;
  lastCheckedAt: number;
  possibleCount: number;
};

export function summarize(state: TrackerState, product: Product, now: number): ProductSummary {
  const offers = offersOf(state, product.id);
  const accepted = offers.filter((o) => o.status === "accepted");
  const best = bestOffer(offers);
  const weekAgo = bestPriceAt(state, accepted, now - 7 * day);
  const current = best?.currentPrice ?? null;
  let trend: Trend = { direction: "flat", change: 0 };
  if (weekAgo !== null && current !== null && weekAgo > 0) {
    const change = (current - weekAgo) / weekAgo;
    trend = { direction: Math.abs(change) < 0.005 ? "flat" : change < 0 ? "down" : "up", change };
  }
  const watch = watchOf(state, product.id);
  return {
    product,
    watch,
    offers,
    accepted,
    best,
    trend,
    inStock: accepted.some((o) => o.availability === "in_stock" || o.availability === "preorder"),
    belowTarget:
      watch?.targetPrice !== null &&
      watch?.targetPrice !== undefined &&
      current !== null &&
      current <= watch.targetPrice,
    lastCheckedAt: Math.max(product.createdAt, ...accepted.map((o) => o.lastCheckedAt)),
    possibleCount: offers.filter((o) => o.status === "possible").length,
  };
}

export type SeriesPoint = { at: number; price: number | null };

/** One offer's prices since `from` (out-of-stock checks leave a gap). */
export function offerSeries(state: TrackerState, offer: Offer, from: number): SeriesPoint[] {
  return (state.history[offer.id] ?? [])
    .filter((p) => p.checkedAt >= from)
    .map((p) => ({ at: p.checkedAt, price: p.availability === "out_of_stock" ? null : p.price }));
}

/** The best price across offers at every check since `from`. */
export function bestSeries(state: TrackerState, offers: Offer[], from: number): SeriesPoint[] {
  const times = new Set<number>();
  for (const offer of offers) {
    for (const point of state.history[offer.id] ?? [])
      if (point.checkedAt >= from) times.add(point.checkedAt);
  }
  return [...times]
    .sort((a, b) => a - b)
    .map((at) => ({ at, price: bestPriceAt(state, offers, at) }));
}

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "5 minutes ago", "yesterday". */
export function timeAgo(at: number, now: number) {
  const seconds = Math.round((at - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return "just now";
  if (abs < 3600) return relative.format(Math.round(seconds / 60), "minute");
  if (abs < 86_400) return relative.format(Math.round(seconds / 3600), "hour");
  return relative.format(Math.round(seconds / 86_400), "day");
}

const dateTime = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" });
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

export const formatDateTime = (at: number) => dateTime.format(at);
export const formatShortDate = (at: number) => shortDate.format(at);

export function formatPercent(change: number) {
  return `${change > 0 ? "+" : ""}${(change * 100).toFixed(1)}%`;
}
