import { CircleCheck, CircleX, Info } from "@stefan-florescu/icons";
import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { H2, H3 } from "@/components/heading";
import { PageHeader } from "@/components/page-header";

const DESCRIPTION =
  "Borders draw the edges of the interface; radius decides how hard those edges feel. Both are small scales on purpose — five widths, four styles, nine radii — because an inconsistent corner is one of the fastest ways to make a system look unowned.";

export const metadata: Metadata = { title: "Border & radius", description: DESCRIPTION };

export default function BorderAndRadiusPage() {
  return (
    <>
      <PageHeader
        title="Border & radius"
        section="Foundation"
        description={DESCRIPTION}
        badges={[
          { label: "Beta", variant: "success" },
          { label: "5 widths · 9 radii", variant: "secondary" },
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
            A border is three independent decisions — width, style and colour. Width and style come
            from this page; colour comes from the{" "}
            <Link href="/foundation/color">semantic colour tokens</Link> (
            <code>--sds-color-border</code> for dividers, <code>--sds-color-input</code> for
            controls). Never write <code>1px&nbsp;solid&nbsp;#e5e7eb</code>.
          </p>
        </div>
      </div>
      <H2 id="border-width">Border width</H2>
      <p>
        Five widths. <code>--sds-border-width-1</code> does almost all the work: every divider, card
        outline and table rule in these docs is 1px. The thicker steps are for emphasis and accents,
        not for structure.
      </p>
      <ol className="spec-list">
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-border-width-0</strong>0
          </span>{" "}
          <span
            className="edge-sample"
            style={{
              borderWidth: "0",
              background: "color-mix(in srgb, var(--sds-color-muted) 45%, transparent)",
            }}
          ></span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-border-width-1</strong>1px
          </span>{" "}
          <span className="edge-sample" style={{ borderWidth: "var(--sds-border-width-1)" }}></span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-border-width-2</strong>2px
          </span>{" "}
          <span className="edge-sample" style={{ borderWidth: "var(--sds-border-width-2)" }}></span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-border-width-4</strong>4px
          </span>{" "}
          <span className="edge-sample" style={{ borderWidth: "var(--sds-border-width-4)" }}></span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-border-width-8</strong>8px
          </span>{" "}
          <span className="edge-sample" style={{ borderWidth: "var(--sds-border-width-8)" }}></span>
        </li>
      </ol>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Value</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--sds-border-width-0</code>
              </td>
              <td className="cell-type">0</td>
              <td className="cell-muted">
                Remove an inherited border. Prefer this to <code>border: none</code>, which also
                drops the style and colour.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-border-width-1</code>
              </td>
              <td className="cell-type">1px</td>
              <td className="cell-muted">
                Everything. Hairlines, card outlines, table rules, input borders.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-border-width-2</code>
              </td>
              <td className="cell-type">2px</td>
              <td className="cell-muted">
                Emphasis: a selected card, an invalid field, the focus ring.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-border-width-4</code>
              </td>
              <td className="cell-type">4px</td>
              <td className="cell-muted">
                Accent bars — the left edge of a callout or a blockquote.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-border-width-8</code>
              </td>
              <td className="cell-type">8px</td>
              <td className="cell-muted">Decorative only. Section dividers and editorial rules.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Widths are in <code>px</code>, not <code>rem</code>. A hairline should stay a hairline when
        the user scales text — a border that grows with the font size gets heavy and muddy, and a
        1px rule is a device-pixel decision rather than a typographic one.
      </p>
      <H2 id="border-style">Border style</H2>
      <p>
        Solid unless the boundary is provisional. Dashed reads as "something goes here"; dotted is
        so light it is often mistaken for a rendering artefact.
      </p>
      <ol className="spec-list">
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.border-solid</strong>solid
          </span>{" "}
          <span
            className="edge-sample border-solid"
            style={{ borderWidth: "var(--sds-border-width-2)" }}
          ></span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.border-dashed</strong>dashed
          </span>{" "}
          <span
            className="edge-sample border-dashed"
            style={{ borderWidth: "var(--sds-border-width-2)" }}
          ></span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.border-dotted</strong>dotted
          </span>{" "}
          <span
            className="edge-sample border-dotted"
            style={{ borderWidth: "var(--sds-border-width-2)" }}
          ></span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.border-none</strong>none
          </span>{" "}
          <span className="edge-sample border-none" style={{ borderWidth: "0" }}></span>
        </li>
      </ol>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Utility</th>
              <th scope="col">border-style</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>.border-solid</code>
              </td>
              <td className="cell-type">solid</td>
              <td className="cell-muted">The default. Every real boundary.</td>
            </tr>
            <tr>
              <td>
                <code>.border-dashed</code>
              </td>
              <td className="cell-type">dashed</td>
              <td className="cell-muted">
                Provisional or empty state: a drop zone, an add-item placeholder.
              </td>
            </tr>
            <tr>
              <td>
                <code>.border-dotted</code>
              </td>
              <td className="cell-type">dotted</td>
              <td className="cell-muted">
                Very light annotation. Easily mistaken for a rendering artefact — reach for it last.
              </td>
            </tr>
            <tr>
              <td>
                <code>.border-none</code>
              </td>
              <td className="cell-type">none</td>
              <td className="cell-muted">
                No border at all. Use <code>--sds-border-width-0</code> instead when you want to
                keep the style and colour for a later state.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <H2 id="border-color">Border colour</H2>
      <p>
        Colour is not defined here — it comes from the semantic layer, and which token you pick is a
        contrast decision, not a taste one.
      </p>
      <div className="edge-colors">
        <div
          className="edge-colors__box"
          style={{ border: "var(--sds-border-width-1) solid var(--sds-color-border)" }}
        >
          <span className="edge-colors__label">--sds-color-border</span> A divider or card outline.
          Decorative, so it sits below 3:1 deliberately.
        </div>
        <div
          className="edge-colors__box"
          style={{ border: "var(--sds-border-width-1) solid var(--sds-color-input)" }}
        >
          <span className="edge-colors__label">--sds-color-input</span> A control boundary. Clears
          3:1 against the surface, as WCAG 1.4.11 requires.
        </div>
        <div
          className="edge-colors__box"
          style={{
            border: "var(--sds-border-width-2) solid var(--sds-color-destructive)",
            background: "var(--sds-color-destructive-subtle)",
            color: "var(--sds-color-destructive-subtle-foreground)",
          }}
        >
          <span className="edge-colors__label">--sds-color-destructive</span> An invalid field.
          Thicker <em>and</em> recoloured, so colour is never the only cue.
        </div>
      </div>
      <H2 id="radius-scale">Radius scale</H2>
      <p>
        Nine steps from square to pill. The tiles below have square bottom corners on purpose — the
        flat edge gives your eye a reference for how much of the corner each step actually cuts.
      </p>
      <ol className="radius-ramp">
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-none)" }}></span>{" "}
          <span className="radius-ramp__name">none</span> <span className="radius-ramp__px">0</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-xs)" }}></span>{" "}
          <span className="radius-ramp__name">xs</span> <span className="radius-ramp__px">2px</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-sm)" }}></span>{" "}
          <span className="radius-ramp__name">sm</span> <span className="radius-ramp__px">4px</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-md)" }}></span>{" "}
          <span className="radius-ramp__name">md</span> <span className="radius-ramp__px">6px</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-lg)" }}></span>{" "}
          <span className="radius-ramp__name">lg</span> <span className="radius-ramp__px">8px</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-xl)" }}></span>{" "}
          <span className="radius-ramp__name">xl</span>{" "}
          <span className="radius-ramp__px">12px</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-2xl)" }}></span>{" "}
          <span className="radius-ramp__name">2xl</span>{" "}
          <span className="radius-ramp__px">16px</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-3xl)" }}></span>{" "}
          <span className="radius-ramp__name">3xl</span>{" "}
          <span className="radius-ramp__px">24px</span>
        </li>
        <li className="radius-ramp__step">
          <span className="radius-ramp__tile" style={{ "--r": "var(--sds-radius-full)" }}></span>{" "}
          <span className="radius-ramp__name">full</span>{" "}
          <span className="radius-ramp__px">pill</span>
        </li>
      </ol>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">rem</th>
              <th scope="col">px</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--sds-radius-none</code>
              </td>
              <td className="cell-type">0</td>
              <td>
                <code>0</code>
              </td>
              <td className="cell-muted">
                Full-bleed edges: a table inside a card, a banner spanning the viewport.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-xs</code>
              </td>
              <td className="cell-type">0.125rem</td>
              <td>
                <code>2px</code>
              </td>
              <td className="cell-muted">
                Tiny targets where a larger radius would eat the corner: a checkbox, a 16px swatch.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-sm</code>
              </td>
              <td className="cell-type">0.25rem</td>
              <td>
                <code>4px</code>
              </td>
              <td className="cell-muted">
                Inner elements: a tab, a menu item, a nested code sample.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-md</code>
              </td>
              <td className="cell-type">0.375rem</td>
              <td>
                <code>6px</code>
              </td>
              <td className="cell-muted">Controls: buttons, inputs, selects, icon buttons.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-lg</code>
              </td>
              <td className="cell-type">0.5rem</td>
              <td>
                <code>8px</code>
              </td>
              <td className="cell-muted">Small containers: a callout, a popover, a toast.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-xl</code>
              </td>
              <td className="cell-type">0.75rem</td>
              <td>
                <code>12px</code>
              </td>
              <td className="cell-muted">
                Cards, code blocks, tables, preview stages. The container default.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-2xl</code>
              </td>
              <td className="cell-type">1rem</td>
              <td>
                <code>16px</code>
              </td>
              <td className="cell-muted">Large surfaces: a dialog, a drawer, a bottom sheet.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-3xl</code>
              </td>
              <td className="cell-type">1.5rem</td>
              <td>
                <code>24px</code>
              </td>
              <td className="cell-muted">Marketing surfaces and hero panels only.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-radius-full</code>
              </td>
              <td className="cell-type">9999px</td>
              <td>
                <code>pill</code>
              </td>
              <td className="cell-muted">
                Pills and circles: badges, avatars, switches, chips. Any value larger than half the
                box gives the same result.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The steps are 0, 2, 4, 6, 8, 12, 16, 24 — not multiples of 4 all the way down. Radius is
        measured from the corner inward, so a 2px difference is clearly visible on a small control
        and invisible on a dialog; the scale is finest exactly where components are smallest. 6px
        for controls is the one value that breaks the 4px grid, and it earns it: 4px reads as square
        at a 36px control height, 8px reads as soft.
      </p>
      <H3 id="choosing-a-radius">Choosing a radius</H3>
      <p>
        Radius should track the size of the surface. Small things get small corners, or the curve
        eats the content.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Element</th>
              <th scope="col">Radius</th>
              <th scope="col">Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Checkbox, small swatch</td>
              <td>
                <code>--sds-radius-xs</code>
              </td>
              <td className="cell-muted">At 16px, anything larger visibly clips the corner.</td>
            </tr>
            <tr>
              <td>Button, input, select</td>
              <td>
                <code>--sds-radius-md</code>
              </td>
              <td className="cell-muted">
                Matches the 36px control height — a soft corner that still reads as a rectangle.
              </td>
            </tr>
            <tr>
              <td>Tab, menu item, nested block</td>
              <td>
                <code>--sds-radius-sm</code>
              </td>
              <td className="cell-muted">
                Sits inside a rounded container, so it takes the smaller step.
              </td>
            </tr>
            <tr>
              <td>Callout, popover, toast</td>
              <td>
                <code>--sds-radius-lg</code>
              </td>
              <td className="cell-muted">Small floating surfaces.</td>
            </tr>
            <tr>
              <td>Card, code block, table</td>
              <td>
                <code>--sds-radius-xl</code>
              </td>
              <td className="cell-muted">The container default across these docs.</td>
            </tr>
            <tr>
              <td>Dialog, drawer, sheet</td>
              <td>
                <code>--sds-radius-2xl</code>
              </td>
              <td className="cell-muted">
                Large surfaces need more radius to read as rounded at all.
              </td>
            </tr>
            <tr>
              <td>Badge, chip, avatar, switch</td>
              <td>
                <code>--sds-radius-full</code>
              </td>
              <td className="cell-muted">Shape carries the meaning: a pill is not a button.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H3 id="nested-radius">Nested radius</H3>
      <p>
        When one rounded box sits inside another, the corners have to be <strong>concentric</strong>{" "}
        or the gap between them visibly changes thickness around the curve. The rule is one
        subtraction:
      </p>
      <blockquote> inner radius = outer radius − the gap between them </blockquote>
      <div className="nest-demo">
        <div className="nest-demo--do">
          <div className="nest-demo__outer">
            <div className="nest-demo__inner" style={{ "--r": "var(--sds-radius-lg)" }}>
              8px inside 16px
            </div>
          </div>
          <p className="nest-demo__caption">
            <CircleCheck aria-hidden size={16} />
            <span>
              <strong>Do</strong> — outer <code>--sds-radius-2xl</code> (16px) minus{" "}
              <code>--sds-space-2</code> padding (8px) gives <code>--sds-radius-lg</code> (8px). The
              curves stay parallel.
            </span>
          </p>
        </div>
        <div className="nest-demo--dont">
          <div className="nest-demo__outer">
            <div className="nest-demo__inner" style={{ "--r": "var(--sds-radius-2xl)" }}>
              16px inside 16px
            </div>
          </div>
          <p className="nest-demo__caption">
            <CircleX aria-hidden size={16} />
            <span>
              <strong>Don't</strong> — the same radius on both. The gap pinches at the corners and
              the inner box looks mis-drawn.
            </span>
          </p>
        </div>
      </div>{" "}
      <CodeBlock
        filename="nesting.css"
        lang="css"
        code={`/* Concentric corners: inner radius = outer radius - the gap between
   them. Here 16px - 8px = 8px, so the curves stay parallel.      */
.sheet {
  padding: var(--sds-space-2);        /*  8px */
  border-radius: var(--sds-radius-2xl);  /* 16px */
}

.sheet > * {
  border-radius: var(--sds-radius-lg);   /*  8px */
}

/* Or let the browser do the subtraction for you: */
.sheet > * {
  border-radius: calc(var(--sds-radius-2xl) - var(--sds-space-2));
}`}
      />{" "}
      <H3 id="pills-and-circles">Pills and circles</H3>
      <p>
        <code>--sds-radius-full</code> is 9999px, not 50%. Any radius larger than half the shorter
        side is clamped by the browser to exactly half, which gives a true pill on a rectangle and a
        circle on a square — with one token and no arithmetic. <code>50%</code> would turn a
        rectangle into an ellipse instead.
      </p>
      <div className="corner-demo">
        <span className="corner-demo__box" style={{ borderRadius: "var(--sds-radius-full)" }}>
          --sds-radius-full
          <br />
          on a rectangle → pill
        </span>
        <span
          className="corner-demo__box"
          style={{ borderRadius: "var(--sds-radius-full)", width: "5rem" }}
        >
          on a square
          <br />→ circle
        </span>
        <span className="corner-demo__box" style={{ borderRadius: "50%" }}>
          50% on a rectangle
          <br />→ ellipse
        </span>
      </div>
      <H2 id="corners">Individual corners</H2>
      <p>
        Round only the corners that are actually free. A sheet anchored to the bottom of the
        viewport rounds its top two corners; a tab rounds the two away from its content.
      </p>
      <div className="corner-demo">
        <span
          className="corner-demo__box"
          style={{
            borderStartStartRadius: "var(--sds-radius-2xl)",
            borderStartEndRadius: "var(--sds-radius-2xl)",
          }}
        >
          bottom sheet
          <br />
          top corners only
        </span>
        <span
          className="corner-demo__box"
          style={{
            borderStartStartRadius: "var(--sds-radius-md)",
            borderEndStartRadius: "var(--sds-radius-md)",
          }}
        >
          segmented control
          <br />
          leading corners only
        </span>
        <span className="corner-demo__box" style={{ borderRadius: "var(--sds-radius-xl)" }}>
          free-standing card
          <br />
          all four
        </span>
      </div>{" "}
      <CodeBlock
        filename="corners.css"
        lang="css"
        code={`/* Physical corners */
.tab {
  border-top-left-radius: var(--sds-radius-md);
  border-top-right-radius: var(--sds-radius-md);
}

/* Logical corners — these follow writing direction, so the same
   rule works unchanged in a right-to-left locale.            */
.tab {
  border-start-start-radius: var(--sds-radius-md);
  border-start-end-radius: var(--sds-radius-md);
}

/* Shorthand order is top-left, top-right, bottom-right, bottom-left */
.sheet--bottom {
  border-radius: var(--sds-radius-2xl) var(--sds-radius-2xl) 0 0;
}`}
      />{" "}
      <p>
        Prefer the logical properties — <code>border-start-start-radius</code> over{" "}
        <code>border-top-left-radius</code>. They follow writing direction, so the same rule
        survives a right-to-left locale without a mirrored stylesheet.
      </p>
      <H2 id="implementation">Implementation</H2>{" "}
      <CodeBlock
        filename="border.css"
        lang="css"
        code={`/* Width, style and colour are three separate decisions. */
.card {
  border: var(--sds-border-width-1) solid var(--sds-color-border);
  border-radius: var(--sds-radius-xl);
}

/* A control boundary needs more contrast than a divider, so it uses
   --sds-color-input rather than --sds-color-border. See the Color page. */
.input {
  border: var(--sds-border-width-1) solid var(--sds-color-input);
  border-radius: var(--sds-radius-md);
}

.input[aria-invalid="true"] {
  /* Thicken as well as recolour: never colour alone. */
  border-width: var(--sds-border-width-2);
  border-color: var(--sds-color-destructive);
}

/* Turning a border off: keep style and colour for the later state. */
.table--flush {
  border-width: var(--sds-border-width-0);
}`}
      />{" "}
      <H2 id="accessibility">Accessibility</H2>
      <ul>
        <li>
          <strong>Non-text contrast</strong> — 1.4.11 requires 3:1 for the boundary of any control
          whose shape is the only thing marking it. That is why <code>--sds-color-input</code> is a
          darker step than <code>--sds-color-border</code>; a decorative divider is exempt.
        </li>
        <li>
          <strong>Forced colours</strong> — Windows High Contrast and{" "}
          <code>forced-colors: active</code> discard <code>box-shadow</code> and most backgrounds,
          but keep borders and recolour them. Anything that must remain a visible boundary has to be
          a <em>border</em>, not a shadow or a background tint.
        </li>
        <li>
          <strong>Never shape alone</strong> — a pill versus a rectangle, or a thicker edge, cannot
          be the only signal for state. Pair it with a label, an icon, or <code>aria-*</code>.
        </li>
        <li>
          <strong>Focus rings</strong> — drawn with <code>outline</code>, not <code>border</code>.
          An outline does not affect layout, and it follows the element's radius automatically in
          current browsers.
        </li>
      </ul>
      <H2 id="related">Related</H2>
      <div className="card-grid">
        <Link className="doc-card" href="/foundation/color">
          <span className="doc-card__title">Color</span>{" "}
          <span className="doc-card__text">
            Where <code>--sds-color-border</code> and <code>--sds-color-input</code> come from.
          </span>
        </Link>{" "}
        <Link className="doc-card" href="/foundation/spacing-and-layout">
          <span className="doc-card__title">Spacing &amp; layout</span>{" "}
          <span className="doc-card__text">The padding values the nesting rule subtracts.</span>
        </Link>{" "}
        <Link className="doc-card" href="/foundation/typography">
          <span className="doc-card__title">Typography</span>{" "}
          <span className="doc-card__text">The other small scale every component reads from.</span>
        </Link>
      </div>
      <H2 id="changelog">Changelog</H2>
      <ul>
        <li>
          <strong>Unreleased</strong> — five border widths and a nine-step radius scale (
          <code>none</code> to <code>full</code>) as <code>@stefan-florescu/tokens</code>.
        </li>
      </ul>
    </>
  );
}
