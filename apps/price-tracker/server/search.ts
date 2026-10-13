import { countries, hostMatches } from "../lib/countries";
import { titleFromPath, titleTokens } from "../lib/normalize";
import { decodeEntities } from "../lib/parse-product";

/*
 * Searching a store for a product (plan T3.5): its search page, and the product links on it.
 * The link reader is generic — it looks at every link to the store's own pages and scores its
 * title against the query — so it works on stores without a custom adapter.
 */

/** Search pages to try for a store: its own pattern, then the common shop platforms'. */
export function searchUrls(domain: string, query: string): string[] {
  const q = encodeURIComponent(query);
  const known = Object.values(countries)
    .flatMap((country) => country.stores)
    .find((store) => store.domain === domain)?.search;
  if (known) return [known.replace("{q}", q)];
  const base = `https://${domain}`;
  return [
    `${base}/search?q=${q}`, // Shopify and many custom shops
    `${base}/?s=${q}&post_type=product`, // WooCommerce
    `${base}/catalogsearch/result/?q=${q}`, // Magento
    `${base}/cauta?q=${q}`, // Romanian shops
  ];
}

export type Listing = { url: string; title: string; score: number };

const skip =
  /\/(cart|cos|checkout|account|cont|login|wishlist|favorite|compare|contact|blog|help|ajutor|search|cauta|catalogsearch)\b/i;

function attribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  const value = match?.[2] ?? match?.[3];
  return value === undefined ? undefined : decodeEntities(value).trim();
}

/** How many of the query's words appear in a title, from 0 to 1. */
export function queryScore(query: string, title: string) {
  const wanted = [...new Set(titleTokens(query))];
  if (wanted.length === 0) return 0;
  const words = new Set(titleTokens(title));
  return wanted.filter((word) => words.has(word)).length / wanted.length;
}

/**
 * The product links on a search page, best match first. A link's title comes from a product
 * card's `data-name`, the link's `title`, its text, or the words in its address.
 */
export function readListings(html: string, pageUrl: string, query: string, limit = 3): Listing[] {
  const page = new URL(pageUrl);
  const found = new Map<string, Listing>();

  const consider = (href: string | undefined, title: string | undefined) => {
    if (!href || href.startsWith("#") || href.includes("${")) return;
    let url: URL;
    try {
      url = new URL(decodeEntities(href), page);
    } catch {
      return;
    }
    if (!/^https?:$/.test(url.protocol)) return;
    if (!hostMatches(url.hostname, page.hostname.replace(/^www\./, ""))) return;
    if (skip.test(url.pathname) || url.pathname.length < 8) return;
    url.hash = "";
    url.search = "";
    const fromPath = titleFromPath(url.pathname);
    const name = title && title.length >= 8 ? title : fromPath;
    if (!name) return;
    const score = Math.max(queryScore(query, name), queryScore(query, fromPath ?? ""));
    const current = found.get(url.href);
    found.set(url.href, {
      url: url.href,
      // The same product is linked from its image, title and buttons: keep the longest name.
      title: current && current.title.length >= name.length ? current.title : name,
      score: Math.max(score, current?.score ?? 0),
    });
  };

  // Product cards that name their link in data attributes (eMAG and others).
  for (const match of html.matchAll(/<[a-z]+\b[^>]*\bdata-url\s*=[^>]*>/gi)) {
    const tag = match[0];
    consider(
      attribute(tag, "data-url"),
      attribute(tag, "data-name") ?? attribute(tag, "data-title"),
    );
  }
  // Ordinary links, with their title attribute or short text.
  for (const match of html.matchAll(/<a\b([^>]*)>((?:(?!<a\b)[\s\S]){0,400}?)<\/a\s*>/gi)) {
    const tag = match[1] ?? "";
    const text = (match[2] ?? "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    consider(
      attribute(tag, "href"),
      attribute(tag, "title") ?? (text ? decodeEntities(text) : undefined),
    );
  }

  return [...found.values()]
    .filter((listing) => listing.score >= 0.6)
    .sort((a, b) => b.score - a.score || a.url.length - b.url.length)
    .slice(0, limit);
}
