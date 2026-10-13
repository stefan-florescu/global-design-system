import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { parseProductPage, type StoreAdapter } from "./parse-product";

const fixture = (name: string) =>
  readFileSync(join(import.meta.dirname, "__fixtures__", name), "utf8");

describe("parseProductPage", () => {
  it("reads schema.org/Product JSON-LD inside @graph first", () => {
    const result = parseProductPage(fixture("jsonld-product.html"));
    expect(result).toMatchObject({
      title: "Telefon mobil Apple iPhone 15, 128GB, 5G, Black",
      brand: "Apple",
      gtin: "0195949036118",
      mpn: "MTP03ZD/A",
      sku: "DMC4NBYBM",
      imageUrl: "https://s13emagst.akamaized.net/products/iphone.jpg",
      price: 4299.99,
      currency: "RON",
      availability: "in_stock",
      language: "ro",
    });
    expect(result.sources[0]).toBe("jsonld");
  });

  it("falls back to microdata", () => {
    const result = parseProductPage(fixture("microdata-product.html"));
    expect(result).toMatchObject({
      title: "Sony WH-1000XM5 Kopfhörer, Schwarz",
      brand: "Sony",
      gtin: "4548736132610",
      price: 329,
      currency: "EUR",
      availability: "out_of_stock",
      language: "de-DE",
    });
    expect(result.sources).toEqual(["microdata"]);
  });

  it("falls back to OpenGraph product tags", () => {
    const result = parseProductPage(fixture("opengraph-product.html"));
    expect(result).toMatchObject({
      title: "Samsung Galaxy S24 256GB Onyx Black",
      brand: "Samsung",
      price: 799,
      currency: "GBP",
      availability: "in_stock",
    });
  });

  it("fills gaps from a store adapter and the page title", () => {
    const adapter: StoreAdapter = {
      domain: "shop.example.ro",
      parse: (html) => ({ price: Number(html.match(/data-price="([\d.]+)"/)?.[1]) }),
    };
    const result = parseProductPage(
      '<html><head><title>Aspirator Dyson V15 | Shop</title></head><body data-price="2999.5"></body></html>',
      adapter,
    );
    expect(result.title).toBe("Aspirator Dyson V15");
    expect(result.price).toBe(2999.5);
    expect(result.sources).toEqual(["adapter"]);
  });

  it("survives broken JSON-LD", () => {
    const result = parseProductPage('<script type="application/ld+json">{oops</script>');
    expect(result).toEqual({ price: null, availability: "unknown", sources: [] });
  });
});
