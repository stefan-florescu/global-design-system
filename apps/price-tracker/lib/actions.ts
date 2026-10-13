"use client";

import { countries, type CountryCode } from "./countries";
import type { RankedCandidate } from "./discovery";
import { hash } from "./hash";
import { normalizeGtin } from "./match";
import type { Offer, PricePoint, Product, ProductIdentity, Store } from "./model";
import { hour, nextCheckDelay } from "./schedule";
import { priceSource, type IdentifyResult } from "./source";
import { maxWatchedProducts, type TrackerState } from "./tracker";
import { canonicalUrl } from "./url";
import { dispatch, getState } from "./use-tracker";

/*
 * The app's asynchronous flows: adding a product and checking prices. They call the price
 * source, then record the outcome with one reducer action.
 */

const historyDays = 90;

export function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** The product's id: its barcode when known, so it is tracked once however it was added. */
export function productIdFor(identity: ProductIdentity, url: URL) {
  const gtin = normalizeGtin(identity.gtin);
  return gtin ? `gtin-${gtin}` : `url-${hash(canonicalUrl(url)).toString(36)}`;
}

/** The product already on the watchlist, if any. */
export function findTracked(state: TrackerState, identity: ProductIdentity, url: URL) {
  const id = productIdFor(identity, url);
  const sourceUrl = canonicalUrl(url);
  return state.products.find((p) => p.id === id || p.sourceUrl === sourceUrl);
}

export function canAddMore(state: TrackerState) {
  return state.products.length < maxWatchedProducts;
}

function pastPrices(offer: Pick<Offer, "url" | "domain" | "title">, now: number): PricePoint[] {
  return priceSource.history?.(offer, now - historyDays * 24 * hour, now) ?? [];
}

/** Saves a confirmed product with its offers and starts watching it. Returns its id. */
export function addProduct({
  url,
  identified,
  identity,
  country,
  candidates,
}: {
  url: URL;
  identified: IdentifyResult;
  /** The variant the user confirmed. */
  identity: ProductIdentity;
  country: CountryCode;
  candidates: RankedCandidate[];
}) {
  const now = Date.now();
  const productId = productIdFor(identity, url);
  const product: Product = {
    ...identity,
    country,
    id: productId,
    sourceUrl: canonicalUrl(url),
    createdAt: now,
  };
  const currency = countries[country].currency;

  const sourceOffer = makeOffer({
    productId,
    store: identified.store,
    url: canonicalUrl(url),
    title: identity.title,
    currency,
    confidence: 1,
    status: "accepted",
    now,
  });
  const offers: Offer[] = [
    sourceOffer,
    ...candidates.map((candidate) =>
      makeOffer({
        productId,
        store: storeFor(candidate.domain, country),
        url: candidate.url,
        title: candidate.title,
        currency,
        confidence: candidate.match.score,
        status: candidate.match.decision === "accept" ? "accepted" : "possible",
        now,
      }),
    ),
  ];

  const history: Record<string, PricePoint[]> = {};
  for (const offer of offers) {
    const points = pastPrices(offer, now);
    const latest = points.at(-1);
    history[offer.id] = points;
    if (latest) {
      offer.currentPrice = latest.price;
      offer.availability = latest.availability;
    }
  }
  // The pasted page's price was just read.
  sourceOffer.currentPrice = identified.snapshot.price;
  sourceOffer.availability = identified.snapshot.availability;
  history[sourceOffer.id] = [
    ...(history[sourceOffer.id] ?? []),
    { ...identified.snapshot, checkedAt: now },
  ];

  dispatch({
    type: "addProduct",
    product,
    offers,
    history,
    watch: {
      id: newId(),
      productId,
      targetPrice: null,
      notifyOnDrop: true,
      notifyOnStock: true,
      active: true,
      createdAt: now,
    },
    nextCheckAt: now + nextCheckDelay({ watchers: 1, now, random: Math.random() }),
  });
  return productId;
}

function storeFor(domain: string, country: CountryCode): Store {
  const store = countries[country].stores.find((s) => s.domain === domain);
  return store
    ? { ...store, id: store.domain, country }
    : { id: domain, name: domain, domain, country, scraperType: "jsonld" };
}

function makeOffer({
  productId,
  store,
  url,
  title,
  currency,
  confidence,
  status,
  now,
  manual,
}: {
  productId: string;
  store: Store;
  url: string;
  title: string;
  currency: string;
  confidence: number;
  status: Offer["status"];
  now: number;
  manual?: boolean;
}): Offer {
  return {
    id: newId(),
    productId,
    storeId: store.id,
    storeName: store.name,
    domain: store.domain,
    url,
    title,
    currentPrice: null,
    currency,
    availability: "unknown",
    lastCheckedAt: now,
    matchConfidence: confidence,
    status,
    manual,
  };
}

/**
 * "Add a store link manually" (plan T3.7): checks the page and adds it as a confirmed offer.
 * Returns an error message when the page can't be read.
 */
export async function addManualOffer(product: Product, url: URL): Promise<string | undefined> {
  const store = storeFor(url.hostname.replace(/^www\./, ""), product.country);
  const listed = getState().offers.find(
    (o) => o.productId === product.id && o.domain === store.domain && o.status === "accepted",
  );
  if (listed) {
    return `${store.name} is already in the list. If its listing is the wrong product, mark it “Not the same product” first.`;
  }
  const now = Date.now();
  const offer = makeOffer({
    productId: product.id,
    store,
    url: canonicalUrl(url),
    // The user says it is the same product, so it is checked as that product.
    title: product.title,
    currency: countries[product.country].currency,
    confidence: 1,
    status: "accepted",
    now,
    manual: true,
  });
  const result = await priceSource.check(offer, now);
  if (!result.ok)
    return `${store.name}: ${result.error.toLowerCase()}. Try again in a few minutes.`;
  offer.currentPrice = result.snapshot.price;
  offer.availability = result.snapshot.availability;
  dispatch({
    type: "addOffer",
    offer,
    history: [...pastPrices(offer, now), { ...result.snapshot, checkedAt: now }],
  });
  return undefined;
}

const checking = new Set<string>();

/** Checks every offer of a product that isn't rejected, then records the results. */
export async function checkProduct(productId: string) {
  if (checking.has(productId)) return;
  checking.add(productId);
  try {
    const state = getState();
    const offers = state.offers.filter((o) => o.productId === productId && o.status !== "rejected");
    const now = Date.now();
    const results = [];
    for (const offer of offers) {
      const result = await priceSource.check(offer, now);
      const last = state.history[offer.id]?.at(-1)?.checkedAt ?? now;
      // Days missed while nobody had the app open.
      const backfill =
        now - last > 24 * hour ? (priceSource.history?.(offer, last, now) ?? []) : [];
      results.push({ offerId: offer.id, result, backfill });
    }
    const failures = results.filter((r) => !r.result.ok).length;
    const changed = results.some((r) => {
      if (!r.result.ok) return false;
      const offer = offers.find((o) => o.id === r.offerId);
      return (
        offer?.currentPrice !== r.result.snapshot.price ||
        offer?.availability !== r.result.snapshot.availability
      );
    });
    dispatch({
      type: "recordChecks",
      productId,
      now,
      results,
      nextCheckAt:
        now +
        nextCheckDelay({
          watchers: 1,
          lastChangeAt: changed ? now : undefined,
          failures: failures === results.length && results.length > 0 ? 1 : 0,
          now,
          random: Math.random(),
        }),
    });
  } finally {
    checking.delete(productId);
  }
}

export function isChecking(productId: string) {
  return checking.has(productId);
}

let dueRun: Promise<void> | null = null;

/** Re-checks every product whose next check is due (the scheduler, while the app is open). */
export function checkDueProducts() {
  dueRun ??= (async () => {
    const state = getState();
    const now = Date.now();
    for (const product of state.products) {
      if ((state.nextCheckAt[product.id] ?? 0) <= now) await checkProduct(product.id);
    }
  })().finally(() => {
    dueRun = null;
  });
  return dueRun;
}
