import { CircleCheck, CircleX, Info, TriangleAlert } from "@stefan-florescu/icons";
import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { ColorScales, SCALES } from "@/components/foundation/color-scales";
import { TokenTable } from "@/components/foundation/token-table";
import { H2, H3 } from "@/components/heading";
import { PageHeader } from "@/components/page-header";

const DESCRIPTION =
  "Two layers of color. Primitive scales are the raw material — fixed, named by hue and lightness. Semantic tokens are what you actually build with, and they are the only layer that changes between light and dark.";

export const metadata: Metadata = { title: "Color", description: DESCRIPTION };

const PRIMITIVE_COUNT = SCALES.reduce(
  (sum, [, scale]) => sum + Object.keys(scale).filter((key) => !key.startsWith("$")).length,
  0,
);

export default function ColorPage() {
  return (
    <>
      <PageHeader
        title="Color"
        section="Foundation"
        description={DESCRIPTION}
        badges={[
          { label: "Beta", variant: "success" },
          {
            label: `${SCALES.length} scales · ${PRIMITIVE_COUNT} primitives`,
            variant: "secondary",
          },
          { label: "WCAG 2.2 AA", variant: "outline" },
        ]}
      />

      <div className="callout callout--info">
        <span className="callout__icon" aria-hidden>
          <Info aria-hidden size={18} />
        </span>
        <div className="callout__body">
          <p className="callout__title">One rule</p>
          <p>
            Component CSS never names a primitive. If you find yourself writing{" "}
            <code>var(--sds-color-blue-700)</code> in a component, the system is missing a semantic
            token — add it instead.
          </p>
        </div>
      </div>

      <H2 id="color-scales">Color scales</H2>
      <p>
        Tailwind CSS v4&apos;s palette. Every hue runs from <strong>50</strong> (lightest) to{" "}
        <strong>950</strong> (darkest) in eleven steps, written in OKLCH so wide-gamut screens show
        their full range. The hex under each swatch is its sRGB equivalent; click a swatch to copy
        it.
      </p>
      <ColorScales />

      <H2 id="semantic-tokens">Semantic tokens</H2>
      <p>
        Each token answers &quot;what is this color for?&quot;, then points at a primitive per
        theme. Components read the token; switching themes re-points it. Nothing in a component
        stylesheet knows a theme exists.
      </p>
      <div className="token-demo">
        <div
          className="token-demo__item"
          style={{
            background: "var(--sds-color-neutral-secondary-medium)",
            color: "var(--sds-color-body)",
          }}
        >
          Field surface<code>neutral-secondary-medium</code>
        </div>
        <div
          className="token-demo__item"
          style={{
            background: "var(--sds-color-brand)",
            color: "var(--sds-color-brand-foreground)",
          }}
        >
          Brand fill<code>brand</code>
        </div>
        <div
          className="token-demo__item"
          style={{
            background: "var(--sds-color-success-soft)",
            color: "var(--sds-color-fg-success-strong)",
          }}
        >
          Success alert<code>success-soft</code>
        </div>
        <div
          className="token-demo__item"
          style={{
            background: "var(--sds-color-danger)",
            color: "var(--sds-color-danger-foreground)",
          }}
        >
          Danger fill<code>danger</code>
        </div>
      </div>
      <p>
        The table below is the whole contract. Values are the primitive each token resolves to —
        flip the theme in the header and the page you are reading re-renders from exactly these
        rows. Every token is a CSS variable, <code>--sds-color-&#123;name&#125;</code>, and a
        Tailwind utility: <code>bg-&#123;name&#125;</code>, <code>text-&#123;name&#125;</code>,{" "}
        <code>border-&#123;name&#125;</code>.
      </p>
      <TokenTable />

      <div className="callout callout--warning">
        <span className="callout__icon" aria-hidden>
          <TriangleAlert aria-hidden size={18} />
        </span>
        <div className="callout__body">
          <p className="callout__title">Adjusted for contrast</p>
          <p>
            Where a colour would miss WCAG 2.2 AA, the nearest passing token is used:{" "}
            <code>ring</code> (a solid keyboard-focus outline around the soft halo),{" "}
            <code>warning-foreground</code> (dark text on orange rather than white) and{" "}
            <code>success</code>, which stays on emerald-700 in dark mode so white text keeps 4.5:1.
          </p>
        </div>
      </div>

      <H2 id="theming">Implementing a theme</H2>
      <p>
        Three layers, in this order: primitives, semantic tokens, then components. Import the styles
        once at the root of your app — they bring the tokens, both themes and the Tailwind
        utilities.
      </p>
      <CodeBlock
        filename="app/globals.css"
        lang="css"
        code={`@import "tailwindcss";
@import "@stefan-florescu/ui/styles.css"; /* tokens + light/dark themes + utilities */`}
      />

      <H3 id="token-layer">1. Declare the layers</H3>
      <p>
        Primitives live on <code>:root</code> and never change. The semantic layer maps them;{" "}
        <code>[data-theme=&quot;dark&quot;]</code> re-maps the same names. The tokens are authored
        once in <code>@stefan-florescu/tokens</code> and compiled into exactly this CSS.
      </p>
      <CodeBlock
        filename="tokens.css (generated)"
        lang="css"
        code={`/* 1. Primitives — fixed, meaningless on their own */
:root {
  --sds-color-gray-50: oklch(98.5% 0.002 247.839);
  --sds-color-gray-900: oklch(21% 0.034 264.665);
  --sds-color-blue-600: oklch(54.6% 0.245 262.881);
  --sds-color-blue-700: oklch(48.8% 0.243 264.376);
  /* …${PRIMITIVE_COUNT} primitives in total */
}

/* 2. Semantic layer — light theme is the default */
:root,
[data-theme="light"] {
  --sds-color-neutral-primary: var(--sds-color-white);
  --sds-color-heading: var(--sds-color-gray-900);
  --sds-color-neutral-secondary-medium: var(--sds-color-gray-50);
  --sds-color-body: var(--sds-color-gray-600);
  --sds-color-default: var(--sds-color-gray-200);
  --sds-color-brand: var(--sds-color-blue-700);
  --sds-color-brand-strong: var(--sds-color-blue-800);
}

/* 3. Theme override — same names, different primitives */
[data-theme="dark"] {
  --sds-color-neutral-primary: var(--sds-color-gray-950);
  --sds-color-heading: var(--sds-color-white);
  --sds-color-neutral-secondary-medium: var(--sds-color-gray-800);
  --sds-color-body: var(--sds-color-gray-400);
  --sds-color-default: var(--sds-color-gray-800);
  --sds-color-brand: var(--sds-color-blue-600);
  --sds-color-brand-strong: var(--sds-color-blue-700);
}`}
      />

      <H3 id="consume-tokens">2. Build components on tokens only</H3>
      <p>
        Use <code>color-mix()</code> when you need a translucent version of a token — it keeps the
        theme switch working, which a hardcoded <code>rgba()</code> would not. With Tailwind, the
        same tokens are utilities: <code>bg-neutral-primary-soft</code>, <code>text-heading</code>,{" "}
        <code>border-default</code>, <code>ring-ring</code>.
      </p>
      <CodeBlock
        filename="card.css"
        lang="css"
        code={`.card {
  background: var(--sds-color-neutral-primary-soft);
  color: var(--sds-color-heading);
  border: 1px solid var(--sds-color-default);
}

.card:hover {
  /* a token at 50% — still theme-aware */
  background: color-mix(in srgb, var(--sds-color-neutral-tertiary) 50%, transparent);
}

.card:focus-visible {
  outline: 2px solid var(--sds-color-ring);
  outline-offset: 2px;
}`}
      />

      <H3 id="switch-themes">3. Switch the theme</H3>
      <p>
        Setting one attribute on <code>&lt;html&gt;</code> re-points every token — and it works on
        any element, so a single section can be themed on its own. Apply the stored preference
        before the first paint, otherwise the page flashes light before the switch applies.{" "}
        <code>next-themes</code> does both:
      </p>
      <CodeBlock
        filename="app/providers.tsx"
        lang="tsx"
        code={`"use client";

import { ThemeProvider } from "next-themes";

// Writes data-theme="light" | "dark" on <html> before paint and remembers the choice.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}`}
      />

      <H3 id="rebrand">4. Rebrand without touching components</H3>
      <p>
        A new brand color is a change to the semantic layer, not to any component. Swap the hue the
        action tokens point at:
      </p>
      <CodeBlock
        filename="brand.css"
        lang="css"
        code={`/* brand.css — loaded after @stefan-florescu/ui/styles.css */
:root {
  --sds-color-brand: var(--sds-color-purple-700);
  --sds-color-brand-strong: var(--sds-color-purple-800);
  --sds-color-brand-medium: var(--sds-color-purple-200);
  --sds-color-brand-softer: var(--sds-color-purple-50);
  --sds-color-fg-brand: var(--sds-color-purple-700);
  --sds-color-fg-brand-strong: var(--sds-color-purple-900);
  --sds-color-ring: var(--sds-color-purple-700);
}

[data-theme="dark"] {
  --sds-color-brand: var(--sds-color-purple-600);
  --sds-color-brand-strong: var(--sds-color-purple-700);
  --sds-color-brand-medium: var(--sds-color-purple-900);
  --sds-color-brand-softer: var(--sds-color-purple-950);
  --sds-color-fg-brand: var(--sds-color-purple-400);
  --sds-color-ring: var(--sds-color-purple-500);
}`}
      />

      <H2 id="accessibility">Accessibility</H2>
      <p>
        Every text token in the table above clears <strong>4.5:1</strong> against its own surface in
        both themes. <code>--sds-color-ring</code> clears <strong>3:1</strong>, which WCAG 2.2
        requires of focus indicators. <code>--sds-color-default</code> and{" "}
        <code>--sds-color-input</code> (the gray-200 field border) sit below that by choice: a field
        is also marked by its fill and, when focused, by its brand border. These pairings are
        checked on every build of the themes; a token change that breaks one fails the build.
      </p>
      <p>
        Pair a tinted surface with its matching text role, never with a primitive picked by eye:{" "}
        <code>brand-softer</code> with <code>fg-brand-strong</code>, <code>success-soft</code> with{" "}
        <code>fg-success-strong</code>, <code>danger-soft</code> with <code>fg-danger-strong</code>{" "}
        and <code>warning-soft</code> with <code>fg-warning</code>. Filled roles carry their{" "}
        <code>-foreground</code> token: white on <code>brand</code>, <code>success</code>,{" "}
        <code>danger</code> and <code>dark</code>, and dark text on <code>warning</code>.
      </p>
      <div className="guideline-grid">
        <div className="guideline guideline--do">
          <div
            className="guideline__figure"
            style={{
              background: "var(--sds-color-danger-soft)",
              color: "var(--sds-color-fg-danger-strong)",
            }}
          >
            <strong>Payment failed</strong>
          </div>
          <p className="guideline__caption">
            <CircleCheck aria-hidden size={16} />
            <span>
              <strong>Do</strong> — pair a soft background with its matching{" "}
              <code>fg-*-strong</code> text role.
            </span>
          </p>
        </div>
        <div className="guideline guideline--dont">
          <div
            className="guideline__figure"
            style={{
              background: "var(--sds-color-danger-soft)",
              color: "var(--sds-color-red-400)",
            }}
          >
            <strong>Payment failed</strong>
          </div>
          <p className="guideline__caption">
            <CircleX aria-hidden size={16} />
            <span>
              <strong>Don&apos;t</strong> — pick a primitive by eye. This pair is 2.6:1.
            </span>
          </p>
        </div>
      </div>

      <H2 id="related">Related</H2>
      <div className="card-grid">
        <Link className="doc-card" href="/foundation/typography">
          <span className="doc-card__title">Typography</span>
          <span className="doc-card__text">
            Text colour tokens in use, and the contrast they rely on.
          </span>
        </Link>
        <Link className="doc-card" href="/foundation/border-and-radius">
          <span className="doc-card__title">Border &amp; radius</span>
          <span className="doc-card__text">
            Where <code>--sds-color-default</code> and <code>--sds-color-input</code> get used.
          </span>
        </Link>
        <Link className="doc-card" href="/foundation/spacing-and-layout">
          <span className="doc-card__title">Spacing &amp; layout</span>
          <span className="doc-card__text">The 4px grid the colour surfaces sit on.</span>
        </Link>
      </div>

      <H2 id="changelog">Changelog</H2>
      <ul>
        <li>
          <strong>Unreleased</strong> — Tailwind v4&apos;s palette ({SCALES.length} scales) and
          semantic roles for light and dark; WCAG contrast checked on every build.
        </li>
      </ul>
    </>
  );
}
