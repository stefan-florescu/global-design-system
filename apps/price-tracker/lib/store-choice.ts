import { countries, hostMatches, type CountryCode } from "./countries";
import type { Settings } from "./model";
import { checkProductUrl } from "./url";

/*
 * Which websites to search for a product (decision D1): the user picks them when adding a
 * product. Their choice is remembered per country and suggested for the next product, and
 * websites they type in are kept alongside the curated stores.
 */

export type StoreChoice = { name: string; domain: string };

/** `www.emag.ro` → `emag.ro`. */
export function bareDomain(hostname: string) {
  return hostname.toLowerCase().replace(/^www\./, "");
}

/** Every store the user can pick in a country: the curated list, then the ones they added. */
export function storeOptions(settings: Settings, country: CountryCode): StoreChoice[] {
  const curated = countries[country].stores.map(({ name, domain }) => ({ name, domain }));
  const custom = (settings.customStores[country] ?? []).filter(
    (store) => !curated.some((c) => c.domain === store.domain),
  );
  return [...curated, ...custom];
}

/**
 * The stores to tick for a new product: the user's last choice in this country, or every
 * curated store the first time. The store the link is from is always tracked, so it is left out.
 */
export function suggestedStores(
  settings: Settings,
  country: CountryCode,
  sourceDomain: string,
): string[] {
  const options = storeOptions(settings, country).filter(
    (store) => !hostMatches(sourceDomain, store.domain),
  );
  const remembered = settings.storeLists[country];
  const picked = remembered
    ? options.filter((store) => remembered.includes(store.domain))
    : options.filter((store) => countries[country].stores.some((s) => s.domain === store.domain));
  return picked.map((store) => store.domain);
}

export type ParsedStore = { ok: true; store: StoreChoice } | { ok: false; error: string };

/** A website the user typed in: "altex.ro", "www.altex.ro" or a link to any page of it. */
export function parseStoreInput(input: string): ParsedStore {
  const check = checkProductUrl(input);
  if (!check.ok) {
    return {
      ok: false,
      error: input.trim() ? check.error : "Enter a website address, such as shop.ro.",
    };
  }
  const domain = bareDomain(check.url.hostname);
  return { ok: true, store: { name: domain, domain } };
}
