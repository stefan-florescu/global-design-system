import { describe, expect, it } from "vitest";

import {
  bestOffer,
  dedupe,
  detectChanges,
  eventsForWatch,
  isAnomalous,
  targetEvent,
} from "./changes";
import type { Notification, Offer, Watch } from "./model";
import { nextCheckDelay, nextDomainSlot } from "./schedule";
import { defaultSettings } from "./tracker";

const offer = (id: string, price: number | null, extra: Partial<Offer> = {}): Offer => ({
  id,
  productId: "p",
  storeId: id,
  storeName: id,
  domain: `${id}.ro`,
  url: `https://${id}.ro`,
  title: "",
  currentPrice: price,
  currency: "RON",
  availability: "in_stock",
  lastCheckedAt: 0,
  matchConfidence: 1,
  status: "accepted",
  ...extra,
});

const watch: Watch = {
  id: "w",
  productId: "p",
  targetPrice: 100,
  notifyOnDrop: true,
  notifyOnStock: false,
  active: true,
  createdAt: 0,
};

describe("detectChanges", () => {
  it("emits price drops and rises, ignoring rounding", () => {
    expect(
      detectChanges(
        "o",
        { price: 100, availability: "in_stock" },
        { price: 90, availability: "in_stock" },
      ),
    ).toEqual([{ type: "PRICE_DROP", offerId: "o", oldPrice: 100, newPrice: 90 }]);
    expect(
      detectChanges(
        "o",
        { price: 100, availability: "in_stock" },
        { price: 110, availability: "in_stock" },
      )[0]?.type,
    ).toBe("PRICE_INCREASE");
    expect(
      detectChanges(
        "o",
        { price: 100, availability: "in_stock" },
        { price: 100.2, availability: "in_stock" },
      ),
    ).toEqual([]);
  });

  it("emits stock changes", () => {
    expect(
      detectChanges(
        "o",
        { price: 1, availability: "out_of_stock" },
        { price: 1, availability: "in_stock" },
      )[0]?.type,
    ).toBe("BACK_IN_STOCK");
    expect(
      detectChanges(
        "o",
        { price: 1, availability: "preorder" },
        { price: 1, availability: "out_of_stock" },
      )[0]?.type,
    ).toBe("OUT_OF_STOCK");
  });

  it("needs a previous check", () => {
    expect(detectChanges("o", undefined, { price: 1, availability: "in_stock" })).toEqual([]);
  });
});

describe("isAnomalous", () => {
  it("flags a 90% drop, a tenfold rise and zero prices", () => {
    const before = { price: 1000, availability: "in_stock" as const };
    expect(isAnomalous(before, { price: 99, availability: "in_stock" })).toBe(true);
    expect(isAnomalous(before, { price: 10_001, availability: "in_stock" })).toBe(true);
    expect(isAnomalous(before, { price: 0, availability: "in_stock" })).toBe(true);
    expect(isAnomalous(before, { price: 500, availability: "in_stock" })).toBe(false);
  });
});

describe("bestOffer", () => {
  it("prefers the cheapest available, accepted, fresh offer", () => {
    const offers = [
      offer("a", 90, { availability: "out_of_stock" }),
      offer("b", 80, { status: "possible" }),
      offer("c", 95),
      offer("d", 99),
      offer("e", 70, { stale: true }),
    ];
    expect(bestOffer(offers)?.id).toBe("c");
  });
});

describe("targetEvent", () => {
  it("fires once when the best price crosses the target", () => {
    expect(targetEvent(watch, offer("a", 120), offer("a", 99))?.type).toBe("BELOW_TARGET");
    expect(targetEvent(watch, offer("a", 99), offer("a", 95))).toBeUndefined();
    expect(
      targetEvent({ ...watch, targetPrice: null }, offer("a", 120), offer("a", 99)),
    ).toBeUndefined();
  });
});

describe("eventsForWatch", () => {
  it("keeps the events the watch asks for", () => {
    const events = [
      { type: "PRICE_DROP" as const, offerId: "o" },
      { type: "PRICE_INCREASE" as const, offerId: "o" },
      { type: "BACK_IN_STOCK" as const, offerId: "o" },
      { type: "BELOW_TARGET" as const, offerId: "o" },
    ];
    expect(eventsForWatch(events, watch, defaultSettings).map((e) => e.type)).toEqual([
      "PRICE_DROP",
      "BELOW_TARGET",
    ]);
    expect(eventsForWatch(events, { ...watch, active: false }, defaultSettings)).toEqual([]);
  });
});

describe("dedupe", () => {
  it("drops an alert already sent for the same change within the window", () => {
    const sent: Notification = {
      id: "n",
      watchId: "w",
      productId: "p",
      type: "PRICE_DROP",
      payload: { offerId: "o", storeName: "", currency: "RON", newPrice: 90 },
      sentAt: 0,
      read: false,
    };
    const event = { type: "PRICE_DROP" as const, offerId: "o", newPrice: 90 };
    expect(dedupe([event], [sent], 3_600_000, 12)).toEqual([]);
    expect(dedupe([event], [sent], 13 * 3_600_000, 12)).toEqual([event]);
    expect(dedupe([{ ...event, newPrice: 85 }], [sent], 3_600_000, 12)).toHaveLength(1);
  });
});

describe("nextCheckDelay", () => {
  const hour = 3_600_000;
  it("checks busy products every 6h and others every 12h, with jitter", () => {
    expect(nextCheckDelay({ watchers: 1, now: 0, random: 0.5 })).toBe(12 * hour);
    expect(nextCheckDelay({ watchers: 12, now: 0, random: 0.5 })).toBe(6 * hour);
    expect(nextCheckDelay({ watchers: 1, lastChangeAt: 0, now: hour, random: 0.5 })).toBe(6 * hour);
    expect(nextCheckDelay({ watchers: 1, now: 0, random: 0 })).toBe(12 * hour * 0.9);
  });

  it("backs off after failures", () => {
    expect(nextCheckDelay({ watchers: 1, failures: 3, now: 0, random: 0.5 })).toBe(4 * hour);
    expect(nextCheckDelay({ watchers: 1, failures: 20, now: 0, random: 0.5 })).toBe(48 * hour);
  });

  it("spaces requests to one domain", () => {
    expect(nextDomainSlot(undefined, 100, 50)).toBe(100);
    expect(nextDomainSlot(80, 100, 50)).toBe(130);
  });
});
