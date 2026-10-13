import { availabilities, type Availability } from "./model";

/*
 * Prices and stock as stores write them, turned into numbers and states (plan T3.11).
 */

/**
 * Reads a price written the way shops do: "1.299,99 lei", "€1,299.99", "1 299,99", "2.499".
 * Returns `null` when there is no number to read.
 */
export function parsePrice(text: string | number | null | undefined): number | null {
  if (typeof text === "number") return Number.isFinite(text) && text >= 0 ? text : null;
  if (!text) return null;

  const match = text.replace(/[\s\u00a0\u202f]/g, "").match(/\d[\d.,']*/);
  if (!match) return null;
  let number = match[0].replace(/'/g, "").replace(/[.,]$/, "");

  const lastDot = number.lastIndexOf(".");
  const lastComma = number.lastIndexOf(",");
  if (lastDot !== -1 && lastComma !== -1) {
    // Both used: the later one separates the decimals.
    const decimal = lastDot > lastComma ? "." : ",";
    const group = decimal === "." ? "," : ".";
    number = number.split(group).join("").replace(decimal, ".");
  } else {
    const separator = lastDot !== -1 ? "." : lastComma !== -1 ? "," : null;
    if (separator) {
      const groups = number.split(separator);
      const tail = groups.at(-1) ?? "";
      // One separator followed by 1–2 digits is a decimal point; groups of 3 are thousands.
      const isDecimal = groups.length === 2 && tail.length > 0 && tail.length !== 3;
      number = isDecimal ? groups.join(".") : groups.join("");
    }
  }

  const value = Number.parseFloat(number);
  return Number.isFinite(value) ? value : null;
}

const currencySymbols: Record<string, string> = {
  "€": "EUR",
  "£": "GBP",
  $: "USD",
  lei: "RON",
  ron: "RON",
  eur: "EUR",
  gbp: "GBP",
  usd: "USD",
};

/** The ISO currency in a price text, such as "RON" for "1.299 lei". */
export function parseCurrency(text: string): string | undefined {
  const lower = text.toLowerCase();
  for (const [symbol, code] of Object.entries(currencySymbols)) {
    if (lower.includes(symbol)) return code;
  }
  return undefined;
}

/**
 * Stock text or schema.org values ("https://schema.org/InStock", "OutOfStock", "PreOrder",
 * "in stoc", "Lieferbar"…) as one of our availability states.
 */
export function parseAvailability(value: string | null | undefined): Availability {
  if (!value) return "unknown";
  if ((availabilities as readonly string[]).includes(value)) return value as Availability;
  const text = value
    .toLowerCase()
    .replace(/^https?:\/\/schema\.org\//, "")
    .replace(/[\s_-]/g, "");
  if (
    /(outofstock|soldout|discontinued|unavailable|notavailable|indisponibil|stocepuizat|nichtverfügbar|ausverkauft|rupture)/.test(
      text,
    )
  ) {
    return "out_of_stock";
  }
  if (/(preorder|presale|precomand|vorbestell|backorder)/.test(text)) return "preorder";
  if (
    /(instock|limitedavailability|onlineonly|instoreonly|available|instoc|lieferbar|enstock|disponibil)/.test(
      text,
    )
  ) {
    return "in_stock";
  }
  return "unknown";
}

const formatters = new Map<string, Intl.NumberFormat>();

/** "1.299,99 lei" for RON in Romania, "£1,299.99" in the UK. */
export function formatPrice(value: number | null | undefined, currency: string, locale = "ro-RO") {
  if (value === null || value === undefined) return "—";
  const key = `${locale}:${currency}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { style: "currency", currency });
    formatters.set(key, formatter);
  }
  return formatter.format(value);
}

/** The change from `from` to `to` as a fraction: -0.1 for a 10% drop. */
export function priceChange(from: number, to: number) {
  return from === 0 ? 0 : (to - from) / from;
}
