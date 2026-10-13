import type { Variant } from "./model";
import { titleTokens } from "./normalize";

/*
 * The matching engine (plan T3.6): how sure we are that a store's listing is the same product.
 * Identical barcodes (GTIN) or part numbers settle it; otherwise titles, brand, model and variant
 * are compared, with a price sanity check. Scores at or above `acceptThreshold` are added
 * automatically; scores between the thresholds are shown as "possible matches".
 */

export const acceptThreshold = 0.85;
export const possibleThreshold = 0.5;

export type MatchInput = {
  title: string;
  brand?: string;
  model?: string;
  gtin?: string;
  mpn?: string;
  variant?: Variant;
  price?: number | null;
};

export type MatchReason = "gtin" | "gtin-mismatch" | "mpn" | "brand-mismatch" | "title";

export type MatchResult = {
  score: number;
  reason: MatchReason;
  decision: "accept" | "possible" | "reject";
};

/** Words that make a listing an accessory for the product rather than the product. */
// prettier-ignore
const accessoryWords = new Set([
  "husa", "case", "cover", "hulle", "coque", "folie", "protector", "screen", "glass", "sticla",
  "charger", "incarcator", "ladegerat", "chargeur", "cablu", "cable", "kabel", "strap", "curea",
  "bumper", "skin", "stand", "suport", "holder", "adapter", "adaptor",
]);

// prettier-ignore
const stopWords = new Set([
  "telefon", "mobil", "smartphone", "the", "and", "with", "cu", "si", "pentru", "for", "de",
  "la", "mit", "und", "pour", "et", "dual", "sim", "5g", "4g", "lte", "nfc", "wifi",
]);

/** GTINs can be written as 8, 12, 13 or 14 digits: pad them to compare. */
export function normalizeGtin(gtin: string | undefined) {
  const digits = gtin?.replace(/\D/g, "");
  return digits && digits.length >= 8 ? digits.padStart(14, "0") : undefined;
}

const normalizeCode = (code: string | undefined) =>
  code?.toLowerCase().replace(/[^a-z0-9]/g, "") || undefined;

function similarity(a: string[], b: string[]) {
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size === 0 || setB.size === 0) return 0;
  let shared = 0;
  for (const word of setA) if (setB.has(word)) shared++;
  // Dice coefficient: shared words over the average length.
  return (2 * shared) / (setA.size + setB.size);
}

function differs(a: string | undefined, b: string | undefined) {
  return Boolean(a && b && a.toLowerCase() !== b.toLowerCase());
}

function decide(score: number, reason: MatchReason): MatchResult {
  const rounded = Math.round(Math.min(Math.max(score, 0), 1) * 100) / 100;
  return {
    score: rounded,
    reason,
    decision:
      rounded >= acceptThreshold ? "accept" : rounded >= possibleThreshold ? "possible" : "reject",
  };
}

export function matchProducts(source: MatchInput, candidate: MatchInput): MatchResult {
  const gtinA = normalizeGtin(source.gtin);
  const gtinB = normalizeGtin(candidate.gtin);
  if (gtinA && gtinB) return gtinA === gtinB ? decide(1, "gtin") : decide(0, "gtin-mismatch");

  const mpnA = normalizeCode(source.mpn);
  const mpnB = normalizeCode(candidate.mpn);
  if (mpnA && mpnB && mpnA === mpnB && !differs(source.brand, candidate.brand)) {
    return decide(0.97, "mpn");
  }

  if (differs(source.brand, candidate.brand)) return decide(0.05, "brand-mismatch");

  const wordsA = titleTokens(source.title).filter((w) => !stopWords.has(w));
  const wordsB = titleTokens(candidate.title).filter((w) => !stopWords.has(w));
  let score = 0.65 * similarity(wordsA, wordsB);

  // Brand: confirmed on both sides (named, or in the candidate's title), or unknown on one.
  const brand = source.brand?.toLowerCase();
  const brandConfirmed =
    brand &&
    (candidate.brand?.toLowerCase() === brand || titleTokens(candidate.title).includes(brand));
  score += brandConfirmed ? 0.15 : 0.05;

  // Model: every word of the model appears in the candidate's title.
  if (source.model) {
    const modelWords = titleTokens(source.model);
    const found = modelWords.filter((w) => wordsB.includes(w)).length;
    score += modelWords.length > 0 ? 0.2 * (found / modelWords.length) : 0;
    if (found < modelWords.length) score *= 0.85;
  } else {
    score += 0.1;
  }

  // A different variant is a different product: 128GB is not 256GB.
  const a = source.variant ?? {};
  const b = candidate.variant ?? {};
  if (differs(a.storage, b.storage)) score *= 0.6;
  if (differs(a.size, b.size)) score *= 0.6;
  if (differs(a.color, b.color)) score *= 0.85;

  // An accessory "for iPhone 15" shares most of the title.
  const accessory = (words: string[]) => words.some((w) => accessoryWords.has(w));
  if (accessory(wordsB) && !accessory(wordsA)) score *= 0.3;

  // A price far from the source's is more likely a bundle, an accessory or another model.
  if (source.price && candidate.price) {
    const ratio = candidate.price / source.price;
    if (ratio < 0.5 || ratio > 2) score *= 0.6;
  }

  return decide(score, "title");
}
