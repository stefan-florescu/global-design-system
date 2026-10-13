import type { SupabaseClient } from "@supabase/supabase-js";

import {
  bestOffer,
  dedupe,
  detectChanges,
  eventsForWatch,
  isAnomalous,
  targetEvent,
  type ChangeEvent,
  type Snapshot,
} from "../lib/changes";
import {
  countries,
  findStore,
  hostMatches,
  inferCountry,
  isCountryCode,
  type CountryCode,
} from "../lib/countries";
import {
  buildQueries,
  rankCandidates,
  type Candidate,
  type RankedCandidate,
} from "../lib/discovery";
import type {
  Availability,
  MatchStatus,
  Notification,
  NotificationType,
  Offer,
  ProductIdentity,
  Settings,
  Watch,
} from "../lib/model";
import { normalizeTitle, titleFromPath } from "../lib/normalize";
import { parseProductPage, type ParsedProduct } from "../lib/parse-product";
import { nextCheckDelay } from "../lib/schedule";
import { defaultSettings, maxWatchedProducts } from "../lib/tracker";
import { canonicalUrl, checkProductUrl } from "../lib/url";

import { fetchPage, type FetchOptions, type PageResult } from "./fetch-page";
import { readListings, searchUrls } from "./search";

/*
 * What the price-tracker Edge Function does (ADR 0011): identify a pasted link, search the
 * stores a user chose, start tracking, check prices and raise alerts. The catalog is shared, so
 * a check updates every watcher of the product at once.
 */

export type Context = {
  /** A service-role client: bypasses row-level security. */
  db: SupabaseClient;
  fetch: FetchOptions;
  now: () => number;
  random: () => number;
};

export class UserError extends Error {
  override name = "UserError";
}

const blockedMessage = (store: string) =>
  `${store} doesn't allow automated price checks from our servers yet.`;

/* ---------------------------------------------------------------- Reading product pages */

export type PageSnapshot = Snapshot & { currency?: string };

function snapshotOf(parsed: ParsedProduct): PageSnapshot {
  return { price: parsed.price, availability: parsed.availability, currency: parsed.currency };
}

/** The product a parsed page describes, with brand, model and variant from its title. */
export function identityFromPage(
  parsed: ParsedProduct,
  url: URL,
  country: CountryCode,
): ProductIdentity | undefined {
  const title = parsed.title ?? titleFromPath(url.pathname);
  if (!title) return undefined;
  const normalized = normalizeTitle(title);
  return {
    title: normalized.title,
    brand: parsed.brand ?? normalized.brand,
    model: normalized.model,
    gtin: parsed.gtin || undefined,
    mpn: parsed.mpn,
    variant: normalized.variant,
    imageUrl: parsed.imageUrl,
    country,
  };
}

function storeOf(hostname: string, country: CountryCode) {
  const known = findStore(hostname);
  const domain = hostname.toLowerCase().replace(/^www\./, "");
  return known ?? { id: domain, name: domain, domain, country, scraperType: "jsonld" as const };
}

/** Reads a pasted link (plan T3.1–T3.4). A store that blocks us still yields its name. */
export async function identify(ctx: Context, input: string) {
  const check = checkProductUrl(input);
  if (!check.ok) throw new UserError(check.error);
  const url = check.url;
  const page = await fetchPage(url.href, ctx.fetch);
  const parsed: ParsedProduct = page.ok
    ? parseProductPage(page.html)
    : { price: null, availability: "unknown", sources: [] };
  const countryGuess = inferCountry({
    hostname: url.hostname,
    currency: parsed.currency,
    language: parsed.language,
  });
  const identity = identityFromPage(parsed, url, countryGuess.country);
  const store = storeOf(url.hostname, countryGuess.country);
  if (!identity) {
    throw new UserError(
      page.ok
        ? "We couldn't find a product on that page. Open the product's own page and copy its link."
        : `${blockedMessage(store.name)} Try a link to the same product from another store.`,
    );
  }
  return {
    identity,
    countryGuess,
    store,
    snapshot: { price: parsed.price, availability: parsed.availability },
    variants: [] as { label: string; identity: ProductIdentity }[],
    pageStatus: page.ok ? ("read" as const) : page.reason,
  };
}

/* ---------------------------------------------------------------- Searching stores */

export type StoreSearch = {
  domain: string;
  /** `unreachable`: the store didn't answer (timeout or network error). */
  status: "found" | "not_found" | "blocked" | "unreachable" | "error";
};

/** What to type into a store's search box: brand, model and storage, else the title. */
export function searchQuery(identity: ProductIdentity) {
  if (identity.brand && identity.model) {
    return [identity.brand, identity.model, identity.variant.storage].filter(Boolean).join(" ");
  }
  return buildQueries(identity).at(-1) ?? identity.title;
}

async function searchStore(
  ctx: Context,
  domain: string,
  query: string,
): Promise<{ status: StoreSearch["status"]; candidates: Candidate[] }> {
  let blocked = false;
  let answered = false;
  for (const searchUrl of searchUrls(domain, query)) {
    const page = await fetchPage(searchUrl, ctx.fetch);
    if (!page.ok) {
      blocked ||= page.reason === "blocked";
      answered ||= page.reason === "not_found" || page.reason === "blocked";
      continue;
    }
    answered = true;
    const listings = readListings(page.html, page.url, query, 2);
    if (listings.length === 0) continue;

    const candidates = await Promise.all(
      listings.map(async (listing): Promise<Candidate> => {
        const product = await fetchPage(listing.url, ctx.fetch);
        const parsed = product.ok ? parseProductPage(product.html) : undefined;
        const title = parsed?.title ?? listing.title;
        const normalized = normalizeTitle(title);
        return {
          url: canonicalUrl(new URL(listing.url)),
          domain,
          title,
          brand: parsed?.brand ?? normalized.brand,
          model: normalized.model,
          gtin: parsed?.gtin || undefined,
          mpn: parsed?.mpn,
          variant: normalized.variant,
          price: parsed?.price ?? null,
          availability: parsed?.availability,
        };
      }),
    );
    return { status: "found", candidates };
  }
  return {
    status: blocked ? "blocked" : answered ? "not_found" : "unreachable",
    candidates: [],
  };
}

/** Searches the chosen stores in parallel (plan T3.5–T3.6, D1). */
export async function discover(
  ctx: Context,
  identity: ProductIdentity & { price: number | null },
  country: CountryCode,
  domains: string[],
  excludeDomain: string,
): Promise<{ candidates: RankedCandidate[]; stores: StoreSearch[] }> {
  const query = searchQuery(identity);
  const targets = [...new Set(domains)].filter((d) => !hostMatches(excludeDomain, d)).slice(0, 15);
  const results = await Promise.all(
    targets.map(async (domain) => {
      try {
        return { domain, ...(await searchStore(ctx, domain, query)) };
      } catch {
        return { domain, status: "error" as const, candidates: [] };
      }
    }),
  );
  const candidates = rankCandidates(
    identity,
    results.flatMap((r) => r.candidates),
    { country, stores: targets, excludeDomain },
  );
  return {
    candidates,
    stores: results.map(({ domain, status }) => ({
      domain,
      status:
        status === "found" && !candidates.some((c) => c.domain === domain) ? "not_found" : status,
    })),
  };
}

/* ---------------------------------------------------------------- Database rows */

type ProductRow = {
  id: string;
  gtin: string | null;
  title: string;
  country: string;
  next_check_at: string;
  check_failures: number;
};

type OfferRow = {
  id: string;
  product_id: string;
  domain: string;
  store_name: string;
  url: string;
  title: string;
  current_price: number | string | null;
  currency: string;
  availability: Availability;
  last_checked_at: string;
  stale: boolean;
  last_error: string | null;
};

type WatchRow = {
  id: string;
  user_id: string;
  product_id: string;
  target_price: number | string | null;
  notify_on_drop: boolean;
  notify_on_stock: boolean;
  active: boolean;
  created_at: string;
};

const num = (value: number | string | null | undefined) =>
  value === null || value === undefined ? null : Number(value);

function must<T>(result: { data: T | null; error: { message: string } | null }, what: string): T {
  if (result.error) throw new Error(`${what}: ${result.error.message}`);
  if (result.data === null) throw new Error(`${what}: no data`);
  return result.data;
}

export function offerFromRow(row: OfferRow, status: MatchStatus, confidence = 1): Offer {
  return {
    id: row.id,
    productId: row.product_id,
    storeId: row.domain,
    storeName: row.store_name,
    domain: row.domain,
    url: row.url,
    title: row.title,
    currentPrice: num(row.current_price),
    currency: row.currency,
    availability: row.availability,
    lastCheckedAt: Date.parse(row.last_checked_at),
    matchConfidence: confidence,
    status,
    stale: row.stale,
  };
}

export function watchFromRow(row: WatchRow): Watch {
  return {
    id: row.id,
    productId: row.product_id,
    targetPrice: num(row.target_price),
    notifyOnDrop: row.notify_on_drop,
    notifyOnStock: row.notify_on_stock,
    active: row.active,
    createdAt: Date.parse(row.created_at),
  };
}

/* ---------------------------------------------------------------- Tracking */

export type TrackInput = {
  url: string;
  identity: ProductIdentity;
  country: CountryCode;
  snapshot: Snapshot;
  candidates: Pick<
    RankedCandidate,
    "url" | "domain" | "title" | "price" | "availability" | "match"
  >[];
};

/** Adds a product to a user's watchlist, creating it in the catalog if it is new. */
export async function track(ctx: Context, userId: string, input: TrackInput) {
  const check = checkProductUrl(input.url);
  if (!check.ok) throw new UserError(check.error);
  if (!isCountryCode(input.country)) throw new UserError("Choose a country.");
  const { db } = ctx;
  const sourceUrl = canonicalUrl(check.url);
  const nowIso = new Date(ctx.now()).toISOString();

  const { count } = await db
    .from("pt_watches")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);
  if ((count ?? 0) >= maxWatchedProducts) {
    throw new UserError(
      `You're tracking ${maxWatchedProducts} products, the most the free plan allows.`,
    );
  }

  // One catalog entry per product: by barcode, else by link.
  const gtin = input.identity.gtin || null;
  const existing = gtin
    ? await db.from("pt_products").select("id").eq("gtin", gtin).maybeSingle()
    : await db.from("pt_products").select("id").eq("source_url", sourceUrl).maybeSingle();
  let productId = (existing.data as { id: string } | null)?.id;
  if (!productId) {
    const { identity } = input;
    const inserted = await db
      .from("pt_products")
      .upsert(
        {
          gtin,
          mpn: identity.mpn ?? null,
          title: identity.title,
          brand: identity.brand ?? null,
          model: identity.model ?? null,
          variant: identity.variant,
          image_url: identity.imageUrl ?? null,
          category: identity.category ?? null,
          country: input.country,
          source_url: sourceUrl,
          next_check_at: new Date(
            ctx.now() + nextCheckDelay({ watchers: 1, now: ctx.now(), random: ctx.random() }),
          ).toISOString(),
        },
        { onConflict: "source_url" },
      )
      .select("id")
      .single();
    productId = must(inserted, "Saving the product").id as string;
  }

  const currency = countries[input.country].currency;
  const source = storeOf(check.url.hostname, input.country);
  const offerRows = [
    {
      url: sourceUrl,
      domain: source.domain,
      store_name: source.name,
      title: input.identity.title,
      price: input.snapshot.price,
      availability: input.snapshot.availability,
      status: "accepted" as MatchStatus,
      confidence: 1,
    },
    ...input.candidates
      .filter((c) => checkProductUrl(c.url).ok)
      .map((c) => ({
        url: c.url,
        domain: c.domain,
        store_name: storeOf(c.domain, input.country).name,
        title: c.title,
        price: c.price ?? null,
        availability: (c.availability ?? "unknown") as Availability,
        status: (c.match.decision === "accept" ? "accepted" : "possible") as MatchStatus,
        confidence: c.match.score,
      })),
  ];

  const upserted = must(
    await db
      .from("pt_offers")
      .upsert(
        offerRows.map((o) => ({
          product_id: productId,
          domain: o.domain,
          store_name: o.store_name,
          url: o.url,
          title: o.title,
          currency,
        })),
        { onConflict: "product_id,url", ignoreDuplicates: false },
      )
      .select("id, url, current_price"),
    "Saving the stores",
  ) as { id: string; url: string; current_price: number | null }[];

  // First prices for offers we have a price for and haven't priced before.
  const firstPrices = offerRows.flatMap((o) => {
    const row = upserted.find((r) => r.url === o.url);
    return row && row.current_price === null && o.price !== null
      ? [{ id: row.id, price: o.price, availability: o.availability }]
      : [];
  });
  for (const p of firstPrices) {
    await db
      .from("pt_offers")
      .update({ current_price: p.price, availability: p.availability, last_checked_at: nowIso })
      .eq("id", p.id);
  }
  if (firstPrices.length > 0) {
    await db.from("pt_price_points").insert(
      firstPrices.map((p) => ({
        offer_id: p.id,
        price: p.price,
        availability: p.availability,
        checked_at: nowIso,
      })),
    );
  }

  const watch = must(
    await db
      .from("pt_watches")
      .upsert({ user_id: userId, product_id: productId }, { onConflict: "user_id,product_id" })
      .select("id")
      .single(),
    "Saving the watch",
  ) as { id: string };

  // The user's view of every offer: theirs as found, others' as possible matches.
  const allOffers = must(
    await db.from("pt_offers").select("id, url").eq("product_id", productId),
    "Reading the stores",
  ) as { id: string; url: string }[];
  await db.from("pt_watch_offers").upsert(
    allOffers.map((offer) => {
      const mine = offerRows.find((o) => o.url === offer.url);
      return {
        watch_id: watch.id,
        offer_id: offer.id,
        status: mine?.status ?? "possible",
        match_confidence: mine?.confidence ?? 0.5,
      };
    }),
    { onConflict: "watch_id,offer_id", ignoreDuplicates: true },
  );

  return { productId };
}

/** "Add a store link manually" (plan T3.7) for a product the user watches. */
export async function addOffer(ctx: Context, userId: string, productId: string, input: string) {
  const check = checkProductUrl(input);
  if (!check.ok) throw new UserError(check.error);
  const { db } = ctx;
  const watch = (
    await db
      .from("pt_watches")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle()
  ).data as { id: string } | null;
  if (!watch) throw new UserError("You don't track this product.");
  const product = must(
    await db.from("pt_products").select("id, title, country").eq("id", productId).single(),
    "Reading the product",
  ) as Pick<ProductRow, "id" | "title" | "country">;
  const country = isCountryCode(product.country) ? product.country : "RO";
  const store = storeOf(check.url.hostname, country);

  const page = await fetchPage(check.url.href, ctx.fetch);
  if (!page.ok) {
    throw new UserError(
      page.reason === "blocked"
        ? blockedMessage(store.name)
        : `We couldn't open that page (${page.reason.replace("_", " ")}).`,
    );
  }
  const parsed = parseProductPage(page.html);
  const nowIso = new Date(ctx.now()).toISOString();
  const offer = must(
    await db
      .from("pt_offers")
      .upsert(
        {
          product_id: productId,
          domain: store.domain,
          store_name: store.name,
          url: canonicalUrl(check.url),
          title: parsed.title ?? product.title,
          currency: countries[country].currency,
          current_price: parsed.price,
          availability: parsed.availability,
          last_checked_at: nowIso,
        },
        { onConflict: "product_id,url" },
      )
      .select("id")
      .single(),
    "Saving the store",
  ) as { id: string };
  await db.from("pt_price_points").insert({
    offer_id: offer.id,
    price: parsed.price,
    availability: parsed.availability,
    checked_at: nowIso,
  });

  // One row per store: the user's link replaces an unconfirmed listing from the same store.
  const sameStore = (
    await db.from("pt_offers").select("id").eq("product_id", productId).eq("domain", store.domain)
  ).data as { id: string }[] | null;
  const others = (sameStore ?? []).map((o) => o.id).filter((id) => id !== offer.id);
  if (others.length > 0) {
    await db
      .from("pt_watch_offers")
      .update({ status: "rejected" })
      .eq("watch_id", watch.id)
      .in("offer_id", others)
      .neq("status", "accepted");
  }
  await db.from("pt_watch_offers").upsert(
    {
      watch_id: watch.id,
      offer_id: offer.id,
      status: "accepted",
      match_confidence: 1,
      manual: true,
    },
    { onConflict: "watch_id,offer_id" },
  );
  return { offerId: offer.id };
}

/* ---------------------------------------------------------------- Checking prices */

type CheckOutcome =
  | { offer: OfferRow; ok: true; next: PageSnapshot; stale: boolean }
  | { offer: OfferRow; ok: false; error: string };

async function checkOffer(ctx: Context, offer: OfferRow): Promise<CheckOutcome> {
  const page: PageResult = await fetchPage(offer.url, ctx.fetch);
  if (!page.ok) return { offer, ok: false, error: page.reason };
  const next = snapshotOf(parseProductPage(page.html));
  if (next.price === null && next.availability === "unknown") {
    return { offer, ok: false, error: "unreadable" };
  }
  const previous = { price: num(offer.current_price), availability: offer.availability };
  return { offer, ok: true, next, stale: isAnomalous(previous, next) };
}

/**
 * Checks every offer of a product, records the prices, and alerts each watcher about the
 * changes they asked for (plan T4.1–T4.4).
 */
export async function checkProduct(ctx: Context, productId: string) {
  const { db } = ctx;
  const now = ctx.now();
  const nowIso = new Date(now).toISOString();
  const offers = must(
    await db.from("pt_offers").select("*").eq("product_id", productId),
    "Reading the stores",
  ) as OfferRow[];

  const outcomes = await Promise.all(offers.map((offer) => checkOffer(ctx, offer)));
  const before = new Map(offers.map((o) => [o.id, o]));
  const after = new Map(offers.map((o) => [o.id, { ...o }]));
  const events: ChangeEvent[] = [];
  const points: {
    offer_id: string;
    price: number | null;
    availability: Availability;
    checked_at: string;
  }[] = [];

  for (const outcome of outcomes) {
    const row = after.get(outcome.offer.id);
    if (!row) continue;
    row.last_checked_at = nowIso;
    if (!outcome.ok) {
      row.last_error = outcome.error;
      continue;
    }
    if (outcome.stale) {
      row.stale = true;
      row.last_error = "anomaly";
      continue;
    }
    const previous = {
      price: num(outcome.offer.current_price),
      availability: outcome.offer.availability,
    };
    events.push(...detectChanges(row.id, previous, outcome.next));
    row.current_price = outcome.next.price;
    row.availability = outcome.next.availability;
    row.stale = false;
    row.last_error = null;
    points.push({
      offer_id: row.id,
      price: outcome.next.price,
      availability: outcome.next.availability,
      checked_at: nowIso,
    });
  }

  for (const row of after.values()) {
    await db
      .from("pt_offers")
      .update({
        current_price: row.current_price,
        availability: row.availability,
        last_checked_at: row.last_checked_at,
        stale: row.stale,
        last_error: row.last_error,
      })
      .eq("id", row.id);
  }
  if (points.length > 0) await db.from("pt_price_points").insert(points);

  const notified = await notifyWatchers(ctx, productId, events, before, after);

  const failures = outcomes.filter((o) => !o.ok).length;
  const allFailed = outcomes.length > 0 && failures === outcomes.length;
  const product = (
    await db.from("pt_products").select("check_failures").eq("id", productId).single()
  ).data as Pick<ProductRow, "check_failures"> | null;
  const watchers = (
    await db
      .from("pt_watches")
      .select("id", { count: "exact", head: true })
      .eq("product_id", productId)
  ).count;
  const failuresInRow = allFailed ? (product?.check_failures ?? 0) + 1 : 0;
  await db
    .from("pt_products")
    .update({
      check_failures: failuresInRow,
      next_check_at: new Date(
        now +
          nextCheckDelay({
            watchers: watchers ?? 1,
            lastChangeAt: events.length > 0 ? now : undefined,
            failures: failuresInRow,
            now,
            random: ctx.random(),
          }),
      ).toISOString(),
    })
    .eq("id", productId);

  return { checked: outcomes.length, failed: failures, events: events.length, notified };
}

type SettingsRow = { user_id: string; notify_on_increase: boolean; dedupe_hours: number };

async function notifyWatchers(
  ctx: Context,
  productId: string,
  events: ChangeEvent[],
  before: Map<string, OfferRow>,
  after: Map<string, OfferRow>,
) {
  const { db } = ctx;
  const now = ctx.now();
  const watches =
    (
      (await db.from("pt_watches").select("*").eq("product_id", productId)).data as
        WatchRow[] | null
    )?.filter((w) => w.active) ?? [];
  if (watches.length === 0) return 0;

  const matches = ((
    await db
      .from("pt_watch_offers")
      .select("watch_id, offer_id, status")
      .in(
        "watch_id",
        watches.map((w) => w.id),
      )
  ).data ?? []) as { watch_id: string; offer_id: string; status: MatchStatus }[];
  const settingsRows = ((
    await db
      .from("pt_settings")
      .select("user_id, notify_on_increase, dedupe_hours")
      .in(
        "user_id",
        watches.map((w) => w.user_id),
      )
  ).data ?? []) as SettingsRow[];
  const recent = ((
    await db
      .from("pt_notifications")
      .select("*")
      .eq("product_id", productId)
      .gte("sent_at", new Date(now - 7 * 24 * 3_600_000).toISOString())
  ).data ?? []) as {
    id: string;
    user_id: string;
    watch_id: string;
    product_id: string;
    type: NotificationType;
    payload: Notification["payload"];
    sent_at: string;
    read: boolean;
  }[];

  const rows = [];
  for (const watchRow of watches) {
    const watch = watchFromRow(watchRow);
    const statuses = new Map(
      matches.filter((m) => m.watch_id === watch.id).map((m) => [m.offer_id, m.status]),
    );
    const accepted = (map: Map<string, OfferRow>) =>
      [...map.values()]
        .filter((row) => statuses.get(row.id) === "accepted")
        .map((row) => offerFromRow(row, "accepted"));
    const mine = events.filter((e) => statuses.get(e.offerId) === "accepted");
    const target = targetEvent(watch, bestOffer(accepted(before)), bestOffer(accepted(after)));
    if (target) mine.push(target);

    const s = settingsRows.find((r) => r.user_id === watchRow.user_id);
    const settings: Settings = {
      ...defaultSettings,
      notifyOnIncrease: s?.notify_on_increase ?? defaultSettings.notifyOnIncrease,
      dedupeHours: s?.dedupe_hours ?? defaultSettings.dedupeHours,
    };
    const sent: Notification[] = recent
      .filter((n) => n.user_id === watchRow.user_id)
      .map((n) => ({
        id: n.id,
        watchId: n.watch_id,
        productId: n.product_id,
        type: n.type,
        payload: n.payload,
        sentAt: Date.parse(n.sent_at),
        read: n.read,
      }));
    for (const event of dedupe(
      eventsForWatch(mine, watch, settings),
      sent,
      now,
      settings.dedupeHours,
    )) {
      const offer = after.get(event.offerId);
      rows.push({
        user_id: watchRow.user_id,
        watch_id: watch.id,
        product_id: productId,
        type: event.type,
        payload: {
          offerId: event.offerId,
          storeName: offer?.store_name ?? "",
          currency: offer?.currency ?? "",
          oldPrice: event.oldPrice ?? null,
          newPrice: event.newPrice ?? null,
        },
        sent_at: new Date(now).toISOString(),
      });
    }
  }
  if (rows.length > 0) await db.from("pt_notifications").insert(rows);
  return rows.length;
}

/** The scheduler (plan T3.9): checks watched products whose next check is due. */
export async function checkDue(ctx: Context, limit = 8) {
  const { db } = ctx;
  const due = ((
    await db
      .from("pt_products")
      .select("id, pt_watches!inner(id)")
      .lte("next_check_at", new Date(ctx.now()).toISOString())
      .order("next_check_at")
      .limit(limit)
  ).data ?? []) as { id: string }[];
  const results = [];
  for (const product of due) {
    results.push({ productId: product.id, ...(await checkProduct(ctx, product.id)) });
  }
  return results;
}

/** A user-requested check, at most once every 10 minutes per product. */
export async function checkNow(ctx: Context, userId: string, productId: string) {
  const { db } = ctx;
  const watch = (
    await db
      .from("pt_watches")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle()
  ).data;
  if (!watch) throw new UserError("You don't track this product.");
  const latest = (
    await db
      .from("pt_offers")
      .select("last_checked_at")
      .eq("product_id", productId)
      .order("last_checked_at", { ascending: true })
      .limit(1)
      .maybeSingle()
  ).data as { last_checked_at: string } | null;
  if (latest && ctx.now() - Date.parse(latest.last_checked_at) < 10 * 60_000) {
    return { checked: 0, failed: 0, events: 0, notified: 0, skipped: "recent" as const };
  }
  return checkProduct(ctx, productId);
}

/** Deletes the user's account and everything that belongs to it (plan T7.5). */
export async function deleteAccount(ctx: Context, userId: string) {
  const { error } = await ctx.db.auth.admin.deleteUser(userId);
  if (error) throw new Error(`Deleting the account: ${error.message}`);
  return { deleted: true };
}
