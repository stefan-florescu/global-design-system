import { hostMatches, isDomainInCountry, type CountryCode } from "./countries";
import { matchProducts, type MatchInput, type MatchResult } from "./match";
import type { ProductIdentity } from "./model";

/*
 * Cross-store discovery (plan T3.5): the searches to run for a product, and which of the links
 * they return are worth keeping.
 */

/** Searches to run, most precise first: the barcode, then brand + model + variant, then the title. */
export function buildQueries(identity: ProductIdentity): string[] {
  const queries: string[] = [];
  if (identity.gtin) queries.push(identity.gtin);
  if (identity.brand && identity.mpn) queries.push(`${identity.brand} ${identity.mpn}`);
  if (identity.brand && identity.model) {
    const { storage, color, size } = identity.variant;
    queries.push([identity.brand, identity.model, storage, size, color].filter(Boolean).join(" "));
  }
  queries.push(identity.title);
  return [...new Set(queries.map((q) => q.trim()).filter(Boolean))];
}

/** A product page found by a search, before it is matched. */
export type Candidate = MatchInput & {
  url: string;
  /** The store's domain, such as `altex.ro`. */
  domain: string;
};

export type RankedCandidate = Candidate & { match: MatchResult };

/**
 * Keeps candidates from the stores the user chose to search (or, without a choice, any store in
 * the product's country), scores each against the product, drops the ones that don't match and
 * keeps the best listing per store.
 */
export function rankCandidates(
  identity: ProductIdentity & { price?: number | null },
  candidates: Candidate[],
  options: { country: CountryCode; stores?: string[]; excludeDomain?: string },
): RankedCandidate[] {
  const best = new Map<string, RankedCandidate>();
  for (const candidate of candidates) {
    if (candidate.domain === options.excludeDomain) continue;
    const allowed = options.stores
      ? options.stores.some((domain) => hostMatches(candidate.domain, domain))
      : isDomainInCountry(candidate.domain, options.country);
    if (!allowed) continue;
    const match = matchProducts(identity, candidate);
    if (match.decision === "reject") continue;
    const current = best.get(candidate.domain);
    if (!current || match.score > current.match.score) {
      best.set(candidate.domain, { ...candidate, match });
    }
  }
  return [...best.values()].sort((a, b) => b.match.score - a.match.score);
}
