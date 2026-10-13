"use client";

import {
  ArrowLeft,
  CircleAlert,
  RefreshCw,
  SquareArrowOutUpRight,
  Trash2,
} from "@stefan-florescu/icons";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  SkeletonBlock,
  buttonVariants,
} from "@stefan-florescu/ui";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { checkProduct } from "@/lib/actions";
import { countries } from "@/lib/countries";
import { useNow } from "@/lib/use-now";
import { dispatch, useTracker } from "@/lib/use-tracker";
import { bestSeries, day, money, moneyAxis, offerSeries, summarize, timeAgo } from "@/lib/view";

import { AlertSettings } from "./alert-settings";
import { AvailabilityBadge, TrendBadge } from "./badges";
import { OffersTable } from "./offers-table";
import { PriceChart, seriesColors, type ChartSeries } from "./price-chart";
import { ProductImage } from "./product-image";

const ranges = [
  { id: "7d", label: "7 days", days: 7 },
  { id: "30d", label: "30 days", days: 30 },
  { id: "90d", label: "90 days", days: 90 },
  { id: "all", label: "All", days: null },
] as const;

type RangeId = (typeof ranges)[number]["id"];

/** A product: best price, history chart, stores and alert settings (plan screen 6). */
export function ProductDetail() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const { state } = useTracker();
  const [range, setRange] = useState<RangeId>("30d");
  const [view, setView] = useState<"best" | "stores">("best");
  const [checking, setChecking] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [checkMessage, setCheckMessage] = useState("");
  const now = useNow();

  const product = state?.products.find((p) => p.id === id);
  const summary = state && product ? summarize(state, product, now) : undefined;

  // The React Compiler memoizes this.
  const chart = (() => {
    if (!state || !summary) return null;
    const days = ranges.find((r) => r.id === range)?.days ?? null;
    const from = days === null ? 0 : now - days * day;
    const format = (value: number | null) => money(summary.product, value);
    if (view === "best") {
      return {
        series: [
          {
            id: "best",
            label: "Best price",
            color: seriesColors[0],
            points: bestSeries(state, summary.accepted, from),
          },
        ] satisfies ChartSeries[],
        format,
      };
    }
    // Colours follow each store's place in the product's list, not its rank.
    const series = summary.offers
      .map((offer, index) => ({ offer, index }))
      .filter(({ offer }) => offer.status === "accepted")
      .slice(0, seriesColors.length)
      .map(({ offer, index }) => ({
        id: offer.id,
        label: offer.storeName,
        color: seriesColors[index % seriesColors.length] ?? seriesColors[0],
        points: offerSeries(state, offer, from),
      }));
    return { series, format };
  })();

  if (state === null) {
    return (
      <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading product">
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-80" />
      </div>
    );
  }

  if (!product || !summary || !chart) {
    return (
      <Card className="*:flex *:flex-col *:items-center *:gap-4 *:p-10 *:text-center">
        <h1 className="text-heading text-2xl font-bold">Product not found</h1>
        <p className="text-body">
          It may have been removed from your watchlist, or the link is incomplete.
        </p>
        <Link href="/" className={buttonVariants()}>
          Back to the watchlist
        </Link>
      </Card>
    );
  }

  const { best, watch, trend } = summary;
  const acceptedCount = summary.accepted.length;
  const failedRecently = summary.accepted.filter((o) => o.stale);

  const runCheck = async () => {
    setChecking(true);
    setCheckMessage("Checking prices…");
    try {
      setCheckMessage(await checkProduct(product.id));
    } catch (error) {
      setCheckMessage(error instanceof Error ? error.message : "The check failed. Try again.");
    }
    setChecking(false);
  };

  return (
    <>
      <Link
        href="/"
        className={buttonVariants({ variant: "ghost", size: "sm", className: "-ms-3 w-fit" })}
      >
        <ArrowLeft aria-hidden />
        Watchlist
      </Link>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <ProductImage src={product.imageUrl} className="size-28" />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <h1 className="text-heading text-2xl font-bold break-words md:text-3xl">
            {product.title}
          </h1>
          <p className="text-body text-sm">
            {[
              product.brand,
              product.model,
              product.gtin ? `EAN ${product.gtin}` : null,
              countries[product.country].name,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-heading text-3xl font-bold tabular-nums">
              <span className="sr-only">Best price: </span>
              {money(product, best?.currentPrice)}
            </p>
            {best ? <span className="text-body">at {best.storeName}</span> : null}
            <TrendBadge trend={trend} />
            <AvailabilityBadge availability={summary.inStock ? "in_stock" : "out_of_stock"} />
            {summary.belowTarget ? <Badge variant="success">At your target</Badge> : null}
          </div>
          <p className="text-body-subtle text-sm">
            {acceptedCount} {acceptedCount === 1 ? "store" : "stores"} · checked{" "}
            {timeAgo(summary.lastCheckedAt, now)} · next check{" "}
            {timeAgo(state.nextCheckAt[product.id] ?? now, now)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-col md:items-stretch">
          {best ? (
            <a
              href={best.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className={buttonVariants()}
            >
              Go to {best.storeName}
              <SquareArrowOutUpRight aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <Button variant="secondary" onClick={() => void runCheck()} loading={checking}>
            <RefreshCw aria-hidden />
            Check prices now
          </Button>
          <Button variant="ghost" onClick={() => setRemoving(true)}>
            <Trash2 aria-hidden />
            Stop tracking
          </Button>
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-body text-sm empty:hidden">
        {checkMessage}
      </p>

      {failedRecently.length > 0 ? (
        <Alert variant="warning" icon={<CircleAlert />}>
          The last check of {failedRecently.map((o) => o.storeName).join(", ")} returned a price
          that looks wrong, so we kept the previous one. We&apos;ll try again at the next check.
        </Alert>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex min-w-0 flex-col gap-8">
          <section aria-labelledby="history-heading" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="history-heading" className="text-heading text-xl font-semibold">
                Price history
              </h2>
              <div className="flex flex-wrap gap-2">
                <ButtonGroup aria-label="Lines">
                  {(
                    [
                      ["best", "Best price"],
                      ["stores", "Each store"],
                    ] as const
                  ).map(([value, label]) => (
                    <Button
                      key={value}
                      variant="secondary"
                      size="xs"
                      aria-pressed={view === value}
                      className="aria-pressed:bg-brand-softer aria-pressed:text-fg-brand-strong"
                      onClick={() => setView(value)}
                    >
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
                <ButtonGroup aria-label="Range">
                  {ranges.map((r) => (
                    <Button
                      key={r.id}
                      variant="secondary"
                      size="xs"
                      aria-pressed={range === r.id}
                      className="aria-pressed:bg-brand-softer aria-pressed:text-fg-brand-strong"
                      onClick={() => setRange(r.id)}
                    >
                      {r.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </div>
            <Card className="*:p-4">
              <PriceChart
                series={chart.series}
                format={chart.format}
                formatAxis={(value) => moneyAxis(product, value)}
                showStats={view === "best"}
                label={`${view === "best" ? "Best price" : "Price at each store"}, ${
                  ranges.find((r) => r.id === range)?.label.toLowerCase() ?? ""
                }`}
              />
              {view === "stores" && acceptedCount > seriesColors.length ? (
                <p className="text-body-subtle mt-2 text-xs">
                  Showing the first {seriesColors.length} of {acceptedCount} stores.
                </p>
              ) : null}
            </Card>
          </section>

          <OffersTable product={product} offers={summary.offers} />
        </div>

        <aside aria-label="Alert settings" className="flex flex-col gap-6">
          {watch ? (
            <AlertSettings
              key={watch.id}
              product={product}
              watch={watch}
              bestPrice={best?.currentPrice ?? null}
            />
          ) : null}
        </aside>
      </div>

      <Modal open={removing} onOpenChange={setRemoving} size="md">
        <ModalContent role="alertdialog">
          <ModalHeader>
            <ModalTitle>Stop tracking?</ModalTitle>
            <ModalClose label="Close" />
          </ModalHeader>
          <ModalBody>
            <p className="text-body">
              “{product.title}” will be removed with its price history and alerts. This can&apos;t
              be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="danger"
              onClick={() => {
                dispatch({ type: "removeProduct", productId: product.id });
                router.push("/");
              }}
            >
              Stop tracking
            </Button>
            <ModalClose asChild>
              <Button variant="secondary" data-autofocus>
                Cancel
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
