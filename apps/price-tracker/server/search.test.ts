import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { parseProductPage } from "../lib/parse-product";

import { queryScore, readListings, searchUrls } from "./search";
import { identityFromPage, searchQuery } from "./service";

const fixture = (name: string) =>
  readFileSync(join(import.meta.dirname, "__fixtures__", name), "utf8");

describe("searchUrls", () => {
  it("uses a curated store's search page", () => {
    expect(searchUrls("emag.ro", "Apple iPhone 15 128GB")).toEqual([
      "https://www.emag.ro/search/Apple%20iPhone%2015%20128GB",
    ]);
  });

  it("tries the common shop platforms for other websites", () => {
    expect(searchUrls("magazin-mic.ro", "x")).toHaveLength(4);
  });
});

describe("readListings", () => {
  it("reads eMAG product cards and leaves out accessories and other models' lower scores", () => {
    const listings = readListings(
      fixture("emag-search.html"),
      "https://www.emag.ro/search/Apple%20iPhone%2015%20128GB",
      "Apple iPhone 15 128GB",
    );
    expect(listings[0]).toMatchObject({
      url: "https://www.emag.ro/telefon-mobil-apple-iphone-15-128gb-5g-black-mtp03rx-a/pd/DZ4H93YBM/",
      title: "Telefon mobil Apple iPhone 15, 128GB, 5G, Black",
      score: 1,
    });
    expect(listings.some((l) => l.url.includes("cart"))).toBe(false);
    expect(listings.some((l) => l.url.includes("galaxy"))).toBe(false);
  });

  it("reads ordinary links, resolving relative ones and merging duplicates", () => {
    const listings = readListings(
      fixture("flanco-search.html"),
      "https://www.flanco.ro/catalogsearch/result/?q=iphone",
      "Apple iPhone 15 128GB",
    );
    expect(listings.map((l) => l.url)).toEqual([
      "https://www.flanco.ro/telefon-mobil-apple-iphone-15-128-gb-black.html",
      "https://www.flanco.ro/telefon-mobil-apple-iphone-15-plus-128-gb-blue.html",
    ]);
    expect(listings[0]?.title).toBe("Telefon mobil Apple iPhone 15, 128GB, Black");
  });

  it("scores titles by the query's words", () => {
    expect(queryScore("Apple iPhone 15 128GB", "iPhone 15 128 GB Apple")).toBe(1);
    expect(queryScore("Apple iPhone 15 128GB", "Samsung Galaxy")).toBe(0);
  });
});

describe("identityFromPage", () => {
  it("builds the product from a store page's JSON-LD", () => {
    const parsed = parseProductPage(fixture("carrefour-product.html"));
    const url = new URL(
      "https://carrefour.ro/produse/smartphone-apple-iphone-15-128-gb-5g-black-19-42508142",
    );
    const identity = identityFromPage(parsed, url, "RO");
    expect(identity).toMatchObject({
      title: "Apple iPhone 15, 128 GB, 5G, Black",
      brand: "Apple",
      model: "iPhone 15",
      imageUrl: "https://carrefour.ro/media/iphone15.jpg",
      variant: { storage: "128GB", color: "Black" },
    });
    expect(parsed).toMatchObject({ price: 3639.99, currency: "RON", availability: "in_stock" });
    expect(identity && searchQuery(identity)).toBe("Apple iPhone 15 128GB");
  });
});
