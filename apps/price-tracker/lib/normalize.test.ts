import { describe, expect, it } from "vitest";

import {
  extractVariant,
  normalizeTitle,
  searchText,
  titleFromPath,
  titleTokens,
} from "./normalize";

describe("normalizeTitle", () => {
  it("strips marketing text and the category, and finds brand, model and variant", () => {
    expect(
      normalizeTitle(
        "Telefon mobil Apple iPhone 15 Pro, 8GB RAM, 256GB, 5G, Natural Titanium – NOU!",
      ),
    ).toEqual({
      title: "Apple iPhone 15 Pro, 8GB RAM, 256GB, 5G, Natural Titanium",
      brand: "Apple",
      model: "iPhone 15 Pro",
      variant: { storage: "256GB", color: "Natural Titanium" },
    });
  });

  it("reads screen sizes and Romanian colours", () => {
    const result = normalizeTitle('Televizor Samsung QE55Q60C, 55", QLED, 4K, negru');
    expect(result.brand).toBe("Samsung");
    expect(result.model).toBe("QE55Q60C");
    expect(result.variant).toEqual({ size: '55"', color: "Negru" });
  });

  it("copes without a known brand", () => {
    expect(normalizeTitle("Generic USB hub").brand).toBeUndefined();
  });

  it("doesn't take what a product is for as its brand", () => {
    expect(normalizeTitle("Joc Silent Hill Townfall pentru PlayStation 5")).toMatchObject({
      title: "Silent Hill Townfall pentru PlayStation 5",
      brand: undefined,
      model: undefined,
    });
    expect(normalizeTitle("Husa pentru Apple iPhone 15, neagra").brand).toBeUndefined();
    expect(normalizeTitle("Incarcator Apple 20W pentru iPhone").brand).toBe("Apple");
  });
});

describe("searchText", () => {
  it("drops punctuation and the words that say what a product is for", () => {
    expect(searchText("Silent Hill Townfall pentru PlayStation 5")).toBe(
      "Silent Hill Townfall PlayStation 5",
    );
    expect(searchText("Cartus (original), compatibil cu HP 305, negru")).toBe(
      "Cartus original HP 305 negru",
    );
  });
});

describe("extractVariant", () => {
  it("reads terabytes and shoe sizes", () => {
    expect(extractVariant("SSD 1TB")).toEqual({ storage: "1TB" });
    expect(extractVariant("Nike Air Max, marime 42.5")).toEqual({ size: "EU 42.5" });
  });
});

describe("titleFromPath", () => {
  it("builds a title from a product slug, skipping product codes", () => {
    expect(titleFromPath("/telefon-mobil-apple-iphone-15-128gb-black/pd/DMC4NBYBM/")).toBe(
      "Telefon Mobil Apple iPhone 15 128GB Black",
    );
  });

  it("capitalises model codes and network names", () => {
    expect(titleFromPath("/casti-sony-wh-1000xm5-negru/")).toBe("Casti Sony Wh 1000XM5 Negru");
    expect(titleFromPath("/apple-iphone-15-128gb-5g/")).toBe("Apple iPhone 15 128GB 5G");
  });

  it("returns undefined for links without a name", () => {
    expect(titleFromPath("/dp/B0CHX1W1XY")).toBeUndefined();
    expect(titleFromPath("/")).toBeUndefined();
  });
});

describe("titleTokens", () => {
  it("joins numbers with their units and drops accents", () => {
    expect(titleTokens("Căști Sony 128 GB, roșu")).toEqual(["casti", "sony", "128gb", "rosu"]);
  });

  it("writes PlayStation consoles the short way", () => {
    expect(titleTokens("Joc FC 26 PlayStation 5")).toEqual(titleTokens("Joc FC 26 PS5"));
  });
});
