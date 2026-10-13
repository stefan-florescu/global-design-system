import type { Store } from "./model";

/*
 * Countries the tracker searches in, each with its curated list of major stores (plan: "start
 * with one country, with hand-tuned support for its top stores"). Romania is the launch country.
 */

export const countryCodes = ["RO", "DE", "FR", "GB", "US"] as const;

export type CountryCode = (typeof countryCodes)[number];

export type Country = {
  code: CountryCode;
  name: string;
  currency: string;
  /** BCP 47 locale for prices and dates. */
  locale: string;
  /** Domain endings that belong to the country, most specific first. */
  tlds: string[];
  stores: Omit<Store, "id" | "country">[];
};

export const launchCountry: CountryCode = "RO";

export const countries: Record<CountryCode, Country> = {
  RO: {
    code: "RO",
    name: "Romania",
    currency: "RON",
    locale: "ro-RO",
    tlds: [".ro"],
    stores: [
      { name: "eMAG", domain: "emag.ro", scraperType: "custom" },
      { name: "Altex", domain: "altex.ro", scraperType: "custom" },
      { name: "Flanco", domain: "flanco.ro", scraperType: "jsonld" },
      { name: "Media Galaxy", domain: "mediagalaxy.ro", scraperType: "custom" },
      { name: "CEL.ro", domain: "cel.ro", scraperType: "jsonld" },
      { name: "PC Garage", domain: "pcgarage.ro", scraperType: "jsonld" },
      { name: "evoMAG", domain: "evomag.ro", scraperType: "jsonld" },
      { name: "Vexio", domain: "vexio.ro", scraperType: "jsonld" },
      { name: "Carrefour", domain: "carrefour.ro", scraperType: "search" },
      { name: "Elefant", domain: "elefant.ro", scraperType: "search" },
    ],
  },
  DE: {
    code: "DE",
    name: "Germany",
    currency: "EUR",
    locale: "de-DE",
    tlds: [".de"],
    stores: [
      { name: "Amazon.de", domain: "amazon.de", scraperType: "custom" },
      { name: "MediaMarkt", domain: "mediamarkt.de", scraperType: "custom" },
      { name: "Saturn", domain: "saturn.de", scraperType: "custom" },
      { name: "Otto", domain: "otto.de", scraperType: "jsonld" },
      { name: "Cyberport", domain: "cyberport.de", scraperType: "jsonld" },
      { name: "notebooksbilliger.de", domain: "notebooksbilliger.de", scraperType: "jsonld" },
      { name: "Alternate", domain: "alternate.de", scraperType: "jsonld" },
      { name: "Galaxus", domain: "galaxus.de", scraperType: "search" },
    ],
  },
  FR: {
    code: "FR",
    name: "France",
    currency: "EUR",
    locale: "fr-FR",
    tlds: [".fr"],
    stores: [
      { name: "Amazon.fr", domain: "amazon.fr", scraperType: "custom" },
      { name: "Fnac", domain: "fnac.com", scraperType: "custom" },
      { name: "Darty", domain: "darty.com", scraperType: "custom" },
      { name: "Boulanger", domain: "boulanger.com", scraperType: "jsonld" },
      { name: "Cdiscount", domain: "cdiscount.com", scraperType: "jsonld" },
      { name: "LDLC", domain: "ldlc.com", scraperType: "jsonld" },
    ],
  },
  GB: {
    code: "GB",
    name: "United Kingdom",
    currency: "GBP",
    locale: "en-GB",
    tlds: [".co.uk", ".uk"],
    stores: [
      { name: "Amazon UK", domain: "amazon.co.uk", scraperType: "custom" },
      { name: "Currys", domain: "currys.co.uk", scraperType: "custom" },
      { name: "Argos", domain: "argos.co.uk", scraperType: "jsonld" },
      { name: "John Lewis", domain: "johnlewis.com", scraperType: "jsonld" },
      { name: "Very", domain: "very.co.uk", scraperType: "jsonld" },
      { name: "AO.com", domain: "ao.com", scraperType: "search" },
      { name: "Scan", domain: "scan.co.uk", scraperType: "jsonld" },
    ],
  },
  US: {
    code: "US",
    name: "United States",
    currency: "USD",
    locale: "en-US",
    tlds: [".us"],
    stores: [
      { name: "Amazon", domain: "amazon.com", scraperType: "custom" },
      { name: "Best Buy", domain: "bestbuy.com", scraperType: "custom" },
      { name: "Walmart", domain: "walmart.com", scraperType: "custom" },
      { name: "Target", domain: "target.com", scraperType: "jsonld" },
      { name: "Newegg", domain: "newegg.com", scraperType: "jsonld" },
      { name: "B&H Photo", domain: "bhphotovideo.com", scraperType: "jsonld" },
    ],
  },
};

export function isCountryCode(value: unknown): value is CountryCode {
  return countryCodes.some((code) => code === value);
}

/** `www.emag.ro` and `m.emag.ro` both belong to `emag.ro`. */
export function hostMatches(hostname: string, domain: string) {
  const host = hostname.toLowerCase();
  return host === domain || host.endsWith(`.${domain}`);
}

/** The curated store a hostname belongs to, if any. */
export function findStore(hostname: string): Store | undefined {
  for (const country of Object.values(countries)) {
    const store = country.stores.find((s) => hostMatches(hostname, s.domain));
    if (store) return { ...store, id: store.domain, country: country.code };
  }
  return undefined;
}

/** A store we have no adapter for: read with the generic JSON-LD extractor. */
export function genericStore(hostname: string, country: CountryCode): Store {
  const domain = hostname.toLowerCase().replace(/^www\./, "");
  return { id: domain, name: domain, domain, country, scraperType: "jsonld" };
}

const currencyCountries: Record<string, CountryCode> = {
  RON: "RO",
  GBP: "GB",
  USD: "US",
};

const languageCountries: Record<string, CountryCode> = {
  ro: "RO",
  de: "DE",
  fr: "FR",
  "en-gb": "GB",
  "en-us": "US",
};

export type CountryGuess = {
  country: CountryCode;
  /** What gave the country away, strongest first. */
  source: "store" | "domain" | "currency" | "language" | "default";
};

/**
 * Works out which country a product page sells in (plan T3.3): a curated store, then the domain
 * ending, then the price's currency, then the page language. The user can override it.
 */
export function inferCountry({
  hostname,
  currency,
  language,
}: {
  hostname: string;
  currency?: string;
  language?: string;
}): CountryGuess {
  const store = findStore(hostname);
  if (store) return { country: store.country, source: "store" };

  const host = hostname.toLowerCase();
  for (const country of Object.values(countries)) {
    if (country.tlds.some((tld) => host.endsWith(tld))) {
      return { country: country.code, source: "domain" };
    }
  }

  const byCurrency = currency ? currencyCountries[currency.toUpperCase()] : undefined;
  if (byCurrency) return { country: byCurrency, source: "currency" };

  if (language) {
    const lang = language.toLowerCase();
    const byLanguage = languageCountries[lang] ?? languageCountries[lang.split("-")[0] ?? ""];
    if (byLanguage) return { country: byLanguage, source: "language" };
  }

  return { country: launchCountry, source: "default" };
}

/** A domain that belongs to the country: one of its stores, or its domain ending. */
export function isDomainInCountry(hostname: string, country: CountryCode) {
  const { stores, tlds } = countries[country];
  const host = hostname.toLowerCase();
  return stores.some((s) => hostMatches(host, s.domain)) || tlds.some((tld) => host.endsWith(tld));
}
