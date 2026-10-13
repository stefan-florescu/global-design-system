import type { CountryGuess, CountryCode } from "../countries";
import type { ProductIdentity, PricePoint, Store } from "../model";
import type { RankedCandidate } from "../discovery";
import type { Snapshot } from "../changes";

/*
 * Where the app gets product pages and prices from. The screens only talk to this interface:
 * today it is backed by `demoSource` (simulated prices, no server), and the scraper worker's API
 * (plan T6.1: POST /products, GET /products/:id/offers…) will implement it next.
 */

export type IdentifyResult = {
  identity: ProductIdentity;
  /** How the country was worked out (plan T3.3). */
  countryGuess: CountryGuess;
  store: Store;
  /** The pasted page's own price and stock. */
  snapshot: Snapshot;
  /** Variants the page sells, such as storage sizes, for the user to pick from. */
  variants: { label: string; identity: ProductIdentity }[];
};

/** The page to check. `title` is the product as the user confirmed it. */
export type OfferRef = { url: string; domain: string; title: string };

export type CheckResult = { ok: true; snapshot: Snapshot } | { ok: false; error: string };

export interface PriceSource {
  /** Shown in the UI, e.g. "Demo data". */
  label: string;
  /** Reads the pasted page (plan T3.1–T3.4). */
  identify(url: URL): Promise<IdentifyResult>;
  /** Finds the product on other stores in `country` (plan T3.5–T3.6). */
  discover(
    identity: ProductIdentity & { price: number | null },
    country: CountryCode,
    excludeDomain: string,
  ): Promise<RankedCandidate[]>;
  /** Reads one offer's current price and stock (plan T3.8). */
  check(offer: OfferRef, now: number): Promise<CheckResult>;
  /** Past prices, where the provider has them, so a new product starts with a chart. */
  history?(offer: OfferRef, from: number, to: number): PricePoint[];
}

export class IdentifyError extends Error {
  override name = "IdentifyError";
}
