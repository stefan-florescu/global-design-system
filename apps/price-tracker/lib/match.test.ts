import { describe, expect, it } from "vitest";

import { buildQueries, rankCandidates } from "./discovery";
import { matchProducts, normalizeGtin } from "./match";
import type { ProductIdentity } from "./model";

const iphone: ProductIdentity = {
  title: "Apple iPhone 15 128GB Black",
  brand: "Apple",
  model: "iPhone 15",
  gtin: "0195949036118",
  variant: { storage: "128GB", color: "Black" },
  country: "RO",
};

describe("matchProducts", () => {
  it("accepts an identical barcode, however it is written", () => {
    expect(matchProducts(iphone, { title: "anything", gtin: "195949036118" })).toMatchObject({
      score: 1,
      decision: "accept",
      reason: "gtin",
    });
    expect(normalizeGtin("195949036118")).toBe(normalizeGtin("00195949036118"));
  });

  it("rejects a different barcode", () => {
    expect(matchProducts(iphone, { title: iphone.title, gtin: "0195949036125" }).decision).toBe(
      "reject",
    );
  });

  it("accepts the same product titled differently", () => {
    const result = matchProducts(iphone, {
      title: "Smartphone Apple iPhone 15, 128GB, 5G, Black",
      variant: { storage: "128GB", color: "Black" },
    });
    expect(result.decision).toBe("accept");
  });

  it("calls another storage size a possible match", () => {
    const result = matchProducts(iphone, {
      title: "Apple iPhone 15 256GB Black",
      brand: "Apple",
      variant: { storage: "256GB", color: "Black" },
    });
    expect(result.decision).toBe("possible");
  });

  it("rejects accessories, other brands and other models", () => {
    expect(
      matchProducts(iphone, { title: "Husa protectie pentru Apple iPhone 15 Black", price: 49 })
        .decision,
    ).toBe("reject");
    expect(matchProducts(iphone, { title: "Samsung Galaxy S24", brand: "Samsung" }).decision).toBe(
      "reject",
    );
    expect(matchProducts(iphone, { title: "Apple iPad Air 128GB", brand: "Apple" }).decision).toBe(
      "reject",
    );
  });
});

describe("matchProducts without a brand", () => {
  it("offers the same game as a possible match, however the console is written", () => {
    const game = { title: "Silent Hill Townfall pentru PlayStation 5" };
    expect(matchProducts(game, { title: "Joc Silent Hill Townfall PS5" }).decision).toBe(
      "possible",
    );
    expect(matchProducts(game, { title: "Joc Silent Hill Townfall PS4" }).decision).toBe("reject");
  });
});

describe("buildQueries", () => {
  it("searches the barcode first, then brand + model + variant, then the title", () => {
    expect(buildQueries(iphone)).toEqual(["0195949036118", "Apple iPhone 15 128GB Black"]);
  });
});

describe("rankCandidates", () => {
  it("keeps stores in the country, the best listing per store, sorted by score", () => {
    const ranked = rankCandidates(
      { ...iphone, price: 4299 },
      [
        {
          url: "https://www.altex.ro/a",
          domain: "altex.ro",
          title: "Apple iPhone 15 256GB Black",
          brand: "Apple",
          variant: { storage: "256GB" },
        },
        { url: "https://www.altex.ro/b", domain: "altex.ro", title: "x", gtin: iphone.gtin },
        { url: "https://www.amazon.de/c", domain: "amazon.de", title: "x", gtin: iphone.gtin },
        { url: "https://www.emag.ro/d", domain: "emag.ro", title: "x", gtin: iphone.gtin },
        {
          url: "https://www.flanco.ro/e",
          domain: "flanco.ro",
          title: "Apple iPhone 15 256GB Black",
          brand: "Apple",
          variant: { storage: "256GB" },
        },
      ],
      { country: "RO", excludeDomain: "emag.ro" },
    );
    expect(ranked.map((c) => c.url)).toEqual(["https://www.altex.ro/b", "https://www.flanco.ro/e"]);
  });
});
