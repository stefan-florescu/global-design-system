"use client";

import { Bell, ChartPie, Store } from "@stefan-florescu/icons";
import { Button, Card, buttonVariants } from "@stefan-florescu/ui";
import Link from "next/link";

import { startDemo } from "@/lib/session";

import { PageShell } from "./page-shell";

const features = [
  {
    icon: Store,
    title: "Every store, one place",
    text: "Paste a product link. We find the same product in the stores you choose and compare their prices.",
  },
  {
    icon: ChartPie,
    title: "Price history",
    text: "See how prices moved over the last weeks and months, store by store, before you buy.",
  },
  {
    icon: Bell,
    title: "Alerts that matter",
    text: "Hear about price drops, your target price, and stock coming back — without checking every day.",
  },
];

/** The landing page (plan screen 1): what the app does, and the way in. */
export function Landing() {
  return (
    <PageShell>
      <section
        aria-labelledby="landing-heading"
        className="flex flex-col items-start gap-6 py-6 md:py-12"
      >
        <h1 id="landing-heading" className="text-heading max-w-3xl text-4xl font-bold md:text-5xl">
          Know when the price is right.
        </h1>
        <p className="text-body max-w-2xl text-lg">
          Price Tracker watches a product across stores, keeps its price history and tells you when
          it gets cheaper or comes back in stock.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/sign-in?mode=sign-up" className={buttonVariants({ size: "lg" })}>
            Create a free account
          </Link>
          <Link href="/sign-in" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            Sign in
          </Link>
          <Button size="lg" variant="ghost" onClick={startDemo}>
            Try the demo
          </Button>
        </div>
        <p className="text-body-subtle text-sm">
          The demo uses simulated prices and keeps everything in this browser.
        </p>
      </section>
      <ul className="grid gap-4 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <Card className="h-full *:flex *:flex-col *:gap-3 *:p-6">
              <Icon aria-hidden className="text-fg-brand size-6" />
              <h2 className="text-heading text-lg font-semibold">{title}</h2>
              <p className="text-body">{text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
