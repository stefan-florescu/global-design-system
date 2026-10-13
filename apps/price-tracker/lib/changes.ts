import type {
  Availability,
  Notification,
  NotificationType,
  Offer,
  PricePoint,
  Settings,
  Watch,
} from "./model";

/*
 * What a new price check means (plan Phase 4): the changes since the previous check (T4.1),
 * which of them the user asked to hear about (T4.2), without repeating an alert (T4.4), and
 * checks too strange to trust (T3.10).
 */

export type Snapshot = Pick<PricePoint, "price" | "availability">;

export type ChangeEvent = {
  type: NotificationType;
  offerId: string;
  oldPrice?: number | null;
  newPrice?: number | null;
};

/** Changes smaller than this (0.5%) are rounding, not news. */
const minPriceChange = 0.005;

const available = (availability: Availability) =>
  availability === "in_stock" || availability === "preorder";

/** Price and stock changes of one offer between two checks. */
export function detectChanges(offerId: string, previous: Snapshot | undefined, next: Snapshot) {
  const events: ChangeEvent[] = [];
  if (!previous) return events;

  if (previous.price !== null && next.price !== null && previous.price > 0) {
    const change = (next.price - previous.price) / previous.price;
    if (Math.abs(change) >= minPriceChange) {
      events.push({
        type: change < 0 ? "PRICE_DROP" : "PRICE_INCREASE",
        offerId,
        oldPrice: previous.price,
        newPrice: next.price,
      });
    }
  }

  if (previous.availability === "out_of_stock" && available(next.availability)) {
    events.push({ type: "BACK_IN_STOCK", offerId, newPrice: next.price });
  } else if (available(previous.availability) && next.availability === "out_of_stock") {
    events.push({ type: "OUT_OF_STOCK", offerId, oldPrice: previous.price });
  }

  return events;
}

/**
 * A check that is more likely a broken page than a real price (plan T3.10): no price where there
 * was one, a 90% drop, or a tenfold rise. The offer is marked stale instead of storing it.
 */
export function isAnomalous(previous: Snapshot | undefined, next: Snapshot) {
  if (next.price !== null && next.price <= 0) return true;
  if (!previous || previous.price === null || next.price === null) return false;
  return next.price < previous.price * 0.1 || next.price > previous.price * 10;
}

/** The lowest current price among available accepted offers. */
export function bestOffer(offers: Offer[]): Offer | undefined {
  const candidates = offers.filter(
    (o) => o.status === "accepted" && o.currentPrice !== null && !o.stale,
  );
  const inStock = candidates.filter((o) => available(o.availability));
  const pool = inStock.length > 0 ? inStock : candidates;
  return pool.reduce<Offer | undefined>(
    (best, offer) =>
      !best || (offer.currentPrice ?? Infinity) < (best.currentPrice ?? Infinity) ? offer : best,
    undefined,
  );
}

/** A BELOW_TARGET event when the best price crosses the watch's target. */
export function targetEvent(
  watch: Watch,
  before: Offer | undefined,
  after: Offer | undefined,
): ChangeEvent | undefined {
  if (watch.targetPrice === null || !after || after.currentPrice === null) return undefined;
  const wasBelow =
    before?.currentPrice !== null &&
    before?.currentPrice !== undefined &&
    before.currentPrice <= watch.targetPrice;
  if (wasBelow || after.currentPrice > watch.targetPrice) return undefined;
  return {
    type: "BELOW_TARGET",
    offerId: after.id,
    oldPrice: before?.currentPrice ?? null,
    newPrice: after.currentPrice,
  };
}

/** The events this watch's preferences ask for (plan T4.2). */
export function eventsForWatch(events: ChangeEvent[], watch: Watch, settings: Settings) {
  if (!watch.active) return [];
  return events.filter((event) => {
    switch (event.type) {
      case "PRICE_DROP":
        return watch.notifyOnDrop;
      case "PRICE_INCREASE":
        return settings.notifyOnIncrease;
      case "BELOW_TARGET":
        return watch.targetPrice !== null;
      case "BACK_IN_STOCK":
      case "OUT_OF_STOCK":
        return watch.notifyOnStock;
    }
  });
}

/**
 * Drops events already sent for the same offer and change within `hours` (plan T4.4), so a price
 * bouncing between two values doesn't alert on every check.
 */
export function dedupe(
  events: ChangeEvent[],
  sent: Notification[],
  now: number,
  hours: number,
): ChangeEvent[] {
  const since = now - hours * 3_600_000;
  return events.filter(
    (event) =>
      !sent.some(
        (n) =>
          n.sentAt >= since &&
          n.type === event.type &&
          n.payload.offerId === event.offerId &&
          (n.payload.newPrice ?? null) === (event.newPrice ?? null),
      ),
  );
}
