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
        Every hue runs from <strong>50</strong> (lightest) to <strong>900</strong> (darkest) in ten
        steps. The steps are perceptually spaced so the same number means the same weight across
        hues: <code>600</code> is always a solid fill that carries white text, <code>50</code> is
        always a tint. Click any swatch to copy its hex.
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
            background: "var(--sds-color-muted)",
            color: "var(--sds-color-muted-foreground)",
          }}
        >
          Recessed surface<code>muted</code>
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
            background: "var(--sds-color-success-subtle)",
            color: "var(--sds-color-success-subtle-foreground)",
          }}
        >
          Success banner<code>success-subtle</code>
        </div>
        <div
          className="token-demo__item"
          style={{
            background: "var(--sds-color-destructive)",
            color: "var(--sds-color-destructive-foreground)",
          }}
        >
          Destructive<code>destructive</code>
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
          <p className="callout__title">Status fills keep their step in both themes</p>
          <p>
            <code>--sds-color-success</code>, <code>--sds-color-destructive</code> and{" "}
            <code>--sds-color-info</code> stay on <code>600</code> in dark mode rather than
            lightening. A lighter fill would drop white text below 4.5:1 — and flipping to dark text
            on a red button reads as disabled. Only surfaces, text and the <code>-subtle</code>{" "}
            pairs change between themes.
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
  --sds-color-gray-50: #f9fafb;
  --sds-color-gray-900: #111827;
  --sds-color-blue-600: #1c64f2;
  --sds-color-blue-700: #1a56db;
  /* …${PRIMITIVE_COUNT} primitives in total */
}

/* 2. Semantic layer — light theme is the default */
:root,
[data-theme="light"] {
  --sds-color-background: var(--sds-color-white);
  --sds-color-foreground: var(--sds-color-gray-900);
  --sds-color-muted: var(--sds-color-gray-100);
  --sds-color-muted-foreground: var(--sds-color-gray-600);
  --sds-color-border: var(--sds-color-gray-200);
  --sds-color-brand: var(--sds-color-blue-700);
  --sds-color-ring: var(--sds-color-blue-600);
}

/* 3. Theme override — same names, different primitives */
[data-theme="dark"] {
  --sds-color-background: var(--sds-color-gray-900);
  --sds-color-foreground: var(--sds-color-gray-50);
  --sds-color-muted: var(--sds-color-gray-800);
  --sds-color-muted-foreground: var(--sds-color-gray-400);
  --sds-color-border: var(--sds-color-gray-700);
  --sds-color-brand: var(--sds-color-blue-600);
  --sds-color-ring: var(--sds-color-blue-500);
}`}
      />

      <H3 id="consume-tokens">2. Build components on tokens only</H3>
      <p>
        Use <code>color-mix()</code> when you need a translucent version of a token — it keeps the
        theme switch working, which a hardcoded <code>rgba()</code> would not. With Tailwind, the
        same tokens are utilities: <code>bg-card</code>, <code>text-card-foreground</code>,{" "}
        <code>border-border</code>, <code>ring-ring</code>.
      </p>
      <CodeBlock
        filename="card.css"
        lang="css"
        code={`.card {
  background: var(--sds-color-card);
  color: var(--sds-color-card-foreground);
  border: 1px solid var(--sds-color-border);
}

.card:hover {
  /* a token at 50% — still theme-aware */
  background: color-mix(in srgb, var(--sds-color-accent) 50%, transparent);
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
  --sds-color-brand-subtle: var(--sds-color-purple-50);
  --sds-color-brand-subtle-foreground: var(--sds-color-purple-700);
  --sds-color-ring: var(--sds-color-purple-600);

  /* make primary carry the brand instead of neutral */
  --sds-color-primary: var(--sds-color-brand);
  --sds-color-primary-foreground: var(--sds-color-brand-foreground);
}

[data-theme="dark"] {
  --sds-color-brand: var(--sds-color-purple-600);
  --sds-color-brand-subtle: var(--sds-color-purple-900);
  --sds-color-brand-subtle-foreground: var(--sds-color-purple-300);
}`}
      />

      <H2 id="accessibility">Accessibility</H2>
      <p>
        Every text token in the table above clears <strong>4.5:1</strong> against its own surface in
        both themes. <code>--sds-color-input</code> and <code>--sds-color-ring</code> clear{" "}
        <strong>3:1</strong>, which WCAG 2.2 requires of control boundaries and focus indicators.{" "}
        <code>--sds-color-border</code> sits below that deliberately — it draws decorative hairlines
        and is never the only cue for a control. These pairings are checked on every build of the
        themes; a token change that breaks one fails the build.
      </p>
      <p>Three rules hold across all eight scales:</p>
      <ul>
        <li>
          Steps <strong>50</strong> and <strong>100</strong> take <code>&#123;hue&#125;-700</code>{" "}
          or darker as text.
        </li>
        <li>
          Steps <strong>200</strong> and <strong>300</strong> need <code>&#123;hue&#125;-800</code>{" "}
          or darker — <code>700</code> is not enough on red, blue or pink.
        </li>
        <li>
          Steps <strong>600</strong> to <strong>900</strong> take white text, in every hue.
        </li>
      </ul>
      <p>
        Steps <strong>400</strong> and <strong>500</strong> are the awkward middle: neither white
        nor dark text is reliably legible on them. Use them for fills, icons, borders and chart
        series — not as a background for body copy. That is also why{" "}
        <code>--sds-color-warning</code> stops at <code>yellow-400</code> and carries{" "}
        <code>gray-900</code>.
      </p>
      <div className="guideline-grid">
        <div className="guideline guideline--do">
          <div
            className="guideline__figure"
            style={{
              background: "var(--sds-color-destructive-subtle)",
              color: "var(--sds-color-destructive-subtle-foreground)",
            }}
          >
            <strong>Payment failed</strong>
          </div>
          <p className="guideline__caption">
            <CircleCheck aria-hidden size={16} />
            <span>
              <strong>Do</strong> — pair a subtle background with its matching{" "}
              <code>-subtle-foreground</code> token.
            </span>
          </p>
        </div>
        <div className="guideline guideline--dont">
          <div
            className="guideline__figure"
            style={{
              background: "var(--sds-color-destructive-subtle)",
              color: "var(--sds-color-red-400)",
            }}
          >
            <strong>Payment failed</strong>
          </div>
          <p className="guideline__caption">
            <CircleX aria-hidden size={16} />
            <span>
              <strong>Don&apos;t</strong> — pick a primitive by eye. This pair is 1.9:1.
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
            Where <code>--sds-color-border</code> and <code>--sds-color-input</code> get used.
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
          <strong>Unreleased</strong> — {SCALES.length} primitive scales, semantic layer for light
          and dark, <code>-subtle</code> status pairs and <code>--sds-color-overlay</code>; WCAG
          contrast checked on every build.
        </li>
      </ul>
    </>
  );
}
