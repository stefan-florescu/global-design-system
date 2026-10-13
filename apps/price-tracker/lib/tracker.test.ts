import { describe, expect, it } from "vitest";

import type { Offer, Product, Watch } from "./model";
import {
  emptyState,
  maxWatchedProducts,
  parseState,
  serialize,
  trackerReducer,
  type TrackerState,
} from "./tracker";

const product: Product = {
  id: "p",
  title: "Apple iPhone 15 128GB",
  variant: { storage: "128GB" },
  country: "RO",
  sourceUrl: "https://www.emag.ro/apple-iphone-15/pd/1",
  createdAt: 0,
};

const offer = (id: string, price: number, extra: Partial<Offer> = {}): Offer => ({
  id,
  productId: "p",
  storeId: id,
  storeName: id,
  domain: `${id}.ro`,
  url: `https://${id}.ro/x`,
  title: product.title,
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
  targetPrice: 950,
  notifyOnDrop: true,
  notifyOnStock: true,
  active: true,
  createdAt: 0,
};

function withProduct(): TrackerState {
  return trackerReducer(emptyState, {
    type: "addProduct",
    product,
    watch,
    offers: [offer("a", 1000), offer("b", 1100), offer("c", 900, { status: "possible" })],
    history: {
      a: [{ price: 1000, availability: "in_stock", checkedAt: 0 }],
      b: [{ price: 1100, availability: "in_stock", checkedAt: 0 }],
      c: [{ price: 900, availability: "in_stock", checkedAt: 0 }],
    },
    nextCheckAt: 10,
  });
}

const ok = (price: number, availability: "in_stock" | "out_of_stock" = "in_stock") => ({
  ok: true as const,
  snapshot: { price, availability },
});

describe("trackerReducer", () => {
  it("adds a product once, up to the free-tier limit", () => {
    const state = withProduct();
    expect(state.products).toHaveLength(1);
    expect(
      trackerReducer(state, {
        type: "addProduct",
        product,
        watch,
        offers: [],
        history: {},
        nextCheckAt: 0,
      }),
    ).toBe(state);

    const full = {
      ...emptyState,
      products: Array.from({ length: maxWatchedProducts }, (_, i) => ({ ...product, id: `${i}` })),
    };
    expect(
      trackerReducer(full, {
        type: "addProduct",
        product,
        watch,
        offers: [],
        history: {},
        nextCheckAt: 0,
      }),
    ).toBe(full);
  });

  it("records checks, appends history and raises the alerts the watch asks for", () => {
    const state = trackerReducer(withProduct(), {
      type: "recordChecks",
      productId: "p",
      now: 100,
      nextCheckAt: 200,
      results: [
        { offerId: "a", result: ok(940) },
        { offerId: "b", result: ok(1100, "out_of_stock") },
        { offerId: "c", result: ok(800) },
      ],
    });
    expect(state.offers.find((o) => o.id === "a")).toMatchObject({
      currentPrice: 940,
      lastCheckedAt: 100,
    });
    expect(state.history.a).toHaveLength(2);
    expect(state.nextCheckAt.p).toBe(200);
    // Possible matches are checked but don't alert.
    expect(state.notifications.map((n) => [n.type, n.payload.offerId])).toEqual([
      ["PRICE_DROP", "a"],
      ["OUT_OF_STOCK", "b"],
      ["BELOW_TARGET", "a"],
    ]);
  });

  it("marks an offer stale instead of storing an anomalous price", () => {
    const state = trackerReducer(withProduct(), {
      type: "recordChecks",
      productId: "p",
      now: 100,
      nextCheckAt: 200,
      results: [{ offerId: "a", result: ok(5) }],
    });
    expect(state.offers.find((o) => o.id === "a")).toMatchObject({
      currentPrice: 1000,
      stale: true,
    });
    expect(state.history.a).toHaveLength(1);
    expect(state.notifications).toEqual([]);
  });

  it("keeps the last price when a store can't be reached", () => {
    const state = trackerReducer(withProduct(), {
      type: "recordChecks",
      productId: "p",
      now: 100,
      nextCheckAt: 200,
      results: [{ offerId: "a", result: { ok: false, error: "Store temporarily unreachable" } }],
    });
    expect(state.offers.find((o) => o.id === "a")).toMatchObject({
      currentPrice: 1000,
      lastCheckedAt: 100,
    });
  });

  it("confirms and rejects matches", () => {
    let state = trackerReducer(withProduct(), {
      type: "setOfferStatus",
      offerId: "c",
      status: "accepted",
    });
    expect(state.offers.find((o) => o.id === "c")).toMatchObject({
      status: "accepted",
      matchConfidence: 1,
    });
    state = trackerReducer(state, { type: "setOfferStatus", offerId: "a", status: "rejected" });
    expect(state.offers.find((o) => o.id === "a")?.status).toBe("rejected");
  });

  it("re-adding a known store link confirms it", () => {
    const state = trackerReducer(withProduct(), {
      type: "addOffer",
      offer: offer("c2", 900, { url: "https://c.ro/x" }),
      history: [],
    });
    expect(state.offers).toHaveLength(3);
    expect(state.offers.find((o) => o.id === "c")?.status).toBe("accepted");
  });

  it("a store's link replaces its possible or rejected listing", () => {
    const state = trackerReducer(withProduct(), {
      type: "addOffer",
      offer: offer("c2", 900, { domain: "c.ro", url: "https://c.ro/other" }),
      history: [],
    });
    expect(state.offers.map((o) => o.id)).toEqual(["a", "b", "c2"]);
    expect(state.history.c).toBeUndefined();
  });

  it("removes a product with its offers, history, watch and alerts", () => {
    const checked = trackerReducer(withProduct(), {
      type: "recordChecks",
      productId: "p",
      now: 100,
      nextCheckAt: 200,
      results: [{ offerId: "a", result: ok(900) }],
    });
    const state = trackerReducer(checked, { type: "removeProduct", productId: "p" });
    expect(state).toEqual({ ...emptyState, settings: state.settings });
  });

  it("marks notifications read", () => {
    const checked = trackerReducer(withProduct(), {
      type: "recordChecks",
      productId: "p",
      now: 100,
      nextCheckAt: 200,
      results: [{ offerId: "a", result: ok(900) }],
    });
    const read = trackerReducer(checked, { type: "markRead" });
    expect(read.notifications.every((n) => n.read)).toBe(true);
  });
});

describe("saving", () => {
  it("round-trips the state", () => {
    const state = withProduct();
    expect(parseState(serialize(state))).toEqual(state);
  });

  it("drops malformed records", () => {
    const saved = JSON.parse(serialize(withProduct())) as Record<string, unknown[]>;
    saved.offers?.push({ id: "broken" });
    saved.products?.push({ id: "broken" });
    const state = parseState(JSON.stringify(saved));
    expect(state?.offers).toHaveLength(3);
    expect(state?.products).toHaveLength(1);
    expect(parseState("nope")).toBeNull();
    expect(parseState('{"version":2}')).toBeNull();
  });
});
