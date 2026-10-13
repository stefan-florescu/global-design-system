"use client";

import { Plus, Search } from "@stefan-florescu/icons";
import {
  Badge,
  Button,
  Card,
  Label,
  SearchInput,
  Select,
  SkeletonBlock,
  buttonVariants,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { useMemo, useState } from "react";

import { countries } from "@/lib/countries";
import { maxWatchedProducts } from "@/lib/tracker";
import { useNow } from "@/lib/use-now";
import { useTracker } from "@/lib/use-tracker";
import { money, summarize, timeAgo, type ProductSummary } from "@/lib/view";

import { AvailabilityBadge, TrendBadge } from "./badges";
import { DemoNotice } from "./demo-notice";
import { PageHeading } from "./page-shell";
import { ProductImage } from "./product-image";

const filters = {
  all: { label: "All products", test: () => true },
  "in-stock": { label: "In stock", test: (s: ProductSummary) => s.inStock },
  dropped: {
    label: "Cheaper this week",
    test: (s: ProductSummary) => s.trend.direction === "down",
  },
  target: { label: "At my target price", test: (s: ProductSummary) => s.belowTarget },
  review: { label: "Matches to review", test: (s: ProductSummary) => s.possibleCount > 0 },
} as const;

type FilterId = keyof typeof filters;

const sorts = {
  recent: {
    label: "Recently added",
    compare: (a: ProductSummary, b: ProductSummary) => b.product.createdAt - a.product.createdAt,
  },
  price: {
    label: "Lowest price",
    compare: (a: ProductSummary, b: ProductSummary) =>
      (a.best?.currentPrice ?? Infinity) - (b.best?.currentPrice ?? Infinity),
  },
  drop: {
    label: "Biggest drop",
    compare: (a: ProductSummary, b: ProductSummary) => a.trend.change - b.trend.change,
  },
  name: {
    label: "Name",
    compare: (a: ProductSummary, b: ProductSummary) =>
      a.product.title.localeCompare(b.product.title),
  },
} as const;

type SortId = keyof typeof sorts;

/** Example links for a first visit, one per kind of product. */
export const sampleLinks = [
  "https://www.emag.ro/telefon-mobil-apple-iphone-15-128gb-5g-black/pd/DMC4NBYBM/",
  "https://www.altex.ro/casti-sony-wh-1000xm5-bluetooth-negru/cpd/CASWH1000XM5B/",
  "https://www.flanco.ro/televizor-samsung-qe55q60c-55-qled-4k-negru.html",
];

/** The watchlist: every tracked product with its best price, trend and stock (plan screen 3). */
export function Watchlist() {
  const { state } = useTracker();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [sort, setSort] = useState<SortId>("recent");
  const now = useNow();

  const summaries = useMemo(
    () => (state ? state.products.map((product) => summarize(state, product, now)) : []),
    [state, now],
  );

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return summaries
      .filter((s) => filters[filter].test(s))
      .filter((s) => {
        const text =
          `${s.product.title} ${s.product.brand ?? ""} ${s.product.gtin ?? ""}`.toLowerCase();
        return words.every((word) => text.includes(word));
      })
      .sort(sorts[sort].compare);
  }, [summaries, query, filter, sort]);

  const count = state?.products.length ?? 0;

  return (
    <>
      <PageHeading
        title="Watchlist"
        description={
          state
            ? `${count} of ${maxWatchedProducts} products tracked. Prices are checked every 6–12 hours.`
            : "Loading your products…"
        }
        actions={
          <Link href="/add" className={buttonVariants()}>
            <Plus aria-hidden />
            Add product
          </Link>
        }
      />
      <DemoNotice />

      {state === null ? (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
          aria-label="Loading products"
        >
          {[0, 1, 2].map((i) => (
            <SkeletonBlock key={i} className="h-44" />
          ))}
        </div>
      ) : count === 0 ? (
        <EmptyWatchlist />
      ) : (
        <section aria-labelledby="products-heading" className="flex flex-col gap-4">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="product-search">Search</Label>
              <SearchInput
                id="product-search"
                placeholder="Name, brand or EAN"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 md:w-56">
              <Label htmlFor="product-filter">Show</Label>
              <Select
                id="product-filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value as FilterId)}
              >
                {Object.entries(filters).map(([id, f]) => (
                  <option key={id} value={id}>
                    {f.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-2 md:w-48">
              <Label htmlFor="product-sort">Sort by</Label>
              <Select
                id="product-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortId)}
              >
                {Object.entries(sorts).map(([id, s]) => (
                  <option key={id} value={id}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <p className="text-body text-sm" aria-live="polite">
            {shown.length === count ? `${count} products` : `${shown.length} of ${count} products`}
          </p>

          {shown.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((summary) => (
                <li key={summary.product.id}>
                  <ProductCard summary={summary} now={now} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-base border-default-medium flex flex-col items-center gap-3 border border-dashed p-8 text-center">
              <Search aria-hidden className="text-body-subtle size-6" />
              <p className="text-body">No products match. Try another search or filter.</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                Clear search and filter
              </Button>
            </div>
          )}
        </section>
      )}
    </>
  );
}

function ProductCard({ summary, now }: { summary: ProductSummary; now: number }) {
  const { product, best, trend, accepted, possibleCount, belowTarget } = summary;
  const href = `/product?id=${encodeURIComponent(product.id)}`;

  return (
    <Card className="hover:bg-neutral-secondary-medium relative h-full transition-colors *:flex *:h-full *:flex-col *:gap-4 *:p-5 motion-reduce:transition-none">
      <div className="flex items-start gap-4">
        <ProductImage src={product.imageUrl} className="size-16" />
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-heading line-clamp-2 leading-6 font-semibold">
            {/* The link covers the whole card (after:absolute), so the card is one click target. */}
            <Link
              href={href}
              className="focus-visible:outline-brand after:rounded-base rounded-sm after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {product.title}
            </Link>
          </h3>
          <p className="text-body text-sm">
            {best ? `Best at ${best.storeName}` : "No price yet"} · {accepted.length}{" "}
            {accepted.length === 1 ? "store" : "stores"} in {countries[product.country].name}
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-2">
        <p className="text-heading text-2xl font-bold">
          <span className="sr-only">Best price: </span>
          {money(product, best?.currentPrice)}
        </p>
        <TrendBadge trend={trend} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <AvailabilityBadge availability={summary.inStock ? "in_stock" : "out_of_stock"} />
        {belowTarget ? <Badge variant="success">At target</Badge> : null}
        {possibleCount > 0 ? <Badge variant="warning">{possibleCount} to review</Badge> : null}
        <span className="text-body-subtle ms-auto text-xs">
          Checked {timeAgo(summary.lastCheckedAt, now)}
        </span>
      </div>
    </Card>
  );
}

function EmptyWatchlist() {
  return (
    <Card className="items-center text-center *:flex *:flex-col *:items-center *:gap-4 *:p-10">
      <ProductImage className="size-16" />
      <div className="flex flex-col gap-2">
        <h2 className="text-heading text-xl font-semibold">Nothing tracked yet</h2>
        <p className="text-body max-w-prose">
          Paste a product link from any store. We find the same product in other stores in that
          country, then alert you when its price drops or it comes back in stock.
        </p>
      </div>
      <Link href="/add" className={buttonVariants()}>
        <Plus aria-hidden />
        Add your first product
      </Link>
      <div className="flex flex-col items-center gap-2">
        <p className="text-body text-sm">Or try an example:</p>
        <ul className="flex flex-wrap justify-center gap-2">
          {sampleLinks.map((link) => (
            <li key={link}>
              <Link
                href={`/add?url=${encodeURIComponent(link)}`}
                className={buttonVariants({ variant: "secondary", size: "xs" })}
              >
                {new URL(link).hostname.replace(/^www\./, "")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
