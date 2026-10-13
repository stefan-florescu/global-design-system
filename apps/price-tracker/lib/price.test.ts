import { describe, expect, it } from "vitest";

import { formatPrice, parseAvailability, parseCurrency, parsePrice } from "./price";

describe("parsePrice", () => {
  it.each([
    ["1.299,99 lei", 1299.99],
    ["€1,299.99", 1299.99],
    ["1 299,99 €", 1299.99],
    ["2.499", 2499],
    ["2,499", 2499],
    ["49,9", 49.9],
    ["19.99", 19.99],
    ["CHF 1'299.00", 1299],
    ["4.299,", 4299],
    [4299.99, 4299.99],
  ] as const)("reads %s", (text, value) => {
    expect(parsePrice(text)).toBe(value);
  });

  it("returns null without a number", () => {
    expect(parsePrice("Call for price")).toBeNull();
    expect(parsePrice(null)).toBeNull();
    expect(parsePrice(-5)).toBeNull();
  });
});

describe("parseCurrency", () => {
  it("recognises symbols and words", () => {
    expect(parseCurrency("1.299 lei")).toBe("RON");
    expect(parseCurrency("€ 20")).toBe("EUR");
    expect(parseCurrency("£20")).toBe("GBP");
  });
});

describe("parseAvailability", () => {
  it.each([
    ["https://schema.org/InStock", "in_stock"],
    ["OutOfStock", "out_of_stock"],
    ["PreOrder", "preorder"],
    ["În stoc", "unknown"],
    ["in stoc", "in_stock"],
    ["Indisponibil", "out_of_stock"],
    ["Currently unavailable", "out_of_stock"],
    ["Lieferbar", "in_stock"],
    [undefined, "unknown"],
  ] as const)("maps %s", (value, state) => {
    expect(parseAvailability(value)).toBe(state);
  });
});

describe("formatPrice", () => {
  it("formats in the country's style", () => {
    expect(formatPrice(1299.99, "GBP", "en-GB")).toBe("£1,299.99");
    expect(formatPrice(null, "RON")).toBe("—");
  });
});
