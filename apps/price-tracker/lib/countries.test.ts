import { describe, expect, it } from "vitest";

import { findStore, inferCountry, isDomainInCountry } from "./countries";

describe("inferCountry", () => {
  it("uses the curated store, then the domain, then the currency, then the language", () => {
    expect(inferCountry({ hostname: "www.fnac.com" })).toEqual({ country: "FR", source: "store" });
    expect(inferCountry({ hostname: "shop.example.ro" })).toEqual({
      country: "RO",
      source: "domain",
    });
    expect(inferCountry({ hostname: "gadgets.example.co.uk" })).toEqual({
      country: "GB",
      source: "domain",
    });
    expect(inferCountry({ hostname: "example.com", currency: "gbp" })).toEqual({
      country: "GB",
      source: "currency",
    });
    expect(inferCountry({ hostname: "example.com", currency: "EUR", language: "de-AT" })).toEqual({
      country: "DE",
      source: "language",
    });
    expect(inferCountry({ hostname: "example.com" })).toEqual({ country: "RO", source: "default" });
  });
});

describe("stores", () => {
  it("finds stores by any subdomain", () => {
    expect(findStore("m.emag.ro")?.name).toBe("eMAG");
    expect(findStore("notemag.ro")).toBeUndefined();
  });

  it("knows which domains sell in a country", () => {
    expect(isDomainInCountry("johnlewis.com", "GB")).toBe(true);
    expect(isDomainInCountry("johnlewis.com", "RO")).toBe(false);
    expect(isDomainInCountry("any-shop.ro", "RO")).toBe(true);
  });
});
