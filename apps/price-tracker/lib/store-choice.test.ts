import { describe, expect, it } from "vitest";

import { parseStoreInput, storeOptions, suggestedStores } from "./store-choice";
import { defaultSettings, emptyState, trackerReducer } from "./tracker";

const curatedRO = storeOptions(defaultSettings, "RO").map((s) => s.domain);

describe("suggestedStores", () => {
  it("ticks every curated store the first time, except the link's own store", () => {
    const suggested = suggestedStores(defaultSettings, "RO", "www.emag.ro");
    expect(suggested).toEqual(curatedRO.filter((d) => d !== "emag.ro"));
  });

  it("suggests the last choice for the country, with websites the user added", () => {
    const state = trackerReducer(emptyState, {
      type: "rememberStores",
      country: "RO",
      domains: ["altex.ro", "magazin-mic.ro"],
      added: [{ name: "magazin-mic.ro", domain: "magazin-mic.ro" }],
    });
    expect(storeOptions(state.settings, "RO").at(-1)).toEqual({
      name: "magazin-mic.ro",
      domain: "magazin-mic.ro",
    });
    expect(suggestedStores(state.settings, "RO", "emag.ro")).toEqual([
      "altex.ro",
      "magazin-mic.ro",
    ]);
    // Other countries keep their own suggestions.
    expect(suggestedStores(state.settings, "DE", "amazon.de")).toHaveLength(7);
  });

  it("forgets a country's choice", () => {
    let state = trackerReducer(emptyState, {
      type: "rememberStores",
      country: "RO",
      domains: [],
      added: [{ name: "a.ro", domain: "a.ro" }],
    });
    state = trackerReducer(state, { type: "forgetStores", country: "RO" });
    expect(state.settings.storeLists.RO).toBeUndefined();
    expect(state.settings.customStores.RO).toBeUndefined();
  });

  it("doesn't add the same website twice", () => {
    const action = {
      type: "rememberStores" as const,
      country: "RO" as const,
      domains: ["a.ro"],
      added: [{ name: "a.ro", domain: "a.ro" }],
    };
    const state = trackerReducer(trackerReducer(emptyState, action), action);
    expect(state.settings.customStores.RO).toHaveLength(1);
  });
});

describe("parseStoreInput", () => {
  it("accepts a domain or a link to any page", () => {
    expect(parseStoreInput("www.Altex.ro")).toEqual({
      ok: true,
      store: { name: "altex.ro", domain: "altex.ro" },
    });
    expect(parseStoreInput("https://shop.example.ro/category/phones")).toMatchObject({
      ok: true,
      store: { domain: "shop.example.ro" },
    });
  });

  it("refuses empty and private addresses", () => {
    expect(parseStoreInput("  ")).toMatchObject({ ok: false, error: /website address/ });
    expect(parseStoreInput("localhost")).toMatchObject({ ok: false });
  });
});
