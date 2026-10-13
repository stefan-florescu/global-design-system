"use client";

import { Bell, Check, Trash2 } from "@stefan-florescu/icons";
import { Badge, Button, Card, SkeletonBlock, cn } from "@stefan-florescu/ui";
import Link from "next/link";

import type { Notification, NotificationType, Product } from "@/lib/model";
import { useNow } from "@/lib/use-now";
import { dispatch, useTracker } from "@/lib/use-tracker";
import { formatDateTime, money, timeAgo } from "@/lib/view";

import { PageHeading } from "./page-shell";

const typeInfo = {
  PRICE_DROP: { label: "Price drop", badge: "success" },
  PRICE_INCREASE: { label: "Price rise", badge: "danger" },
  BELOW_TARGET: { label: "Target reached", badge: "success" },
  BACK_IN_STOCK: { label: "Back in stock", badge: "brand" },
  OUT_OF_STOCK: { label: "Out of stock", badge: "warning" },
} as const satisfies Record<NotificationType, { label: string; badge: string }>;

function message(n: Notification, product: Product | undefined) {
  const at = n.payload.storeName ? ` at ${n.payload.storeName}` : "";
  const price = (value: number | null | undefined) =>
    product ? money(product, value) : String(value ?? "—");
  switch (n.type) {
    case "PRICE_DROP":
    case "PRICE_INCREASE":
      return `${price(n.payload.oldPrice)} → ${price(n.payload.newPrice)}${at}`;
    case "BELOW_TARGET":
      return `Best price is ${price(n.payload.newPrice)}${at}, at or below your target.`;
    case "BACK_IN_STOCK":
      return `Available again${at}${n.payload.newPrice ? ` for ${price(n.payload.newPrice)}` : ""}.`;
    case "OUT_OF_STOCK":
      return `Sold out${at}.`;
  }
}

/** Every alert raised for the user's watches, newest first (plan screen 7). */
export function NotificationsList() {
  const { state } = useTracker();
  const now = useNow();
  const unread = state?.notifications.filter((n) => !n.read).length ?? 0;

  return (
    <>
      <PageHeading
        title="Alerts"
        description="Price and stock changes for the products you watch, from every price check."
        actions={
          state && state.notifications.length > 0 ? (
            <>
              <Button
                variant="secondary"
                disabled={unread === 0}
                onClick={() => dispatch({ type: "markRead" })}
              >
                <Check aria-hidden />
                Mark all as read
              </Button>
              <Button variant="ghost" onClick={() => dispatch({ type: "clearNotifications" })}>
                <Trash2 aria-hidden />
                Clear all
              </Button>
            </>
          ) : null
        }
      />

      {state === null ? (
        <SkeletonBlock className="h-48" aria-busy="true" aria-label="Loading alerts" />
      ) : state.notifications.length === 0 ? (
        <Card className="*:flex *:flex-col *:items-center *:gap-3 *:p-10 *:text-center">
          <Bell aria-hidden className="text-body-subtle size-8" />
          <h2 className="text-heading text-lg font-semibold">No alerts yet</h2>
          <p className="text-body max-w-prose">
            When a price drops, reaches your target or a store sells out, it shows here. Prices are
            checked every 6–12 hours, or now from a product&apos;s page.
          </p>
        </Card>
      ) : (
        <ol className="flex flex-col gap-3">
          {state.notifications.map((n) => {
            const product = state.products.find((p) => p.id === n.productId);
            const info = typeInfo[n.type];
            return (
              <li key={n.id}>
                <Card
                  className={cn(
                    "*:flex *:flex-col *:gap-2 *:p-4 sm:*:flex-row sm:*:items-center",
                    !n.read && "border-brand-subtle",
                  )}
                >
                  <div className="flex shrink-0 items-center gap-2 sm:w-40">
                    {!n.read ? (
                      <span aria-hidden className="bg-fg-brand size-2 rounded-full" />
                    ) : null}
                    <Badge variant={info.badge}>{info.label}</Badge>
                    {!n.read ? <span className="sr-only">Unread</span> : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    {product ? (
                      <Link
                        href={`/product?id=${encodeURIComponent(product.id)}`}
                        onClick={() => dispatch({ type: "markRead", ids: [n.id] })}
                        className={cn(
                          "text-heading break-words hover:underline",
                          !n.read && "font-semibold",
                        )}
                      >
                        {product.title}
                      </Link>
                    ) : (
                      <span className="text-heading">Removed product</span>
                    )}
                    <p className="text-body text-sm">{message(n, product)}</p>
                  </div>
                  <time
                    dateTime={new Date(n.sentAt).toISOString()}
                    title={formatDateTime(n.sentAt)}
                    className="text-body-subtle shrink-0 text-xs"
                  >
                    {timeAgo(n.sentAt, now)}
                  </time>
                </Card>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
