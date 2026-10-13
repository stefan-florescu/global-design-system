import type { ColumnId, Priority, Task } from "./board";

/*
 * Project plans that can be imported onto the board as tasks. Each task keeps its plan id
 * (`price-tracker:T1.1`), so importing a plan again only adds the tasks that are missing and
 * never undoes changes made on the board.
 */

export type Plan = {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
};

type PlanItem = [code: string, title: string, column: ColumnId, priority: Priority, note: string];

function planTasks(planId: string, project: string, phases: [string, PlanItem[]][]): Task[] {
  return phases.flatMap(([phase, items]) =>
    items.map(([code, title, column, priority, note]) => ({
      id: `${planId}:${code}`,
      title: `${code} ${title}`,
      description: [`${project} · ${phase}`, note].filter(Boolean).join("\n"),
      priority,
      column,
    })),
  );
}

/**
 * The Price Tracker project plan ("Price Tracker Web App — Project Plan", Oct 13, 2026), with
 * each task in the column that matches its state in apps/price-tracker. Priorities follow the
 * milestones: M1 (the discovery spike) and the early decisions first.
 */
export const priceTrackerPlan: Plan = {
  id: "price-tracker",
  name: "Price Tracker",
  description: "The project plan's decisions and tasks T1.1–T7.6, placed by how far each has got.",
  // prettier-ignore
  tasks: planTasks("price-tracker", "Price Tracker", [
    [
      "Key decisions",
      [
        ["D1", "Decide the discovery strategy", "todo", "high", "Shopping search API, web search, affiliate feeds or curated stores — drives cost and accuracy most. The app's PriceSource interface works with any of them."],
        ["D2", "Choose the launch country and its top stores", "in-progress", "high", "The app defaults to Romania with 10 curated stores (eMAG, Altex, Flanco…). Confirm, or name another country."],
        ["D3", "Legal and ToS review", "todo", "high", "Respect robots.txt, rate-limit, prefer official APIs and affiliate feeds, store only the page data needed."],
      ],
    ],
    [
      "Phase 1 — Foundation",
      [
        ["T1.1", "Set up the monorepo (web, worker, db, scrapers) with lint, format and CI", "in-progress", "medium", "Done: apps/price-tracker in this monorepo with lint, format, tests and CI. To do: apps/worker, packages/db, packages/scrapers."],
        ["T1.2", "Provision Postgres and Redis; set up env management", "todo", "medium", "Neon/Supabase + Upstash. Needs accounts and keys."],
        ["T1.3", "Define the data model and run the first migration", "in-progress", "medium", "Done: lib/model.ts mirrors User/Product/Store/Offer/PricePoint/Watch/Notification. To do: the migration (after T1.2)."],
        ["T1.4", "Deploy pipeline (preview and production) and worker deployment", "in-progress", "medium", "Done: the web app deploys with the launcher on Vercel at /price-tracker. To do: the worker host (Railway/Fly/VPS)."],
      ],
    ],
    [
      "Phase 2 — Authentication",
      [
        ["T2.1", "Email/password sign-up with hashed passwords and email verification", "todo", "medium", ""],
        ["T2.2", "Google OAuth, linking to an existing account when the email matches", "todo", "medium", ""],
        ["T2.3", "Forgot/reset password flow", "todo", "medium", ""],
        ["T2.4", "Route protection for all app pages and API routes", "todo", "medium", "Today the watchlist lives in the browser, so there is nothing to protect yet."],
        ["T2.5", "Rate-limit auth endpoints and add basic bot protection", "todo", "medium", ""],
        ["T2.6", "Sign-in and sign-up screens, error states, “check your email” screen", "todo", "medium", ""],
      ],
    ],
    [
      "Phase 3 — Identification & discovery",
      [
        ["T3.1", "Fetch the page: plain HTTP first, then Playwright", "todo", "high", "Needs the worker: browsers can't read other sites' pages (CORS). Until then the demo source reads the product name from the link."],
        ["T3.2", "Parse JSON-LD, then microdata and OpenGraph, then store selectors", "done", "high", "lib/parse-product.ts with a StoreAdapter hook; tested on saved HTML fixtures."],
        ["T3.3", "Infer the country (domain, currency, language) with a manual override", "done", "high", "lib/countries.ts; the confirm screen lets the user change it."],
        ["T3.4", "Normalize the title: brand, model, variant", "done", "high", "lib/normalize.ts: strips marketing words, finds brand, model, storage, colour and size."],
        ["T3.5", "Discovery pipeline: queries, candidates, country filter", "in-progress", "high", "Done: queries (GTIN first, then brand + model) and country filtering in lib/discovery.ts. To do: a real search provider (D1)."],
        ["T3.6", "Matching engine with auto-accept and “possible matches”", "done", "high", "lib/match.ts: GTIN/MPN, fuzzy title + brand + variant, price sanity, accessory filter."],
        ["T3.7", "“Not the same product” and “Add a store link manually”", "done", "medium", "On the product page, with hidden stores that can be restored."],
        ["T3.8", "Scraper framework: JSON-LD extractor plus per-store adapters", "in-progress", "medium", "Done: PriceSource and StoreAdapter interfaces, demo source. To do: real fetching (T3.1)."],
        ["T3.9", "Scheduler: priority, jitter, per-domain limits, retries with backoff", "in-progress", "medium", "Done: lib/schedule.ts, run in the browser while the app is open. To do: BullMQ jobs in the worker."],
        ["T3.10", "Anti-breakage: detect parsing failures and price anomalies", "in-progress", "medium", "Done: a 90% drop or 10× rise marks the offer for review instead of saving it. To do: alert the admin."],
        ["T3.11", "Availability states and currency normalization", "done", "medium", "In stock / pre-order / out of stock / unknown; prices like “1.299,99 lei” parsed."],
      ],
    ],
    [
      "Phase 4 — Notifications",
      [
        ["T4.1", "Change detection: drop, rise, below target, back in stock, out of stock", "done", "low", "lib/changes.ts."],
        ["T4.2", "Match events to each user's watch preferences", "done", "low", ""],
        ["T4.3", "Email templates: single alert and daily digest", "todo", "low", "Resend or Postmark + React Email. Alerts show in the app until then."],
        ["T4.4", "Notification settings, one-click unsubscribe, deduplication", "in-progress", "low", "Done: settings page and the repeat-alert window. To do: unsubscribe links (with T4.3)."],
        ["T4.5", "SPF/DKIM/DMARC on the sending domain", "todo", "low", ""],
      ],
    ],
    [
      "Phase 5 — UX design",
      [
        ["T5.1", "User flows and wireframes for all screens", "done", "medium", "Built straight into working screens with the design system."],
        ["T5.2", "Design system: colours, type, cards, tables, badges, chart styling", "done", "medium", "@stefan-florescu/ui and tokens; chart colours checked for colour blindness."],
        ["T5.3", "High-fidelity mockups for dashboard, add flow and product detail", "done", "medium", "Replaced by the working screens."],
        ["T5.4", "Empty, loading and error states", "done", "low", ""],
        ["T5.5", "Mobile-responsive layouts", "done", "low", ""],
      ],
    ],
    [
      "Phase 6 — Frontend & API",
      [
        ["T6.1", "API routes: products, history, offers, watches", "todo", "medium", "The PriceSource interface is the contract; routes come with the backend."],
        ["T6.2", "Dashboard UI", "done", "medium", "Watchlist with search, filters and sorting."],
        ["T6.3", "Add-product flow with live job status", "done", "medium", "Identify → search stores → confirm match, variant and country."],
        ["T6.4", "Product detail page: chart and sortable table", "done", "medium", "7d/30d/90d/all, best price or each store, low/high/average."],
        ["T6.5", "Alert settings and notification pages", "done", "low", ""],
      ],
    ],
    [
      "Phase 7 — Quality, security, launch",
      [
        ["T7.1", "Tests: parsers and matcher, jobs, E2E", "in-progress", "low", "Done: unit tests for parsers (HTML fixtures), matcher, changes and state. To do: integration and E2E."],
        ["T7.2", "Security: CSRF, zod validation, SSRF protection", "in-progress", "low", "Done: link validation that blocks private and local addresses. To do: CSRF and zod with the API."],
        ["T7.3", "Per-user limits (50 watched products on the free tier)", "done", "low", ""],
        ["T7.4", "Admin panel: failing scrapers, store list, match review", "todo", "low", ""],
        ["T7.5", "GDPR: privacy policy, account deletion, data export", "in-progress", "low", "Done: download my data, delete everything. To do: privacy policy."],
        ["T7.6", "Beta with a small group, then public launch", "todo", "low", ""],
      ],
    ],
  ]),
};

export const plans: Plan[] = [priceTrackerPlan];

/** The plan's tasks that aren't on the board yet. */
export function missingTasks(plan: Plan, tasks: Task[]) {
  const ids = new Set(tasks.map((t) => t.id));
  return plan.tasks.filter((t) => !ids.has(t.id));
}
