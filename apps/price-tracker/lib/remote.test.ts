import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";

import { applyRemote, rowsToState, type WatchRow } from "./remote";
import { defaultSettings, emptyState, trackerReducer } from "./tracker";

const watch: WatchRow = {
  id: "w1",
  product_id: "p1",
  target_price: "999.50",
  notify_on_drop: true,
  notify_on_stock: false,
  active: true,
  created_at: "2026-10-13T08:00:00Z",
  product: {
    id: "p1",
    gtin: null,
    mpn: "MTP03RX/A",
    title: "Apple iPhone 15, 128GB, 5G, Black",
    brand: "Apple",
    model: "iPhone 15",
    variant: { storage: "128GB", color: "Black" },
    image_url: null,
    category: null,
    country: "RO",
    source_url: "https://www.emag.ro/x/pd/1/",
    next_check_at: "2026-10-13T20:00:00Z",
  },
  matches: [
    {
      status: "accepted",
      match_confidence: 1,
      manual: false,
      offer: {
        id: "o1",
        product_id: "p1",
        domain: "emag.ro",
        store_name: "eMAG",
        url: "https://www.emag.ro/x/pd/1/",
        title: "Apple iPhone 15",
        current_price: "3499.99",
        currency: "RON",
        availability: "in_stock",
        last_checked_at: "2026-10-13T08:00:00Z",
        stale: false,
        last_error: "blocked",
        points: [
          { price: "3599.99", availability: "in_stock", checked_at: "2026-10-12T08:00:00Z" },
          { price: "3499.99", availability: "in_stock", checked_at: "2026-10-11T08:00:00Z" },
        ],
      },
    },
  ],
};

describe("rowsToState", () => {
  it("maps database rows to the screens' state", () => {
    const state = rowsToState(
      [watch],
      [
        {
          id: "n1",
          watch_id: "w1",
          product_id: "p1",
          type: "PRICE_DROP",
          payload: {
            offerId: "o1",
            storeName: "eMAG",
            currency: "RON",
            oldPrice: 3599.99,
            newPrice: 3499.99,
          },
          sent_at: "2026-10-13T08:00:00Z",
          read: false,
        },
        {
          id: "n2",
          watch_id: "w1",
          product_id: "p1",
          type: "SOMETHING_ELSE",
          payload: {} as never,
          sent_at: "2026-10-13T08:00:00Z",
          read: false,
        },
      ],
      null,
    );
    expect(state.products[0]).toMatchObject({
      id: "p1",
      mpn: "MTP03RX/A",
      country: "RO",
      variant: { storage: "128GB" },
    });
    expect(state.watches[0]).toMatchObject({ targetPrice: 999.5, notifyOnStock: false });
    expect(state.offers[0]).toMatchObject({
      currentPrice: 3499.99,
      status: "accepted",
      lastError: "blocked",
    });
    // Price points sorted oldest first, as numbers.
    expect(state.history.o1?.map((p) => p.price)).toEqual([3499.99, 3599.99]);
    expect(state.notifications.map((n) => n.id)).toEqual(["n1"]);
    expect(state.nextCheckAt.p1).toBe(Date.parse("2026-10-13T20:00:00Z"));
    expect(state.settings).toEqual(defaultSettings);
  });

  it("skips watches whose product is missing", () => {
    expect(rowsToState([{ ...watch, product: null }], [], null).products).toEqual([]);
  });
});

/** A fake Supabase client that records each query's table, operation and filters. */
function fakeDb() {
  const calls: string[] = [];
  const builder = (table: string) => {
    const parts = [table];
    const chain = {
      update: (row: unknown) => (parts.push(`update ${JSON.stringify(row)}`), chain),
      delete: () => (parts.push("delete"), chain),
      upsert: (row: unknown) => (parts.push(`upsert ${JSON.stringify(row)}`), chain),
      eq: (column: string, value: unknown) => (parts.push(`${column}=${String(value)}`), chain),
      in: (column: string, values: unknown[]) => (
        parts.push(`${column} in ${values.join(",")}`),
        chain
      ),
      then: (resolve: (value: { error: null }) => void) => {
        calls.push(parts.join(" "));
        resolve({ error: null });
      },
    };
    return chain;
  };
  return { db: { from: builder } as unknown as SupabaseClient, calls };
}

describe("applyRemote", () => {
  it("saves watch preferences with the database's column names", async () => {
    const { db, calls } = fakeDb();
    await applyRemote(
      db,
      "u1",
      { type: "updateWatch", productId: "p1", patch: { targetPrice: 900, active: false } },
      emptyState,
    );
    expect(calls).toEqual(['pt_watches update {"target_price":900,"active":false} product_id=p1']);
  });

  it("saves settings as one row", async () => {
    const { db, calls } = fakeDb();
    const action = {
      type: "rememberStores" as const,
      country: "RO" as const,
      domains: ["altex.ro"],
      added: [],
    };
    await applyRemote(db, "u1", action, trackerReducer(emptyState, action));
    expect(calls[0]).toContain('"user_id":"u1"');
    expect(calls[0]).toContain('"store_lists":{"RO":["altex.ro"]}');
  });

  it("marks alerts read and deletes everything", async () => {
    const { db, calls } = fakeDb();
    await applyRemote(db, "u1", { type: "markRead", ids: ["n1"] }, emptyState);
    await applyRemote(db, "u1", { type: "replace", state: emptyState }, emptyState);
    expect(calls).toEqual([
      'pt_notifications update {"read":true} id in n1',
      "pt_watches delete user_id=u1",
      "pt_notifications delete user_id=u1",
      "pt_settings delete user_id=u1",
    ]);
  });
});
