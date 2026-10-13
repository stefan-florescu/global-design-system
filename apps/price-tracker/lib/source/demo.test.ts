import { describe, expect, it } from "vitest";

import { createDemoSource, demoSnapshot, ean13 } from "./demo";

const source = createDemoSource({ delayMs: 0 });
const url = new URL("https://www.emag.ro/telefon-mobil-apple-iphone-15-128gb-black/pd/DMC4NBYBM/");

describe("demo source", () => {
  it("identifies a product from its link", async () => {
    const result = await source.identify(url);
    expect(result.identity).toMatchObject({ brand: "Apple", model: "iPhone 15", country: "RO" });
    expect(result.identity.variant).toEqual({ storage: "128GB", color: "Black" });
    expect(result.store.name).toBe("eMAG");
    expect(result.countryGuess.source).toBe("store");
    expect(result.variants.map((v) => v.label)).toEqual(["64GB", "128GB", "256GB"]);
    expect(result.snapshot.price).toBeGreaterThan(0);
  });

  it("gives the same product the same barcode from any store", async () => {
    const a = await source.identify(url);
    const b = await source.identify(
      new URL("https://altex.ro/apple-iphone-15-128gb-black/cpd/SMTIP15/"),
    );
    expect(b.identity.gtin).toBe(a.identity.gtin);
  });

  it("refuses links without a product name", async () => {
    await expect(source.identify(new URL("https://www.emag.ro/"))).rejects.toThrow(
      /couldn't recognise/,
    );
  });

  it("finds other stores in the country, with accepted and possible matches", async () => {
    const { identity, store } = await source.identify(url);
    const found = await source.discover({ ...identity, price: null }, "RO", store.domain);
    expect(found.length).toBeGreaterThanOrEqual(4);
    expect(found.every((c) => c.domain.endsWith(".ro") && c.domain !== "emag.ro")).toBe(true);
    expect(found.some((c) => c.match.decision === "accept")).toBe(true);
    expect(found.some((c) => c.match.decision === "possible")).toBe(true);
    expect(found.some((c) => /husa/i.test(c.title))).toBe(false);
  });

  it("prices are stable for a moment and history matches checks", async () => {
    const offer = { url: url.href, domain: "emag.ro", title: "Apple iPhone 15 128GB Black" };
    const at = Date.UTC(2026, 9, 13, 9);
    expect(demoSnapshot(offer, at)).toEqual(demoSnapshot(offer, at));
    const history = source.history?.(offer, at - 7 * 86_400_000, at + 1) ?? [];
    expect(history).toHaveLength(7);
    expect(history.every((p) => p.price === null || p.price > 0)).toBe(true);
  });

  it("makes valid EAN-13 barcodes", () => {
    const code = ean13("anything");
    expect(code).toMatch(/^\d{13}$/);
    const sum = [...code].reduce((total, d, i) => total + Number(d) * (i % 2 === 0 ? 1 : 3), 0);
    expect(sum % 10).toBe(0);
  });
});
