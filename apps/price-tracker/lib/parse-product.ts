import type { Availability } from "./model";
import { parseAvailability, parseCurrency, parsePrice } from "./price";

/*
 * Reads a product page's HTML (plan T3.2), in priority order: schema.org/Product JSON-LD, then
 * microdata and OpenGraph tags, then a store's own adapter (plan T3.8). Works on a string so the
 * same code runs in the browser, in tests (saved HTML fixtures) and in the scraper worker.
 */

export type ParsedProduct = {
  title?: string;
  brand?: string;
  gtin?: string;
  mpn?: string;
  sku?: string;
  imageUrl?: string;
  price: number | null;
  currency?: string;
  availability: Availability;
  /** The page's `<html lang>`, a hint for the country (plan T3.3). */
  language?: string;
  /** Which sources filled in the result, strongest first. */
  sources: ("jsonld" | "microdata" | "opengraph" | "adapter")[];
};

/** A store-specific reader for pages that lack structured data (plan T3.8). */
export type StoreAdapter = {
  domain: string;
  parse: (html: string) => Partial<Omit<ParsedProduct, "sources">>;
};

// prettier-ignore
const entities: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", euro: "€", pound: "£",
  ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  reg: "®", trade: "™", copy: "©", times: "×", deg: "°", szlig: "ß",
  auml: "ä", ouml: "ö", uuml: "ü", Auml: "Ä", Ouml: "Ö", Uuml: "Ü",
  eacute: "é", egrave: "è", ecirc: "ê", agrave: "à", acirc: "â", ccedil: "ç", icirc: "î",
  Eacute: "É", Icirc: "Î", Acirc: "Â",
};

export function decodeEntities(text: string) {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code.startsWith("#x") || code.startsWith("#X")) {
      return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    }
    if (code.startsWith("#")) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return entities[code] ?? entities[code.toLowerCase()] ?? match;
  });
}

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const isObject = (value: Json | undefined): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function asArray(value: Json | undefined): Json[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function text(value: Json | undefined): string | undefined {
  if (typeof value === "string") return decodeEntities(value).trim() || undefined;
  if (typeof value === "number") return String(value);
  if (isObject(value)) return text(value.name ?? value.url ?? value["@id"]);
  if (Array.isArray(value)) return text(value[0]);
  return undefined;
}

function hasType(node: JsonObject, type: string) {
  return asArray(node["@type"]).some(
    (t) => typeof t === "string" && t.replace(/^.*[/:]/, "") === type,
  );
}

/** Every object in a JSON-LD document, including those in `@graph` and nested values. */
function* walk(value: Json): Generator<JsonObject> {
  if (Array.isArray(value)) {
    for (const item of value) yield* walk(item);
  } else if (isObject(value)) {
    yield value;
    for (const child of Object.values(value)) {
      if (typeof child === "object" && child !== null) yield* walk(child);
    }
  }
}

function jsonLdBlocks(html: string): Json[] {
  const blocks: Json[] = [];
  const pattern =
    /<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    const body = (match[1] ?? "")
      .replace(/^\s*(<!\[CDATA\[|<!--)/, "")
      .replace(/(\]\]>|-->)\s*$/, "");
    try {
      blocks.push(JSON.parse(body) as Json);
    } catch {
      // Broken JSON-LD is common; the other sources still apply.
    }
  }
  return blocks;
}

function fromJsonLd(html: string): Partial<ParsedProduct> | undefined {
  for (const block of jsonLdBlocks(html)) {
    for (const node of walk(block)) {
      let product = node;
      if (hasType(node, "ProductGroup")) {
        const first = asArray(node.hasVariant).find(isObject);
        if (first) product = { ...node, ...first };
      } else if (!hasType(node, "Product")) {
        continue;
      }

      const offers = asArray(product.offers).filter(isObject);
      const offer =
        offers.find((o) => o.price !== undefined || o.lowPrice !== undefined) ?? offers[0];
      const priceSpec = offer ? asArray(offer.priceSpecification).find(isObject) : undefined;
      const rawPrice = offer?.price ?? offer?.lowPrice ?? priceSpec?.price;

      return {
        title: text(product.name),
        brand: text(product.brand ?? product.manufacturer),
        gtin: text(
          product.gtin13 ??
            product.gtin ??
            product.gtin12 ??
            product.gtin14 ??
            product.gtin8 ??
            product.isbn,
        )?.replace(/\D/g, ""),
        mpn: text(product.mpn),
        sku: text(product.sku),
        imageUrl: text(product.image),
        price: parsePrice(typeof rawPrice === "number" ? rawPrice : text(rawPrice)),
        currency: text(offer?.priceCurrency ?? priceSpec?.priceCurrency),
        availability: parseAvailability(text(offer?.availability)),
      };
    }
  }
  return undefined;
}

/** `<meta property="og:title" content="…">`, in either attribute order. */
function meta(html: string, name: string): string | undefined {
  const escaped = name.replace(/[.:]/g, "\\$&");
  const pattern = new RegExp(
    `<meta\\b(?=[^>]*\\b(?:property|name|itemprop)\\s*=\\s*["']${escaped}["'])[^>]*\\bcontent\\s*=\\s*(["'])([\\s\\S]*?)\\1`,
    "i",
  );
  const value = html.match(pattern)?.[2];
  return value ? decodeEntities(value).trim() || undefined : undefined;
}

/** An `itemprop` value: its `content` or `href` attribute, or the element's text. */
function itemprop(html: string, name: string): string | undefined {
  const attribute = new RegExp(
    `<\\w+\\b(?=[^>]*\\bitemprop\\s*=\\s*["']${name}["'])[^>]*\\b(?:content|href)\\s*=\\s*(["'])([\\s\\S]*?)\\1`,
    "i",
  );
  const fromAttribute = html.match(attribute)?.[2];
  if (fromAttribute) return decodeEntities(fromAttribute).trim() || undefined;
  const element = new RegExp(
    `<(\\w+)\\b[^>]*\\bitemprop\\s*=\\s*["']${name}["'][^>]*>([^<]*)<`,
    "i",
  );
  const fromText = html.match(element)?.[2];
  return fromText ? decodeEntities(fromText).trim() || undefined : undefined;
}

function fromMicrodata(html: string): Partial<ParsedProduct> | undefined {
  if (!/itemtype\s*=\s*["']https?:\/\/schema\.org\/Product["']/i.test(html)) return undefined;
  const price = itemprop(html, "price") ?? itemprop(html, "lowPrice");
  return {
    title: itemprop(html, "name"),
    brand: itemprop(html, "brand"),
    gtin: (itemprop(html, "gtin13") ?? itemprop(html, "gtin"))?.replace(/\D/g, ""),
    mpn: itemprop(html, "mpn"),
    sku: itemprop(html, "sku"),
    imageUrl: itemprop(html, "image"),
    price: parsePrice(price),
    currency: itemprop(html, "priceCurrency"),
    availability: parseAvailability(itemprop(html, "availability")),
  };
}

function fromOpenGraph(html: string): Partial<ParsedProduct> | undefined {
  const title = meta(html, "og:title");
  const price = meta(html, "product:price:amount") ?? meta(html, "og:price:amount");
  if (!title && !price) return undefined;
  return {
    title,
    brand: meta(html, "product:brand") ?? meta(html, "og:brand"),
    imageUrl: meta(html, "og:image"),
    price: parsePrice(price),
    currency: meta(html, "product:price:currency") ?? meta(html, "og:price:currency"),
    availability: parseAvailability(
      meta(html, "product:availability") ?? meta(html, "og:availability"),
    ),
    gtin: meta(html, "product:ean")?.replace(/\D/g, ""),
  };
}

/** Fills each field from the first source that has it. */
function merge(parts: [ParsedProduct["sources"][number], Partial<ParsedProduct> | undefined][]) {
  const result: ParsedProduct = { price: null, availability: "unknown", sources: [] };
  for (const [source, part] of parts) {
    if (!part) continue;
    let used = false;
    for (const [key, value] of Object.entries(part) as [keyof ParsedProduct, unknown][]) {
      if (value === undefined || value === null || value === "" || value === "unknown") continue;
      if (result[key] === undefined || result[key] === null || result[key] === "unknown") {
        (result as Record<string, unknown>)[key] = value;
        used = true;
      }
    }
    if (used) result.sources.push(source);
  }
  return result;
}

export function parseProductPage(html: string, adapter?: StoreAdapter): ParsedProduct {
  const result = merge([
    ["jsonld", fromJsonLd(html)],
    ["microdata", fromMicrodata(html)],
    ["opengraph", fromOpenGraph(html)],
    ["adapter", adapter?.parse(html)],
  ]);

  if (!result.title) {
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
    if (title)
      result.title = decodeEntities(title)
        .split(/\s[|–-]\s/)[0]
        ?.trim();
  }
  if (!result.currency && result.price !== null) {
    const priceText = html.match(/itemprop\s*=\s*["']price["'][^>]*>([^<]+)</i)?.[1];
    if (priceText) result.currency = parseCurrency(priceText);
  }
  const language = html.match(/<html\b[^>]*\blang\s*=\s*["']?([a-z]{2}(?:-[a-z]{2})?)/i)?.[1];
  if (language) result.language = language;

  return result;
}
