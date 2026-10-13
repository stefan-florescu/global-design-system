import { countries, findStore, genericStore, inferCountry, type CountryCode } from "../countries";
import { rankCandidates, type Candidate } from "../discovery";
import { hash } from "../hash";
import type { Availability, PricePoint, ProductIdentity } from "../model";
import { normalizeTitle, titleFromPath, titleTokens } from "../normalize";
import { IdentifyError, type IdentifyResult, type OfferRef, type PriceSource } from "./types";

/*
 * Demo data until the scraper worker is connected. A browser can't read other sites' pages, so
 * this source reads the product name from the link itself and simulates the rest — but
 * deterministically: the same product always gets the same barcode, stores and prices, prices
 * move on a schedule, and the real discovery and matching code (lib/discovery.ts, lib/match.ts)
 * decides which listings count.
 */

const day = 86_400_000;
const hour = 3_600_000;

/** A stable random number in [0, 1) for a seed and a step. */
function random(seed: number, step = 0) {
  let t = (seed + Math.imul(step + 1, 0x6d2b79f5)) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** A valid EAN-13 barcode (with its check digit) for a key. */
export function ean13(key: string) {
  const digits = `594${String(hash(key)).padStart(10, "0").slice(-9)}`;
  const sum = [...digits].reduce((total, d, i) => total + Number(d) * (i % 2 === 0 ? 1 : 3), 0);
  return `${digits}${(10 - (sum % 10)) % 10}`;
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The product without its colour or storage: variants share a base price. */
function familyKey(title: string) {
  const { brand, model, variant } = normalizeTitle(title);
  if (brand && model) return `${brand} ${model}`.toLowerCase();
  const skip = new Set([variant.storage?.toLowerCase(), variant.color?.toLowerCase()]);
  return titleTokens(title)
    .filter((w) => !skip.has(w))
    .join(" ");
}

const priceRanges: [RegExp, number, number][] = [
  [/\b(laptop|notebook|macbook|thinkpad|zenbook|vivobook)\b/, 2500, 9000],
  [/\b(iphone|galaxy|pixel|telefon|phone|smartphone|xiaomi|redmi)\b/, 1200, 6500],
  [/\b(tv|televizor|oled|qled|monitor)\b/, 900, 7000],
  [/\b(playstation|ps5|xbox|switch|consola)\b/, 1500, 3500],
  [/\b(casti|headphones|airpods|buds|earbuds)\b/, 150, 1800],
  [/\b(watch|ceas|band)\b/, 300, 3000],
];

const currencyRate: Record<string, number> = { RON: 1, EUR: 0.2, GBP: 0.17, USD: 0.22 };

/** Base price in RON: a stable amount in the product's category range. */
function basePrice(title: string) {
  const key = familyKey(title);
  const lower = title.toLowerCase();
  const [, min, max] = priceRanges.find(([pattern]) => pattern.test(lower)) ?? [null, 120, 3000];
  let price = min + (max - min) * random(hash(key));
  // More storage costs more.
  const storage = normalizeTitle(title).variant.storage;
  const gb = storage ? Number.parseFloat(storage) * (storage.endsWith("TB") ? 1024 : 1) : 0;
  if (gb >= 64) price *= 1 + 0.12 * Math.log2(gb / 64);
  return price;
}

function charm(price: number) {
  return price >= 100 ? Math.round(price / 10) * 10 - 0.01 : Math.floor(price) + 0.99;
}

function currencyFor(domain: string): { currency: string; country: CountryCode } {
  const { country } = inferCountry({ hostname: domain });
  return { country, currency: countries[country].currency };
}

/** An offer's simulated price and stock at a moment. */
export function demoSnapshot(offer: OfferRef, at: number): PricePoint {
  const key = `${familyKey(offer.title)}@${offer.domain}`;
  const seed = hash(key);
  const today = Math.floor(at / day);
  // Prices hold for a few days, then a sale, a rise or back to normal.
  const epochLength = 3 + (seed % 4);
  const epoch = Math.floor((today + (seed % epochLength)) / epochLength);
  const roll = random(seed, epoch);
  const level =
    roll < 0.55
      ? 1
      : roll < 0.8
        ? 0.88 + 0.07 * random(seed, epoch + 1e6)
        : roll < 0.93
          ? 1.05
          : 0.8;
  // Products get slowly cheaper over the year.
  const drift = 1 - 0.0002 * (today - 20_454);
  const storeFactor = 0.93 + 0.14 * random(hash(offer.domain + familyKey(offer.title)));
  const { currency } = currencyFor(offer.domain);
  const price = charm(
    basePrice(offer.title) * storeFactor * level * drift * (currencyRate[currency] ?? 1),
  );

  const availability: Availability = random(seed, today + 5e6) < 0.06 ? "out_of_stock" : "in_stock";
  return { price, availability, checkedAt: at };
}

function categoryOf(title: string) {
  const lower = title.toLowerCase();
  if (/\b(iphone|galaxy|pixel|telefon|phone|smartphone)\b/.test(lower)) return "Phones";
  if (/\b(laptop|notebook|macbook)\b/.test(lower)) return "Laptops";
  if (/\b(tv|televizor|oled|qled)\b/.test(lower)) return "TVs";
  if (/\b(casti|headphones|airpods|buds)\b/.test(lower)) return "Audio";
  return undefined;
}

function identityFor(title: string, country: CountryCode): ProductIdentity {
  const normalized = normalizeTitle(title);
  const { storage, color } = normalized.variant;
  return {
    title: normalized.title,
    brand: normalized.brand,
    model: normalized.model,
    gtin: ean13(`${familyKey(title)}|${storage ?? ""}|${color ?? ""}`.toLowerCase()),
    variant: normalized.variant,
    category: categoryOf(normalized.title),
    country,
  };
}

/** The title with its storage swapped, such as "… 256GB …" for "… 128GB …". */
function withStorage(title: string, from: string, to: string) {
  return title.replace(new RegExp(from.replace(/[.]/g, "\\."), "i"), to);
}

const storageSteps = ["64GB", "128GB", "256GB", "512GB", "1TB"];

function storageVariants(identity: ProductIdentity, country: CountryCode) {
  const storage = identity.variant.storage;
  if (!storage || !storageSteps.includes(storage)) return [];
  return storageSteps
    .filter((s) => Math.abs(storageSteps.indexOf(s) - storageSteps.indexOf(storage)) <= 1)
    .map((s) => ({
      label: s,
      identity:
        s === storage ? identity : identityFor(withStorage(identity.title, storage, s), country),
    }));
}

/** How a store might title the product: different order, separators, extra words. */
function storeTitle(identity: ProductIdentity, style: number) {
  const { brand, model, variant } = identity;
  if (!brand || !model) return identity.title;
  const parts = [variant.storage, variant.size, variant.color].filter(Boolean);
  switch (style % 3) {
    case 0:
      return [brand, model, ...parts].join(" ");
    case 1:
      return `${brand} ${model}, ${parts.join(", ")}`;
    default:
      return `${identity.category === "Phones" ? "Smartphone " : ""}${brand} ${model} ${parts.join(" ")}`;
  }
}

function offerUrl(domain: string, title: string) {
  return `https://www.${domain}/${slugify(title)}/p/${hash(domain + title).toString(36)}`;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function createDemoSource({ delayMs = 700 }: { delayMs?: number } = {}): PriceSource {
  return {
    label: "Demo data",

    async identify(url) {
      await wait(delayMs);
      const title = titleFromPath(url.pathname);
      if (!title) {
        throw new IdentifyError(
          "We couldn't recognise a product in this link. Open the product's own page (not a search or category page) and copy its link.",
        );
      }
      const countryGuess = inferCountry({ hostname: url.hostname });
      const store = findStore(url.hostname) ?? genericStore(url.hostname, countryGuess.country);
      const identity = identityFor(title, countryGuess.country);
      const snapshot = demoSnapshot(
        { url: url.href, domain: store.domain, title: identity.title },
        Date.now(),
      );
      return {
        identity,
        countryGuess,
        store,
        snapshot: { price: snapshot.price, availability: snapshot.availability },
        variants: storageVariants(identity, countryGuess.country),
      } satisfies IdentifyResult;
    },

    async discover(identity, { country, stores: chosen, excludeDomain }) {
      await wait(delayMs * 1.5);
      const key = familyKey(identity.title);
      const seed = hash(`${key}|${country}`);
      const stores = chosen.filter((s) => s.domain !== excludeDomain);
      // Most stores sell the product; the rest return an accessory, which the matcher filters out.
      const sellers = stores.filter((s) => random(seed, hash(s.domain)) < 0.8);
      const others = stores.filter((s) => !sellers.includes(s));
      const now = Date.now();
      const storage = identity.variant.storage;
      const nextStorage = storage
        ? storageSteps[Math.min(storageSteps.indexOf(storage) + 1, storageSteps.length - 1)]
        : undefined;

      const candidates: Candidate[] = sellers.map((store, i) => {
        // With 4+ stores, the last one only sells another storage size: a "possible match".
        const otherVariant =
          sellers.length >= 4 &&
          i === sellers.length - 1 &&
          storage !== undefined &&
          storageSteps.includes(storage) &&
          nextStorage !== storage;
        const title =
          otherVariant && storage && nextStorage
            ? withStorage(storeTitle(identity, i), storage, nextStorage)
            : storeTitle(identity, i);
        const normalized = normalizeTitle(title);
        const listsGtin = !otherVariant && random(seed, i + 500) < 0.7;
        return {
          url: offerUrl(store.domain, title),
          domain: store.domain,
          title,
          brand: normalized.brand,
          model: normalized.model,
          variant: normalized.variant,
          gtin: listsGtin ? identity.gtin : undefined,
          price: demoSnapshot({ url: "", domain: store.domain, title }, now).price,
        };
      });

      if (identity.brand && identity.model) {
        for (const store of others) {
          const title = `Husa protectie pentru ${identity.brand} ${identity.model}`;
          candidates.push({
            url: offerUrl(store.domain, title),
            domain: store.domain,
            title,
            price: 49.99,
          });
        }
      }

      const sourcePrice = demoSnapshot(
        { url: "", domain: excludeDomain, title: identity.title },
        now,
      ).price;
      return rankCandidates({ ...identity, price: identity.price ?? sourcePrice }, candidates, {
        country,
        stores: stores.map((s) => s.domain),
        excludeDomain,
      });
    },

    async check(offer, now) {
      await wait(delayMs / 3);
      // Stores are sometimes down: the app must cope.
      if (random(hash(offer.url), Math.floor(now / hour)) < 0.03) {
        return { ok: false, error: "Store temporarily unreachable" };
      }
      const { price, availability } = demoSnapshot(offer, now);
      return { ok: true, snapshot: { price, availability } };
    },

    history(offer, from, to) {
      const points: PricePoint[] = [];
      for (let at = Math.ceil(from / day) * day + 9 * hour; at < to; at += day) {
        points.push(demoSnapshot(offer, at));
      }
      return points;
    },
  };
}
