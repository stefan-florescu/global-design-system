import { Info, TriangleAlert } from "@stefan-florescu/icons";
import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { H2, H3 } from "@/components/heading";
import { PageHeader } from "@/components/page-header";

const DESCRIPTION =
  "One sans family does almost all the work. A text style is never a font size on its own — it is a size, a line height and a tracking value chosen together, which is what the pairing table below encodes.";

export const metadata: Metadata = { title: "Typography", description: DESCRIPTION };

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        title="Typography"
        section="Foundation"
        description={DESCRIPTION}
        badges={[
          { label: "Beta", variant: "success" },
          { label: "13 sizes · 6 weights", variant: "secondary" },
          { label: "4px baseline", variant: "outline" },
        ]}
      />
      <div className="callout callout--info">
        <span className="callout__icon" aria-hidden>
          <Info aria-hidden size={18} />
        </span>
        <div className="callout__body">
          <p className="callout__title">One rule</p>
          <p>
            Set all three: <code>font-size</code>, <code>line-height</code> and{" "}
            <code>letter-spacing</code>. A size on its own inherits whatever leading its container
            had, which is how vertical rhythm drifts.
          </p>
        </div>
      </div>
      <H2 id="families">Font families</H2>
      <p>
        <strong>Inter</strong> is the interface and body face — it was designed for screens, has a
        tall x-height that stays legible at 12px, and ships tabular figures for data.{" "}
        <strong>Georgia</strong> is the editorial counterpart, used only for long-form reading and
        pull quotes. The mono stack is system-provided, for anything the reader might copy.
      </p>
      <div className="specimens">
        <div className="specimen">
          <div className="specimen__head">
            <span className="specimen__token">--sds-font-sans</span>{" "}
            <span className="specimen__name">
              Inter · <code>.font-sans</code>
            </span>{" "}
            <span className="specimen__stack">
              "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica
              Neue", Arial, sans-serif
            </span>
          </div>
          <p className="specimen__alphabet font-sans"> AaBbCcDdEeFfGgHh 0123456789 &amp;@$#?! </p>
          <p className="specimen__pangram font-sans">
            The quick brown fox jumps over the lazy dog — Everything by default: UI, body copy,
            headings, data.
          </p>
        </div>
        <div className="specimen">
          <div className="specimen__head">
            <span className="specimen__token">--sds-font-serif</span>{" "}
            <span className="specimen__name">
              Georgia · <code>.font-serif</code>
            </span>{" "}
            <span className="specimen__stack">
              Georgia, Cambria, "Times New Roman", Times, serif
            </span>
          </div>
          <p className="specimen__alphabet font-serif"> AaBbCcDdEeFfGgHh 0123456789 &amp;@$#?! </p>
          <p className="specimen__pangram font-serif">
            The quick brown fox jumps over the lazy dog — Long-form editorial and pull quotes. Never
            for UI labels.
          </p>
        </div>
        <div className="specimen">
          <div className="specimen__head">
            <span className="specimen__token">--sds-font-mono</span>{" "}
            <span className="specimen__name">
              system mono · <code>.font-mono</code>
            </span>{" "}
            <span className="specimen__stack">
              ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, "Liberation Mono",
              monospace
            </span>
          </div>
          <p className="specimen__alphabet font-mono"> AaBbCcDdEeFfGgHh 0123456789 &amp;@$#?! </p>
          <p className="specimen__pangram font-mono">
            The quick brown fox jumps over the lazy dog — Code, tokens, hex values, anything the
            reader may copy.
          </p>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Family</th>
              <th scope="col">Utility</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--sds-font-sans</code>
              </td>
              <td className="cell-type">Inter</td>
              <td>
                <code>.font-sans</code>
              </td>
              <td className="cell-muted">Everything by default: UI, body copy, headings, data.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-font-serif</code>
              </td>
              <td className="cell-type">Georgia</td>
              <td>
                <code>.font-serif</code>
              </td>
              <td className="cell-muted">
                Long-form editorial and pull quotes. Never for UI labels.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-font-mono</code>
              </td>
              <td className="cell-type">system mono</td>
              <td>
                <code>.font-mono</code>
              </td>
              <td className="cell-muted">
                Code, tokens, hex values, anything the reader may copy.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="callout callout--warning">
        <span className="callout__icon" aria-hidden>
          <TriangleAlert aria-hidden size={18} />
        </span>
        <div className="callout__body">
          <p className="callout__title">Load every weight and style you use</p>
          <p>
            Inter is self-hosted as a variable font with both axes — weight (300–800) and italic —
            so all six weights are real. If a weight is not loaded the browser <em>synthesises</em>{" "}
            it by smearing the regular, and italic by shearing it sideways. Both look wrong, and
            neither shows up in review on a machine that has Inter installed locally.
          </p>
        </div>
      </div>
      <H2 id="type-scale">Type scale</H2>
      <p>
        13 steps from 12px to 128px. The interval widens as the type grows — 2px between the text
        sizes where a small change is legible, then 6, 12 and finally 32px between display sizes.
        Rendered at actual size:
      </p>
      <ol className="type-ramp">
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-xs</span> 12px · 0.75rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-xs)", lineHeight: "var(--sds-leading-4)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-sm</span> 14px · 0.875rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-sm)", lineHeight: "var(--sds-leading-5)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-base</span> 16px · 1rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-base)", lineHeight: "var(--sds-leading-6)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-lg</span> 18px · 1.125rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-lg)", lineHeight: "var(--sds-leading-7)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-xl</span> 20px · 1.25rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-xl)", lineHeight: "var(--sds-leading-7)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-2xl</span> 24px · 1.5rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-2xl)", lineHeight: "var(--sds-leading-8)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-3xl</span> 30px · 1.875rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-3xl)", lineHeight: "var(--sds-leading-9)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-4xl</span> 36px · 2.25rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-4xl)", lineHeight: "var(--sds-leading-10)" }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-5xl</span> 48px · 3rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-5xl)", lineHeight: "var(--sds-leading-none)" }}
          >
            Design systems
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-6xl</span> 60px · 3.75rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-6xl)", lineHeight: "var(--sds-leading-none)" }}
          >
            Design systems
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-7xl</span> 72px · 4.5rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-7xl)", lineHeight: "var(--sds-leading-none)" }}
          >
            Design systems
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-8xl</span> 96px · 6rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-8xl)", lineHeight: "var(--sds-leading-none)" }}
          >
            Design systems
          </span>
        </li>
        <li className="type-ramp__row">
          <span className="type-ramp__meta">
            <span className="type-ramp__token">--sds-text-9xl</span> 128px · 8rem
          </span>{" "}
          <span
            className="type-ramp__sample"
            style={{ fontSize: "var(--sds-text-9xl)", lineHeight: "var(--sds-leading-none)" }}
          >
            Design systems
          </span>
        </li>
      </ol>
      <p>
        <code>--sds-text-sm</code> (14px) is the UI default and <code>--sds-text-base</code> (16px)
        is the body default. 12px is the floor: below it Inter's counters close up and the text
        fails at 200% zoom.
      </p>
      <H3 id="pairing">Size, leading and tracking together</H3>
      <p>
        This table is the part worth memorising. Leading is a fixed px value up to 36px so baselines
        stay on the 4px grid, then switches to the unitless <code>--sds-leading-none</code> for
        display sizes, where a fixed value would clamp. Tracking tightens as size grows, because
        type set large looks loose at its natural spacing.
      </p>
      <div className="table-wrap">
        <table className="pairing-table">
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">rem</th>
              <th scope="col">px</th>
              <th scope="col">Line height</th>
              <th scope="col">Tracking</th>
              <th scope="col">Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--sds-text-xs</code>
              </td>
              <td className="cell-type">0.75rem</td>
              <td>
                <code>12px</code>
              </td>
              <td>
                <code>--sds-leading-4</code>
              </td>
              <td>
                <code>--sds-tracking-wide</code>
              </td>
              <td className="cell-muted">
                Badges, table metadata, helper text. The floor — never smaller.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-sm</code>
              </td>
              <td className="cell-type">0.875rem</td>
              <td>
                <code>14px</code>
              </td>
              <td>
                <code>--sds-leading-5</code>
              </td>
              <td>
                <code>--sds-tracking-normal</code>
              </td>
              <td className="cell-muted">
                UI default: buttons, inputs, table cells, sidebar links.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-base</code>
              </td>
              <td className="cell-type">1rem</td>
              <td>
                <code>16px</code>
              </td>
              <td>
                <code>--sds-leading-6</code>
              </td>
              <td>
                <code>--sds-tracking-normal</code>
              </td>
              <td className="cell-muted">
                Body copy. The browser default, so it survives user zoom best.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-lg</code>
              </td>
              <td className="cell-type">1.125rem</td>
              <td>
                <code>18px</code>
              </td>
              <td>
                <code>--sds-leading-7</code>
              </td>
              <td>
                <code>--sds-tracking-normal</code>
              </td>
              <td className="cell-muted">Lead paragraphs and article body on wide screens.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-xl</code>
              </td>
              <td className="cell-type">1.25rem</td>
              <td>
                <code>20px</code>
              </td>
              <td>
                <code>--sds-leading-7</code>
              </td>
              <td>
                <code>--sds-tracking-normal</code>
              </td>
              <td className="cell-muted">Card titles, section sub-headings (h4).</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-2xl</code>
              </td>
              <td className="cell-type">1.5rem</td>
              <td>
                <code>24px</code>
              </td>
              <td>
                <code>--sds-leading-8</code>
              </td>
              <td>
                <code>--sds-tracking-tight</code>
              </td>
              <td className="cell-muted">Section headings (h2).</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-3xl</code>
              </td>
              <td className="cell-type">1.875rem</td>
              <td>
                <code>30px</code>
              </td>
              <td>
                <code>--sds-leading-9</code>
              </td>
              <td>
                <code>--sds-tracking-tight</code>
              </td>
              <td className="cell-muted">Page headings (h1) in dense layouts.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-4xl</code>
              </td>
              <td className="cell-type">2.25rem</td>
              <td>
                <code>36px</code>
              </td>
              <td>
                <code>--sds-leading-10</code>
              </td>
              <td>
                <code>--sds-tracking-tighter</code>
              </td>
              <td className="cell-muted">Page titles.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-5xl</code>
              </td>
              <td className="cell-type">3rem</td>
              <td>
                <code>48px</code>
              </td>
              <td>
                <code>--sds-leading-none</code>
              </td>
              <td>
                <code>--sds-tracking-tighter</code>
              </td>
              <td className="cell-muted">Hero headline on a marketing page.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-6xl</code>
              </td>
              <td className="cell-type">3.75rem</td>
              <td>
                <code>60px</code>
              </td>
              <td>
                <code>--sds-leading-none</code>
              </td>
              <td>
                <code>--sds-tracking-tighter</code>
              </td>
              <td className="cell-muted">Hero headline from lg up.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-7xl</code>
              </td>
              <td className="cell-type">4.5rem</td>
              <td>
                <code>72px</code>
              </td>
              <td>
                <code>--sds-leading-none</code>
              </td>
              <td>
                <code>--sds-tracking-tighter</code>
              </td>
              <td className="cell-muted">Display headline from xl up.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-8xl</code>
              </td>
              <td className="cell-type">6rem</td>
              <td>
                <code>96px</code>
              </td>
              <td>
                <code>--sds-leading-none</code>
              </td>
              <td>
                <code>--sds-tracking-tighter</code>
              </td>
              <td className="cell-muted">Statement numbers and single-word display.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-text-9xl</code>
              </td>
              <td className="cell-type">8rem</td>
              <td>
                <code>128px</code>
              </td>
              <td>
                <code>--sds-leading-none</code>
              </td>
              <td>
                <code>--sds-tracking-tighter</code>
              </td>
              <td className="cell-muted">Largest step. One or two words, never a sentence.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H2 id="weights">Font weight</H2>
      <p>
        Six weights, but a screen should use two or three. 400 for body, 500 for UI labels, 600 for
        headings covers almost everything; 300 and 800 are display-only.
      </p>
      <ol className="spec-list">
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-font-light</strong>300 · <code>.font-light</code>
          </span>{" "}
          <span className="spec-list__sample" style={{ fontWeight: "var(--sds-font-light)" }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-font-normal</strong>400 · <code>.font-normal</code>
          </span>{" "}
          <span className="spec-list__sample" style={{ fontWeight: "var(--sds-font-normal)" }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-font-medium</strong>500 · <code>.font-medium</code>
          </span>{" "}
          <span className="spec-list__sample" style={{ fontWeight: "var(--sds-font-medium)" }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-font-semibold</strong>600 · <code>.font-semibold</code>
          </span>{" "}
          <span className="spec-list__sample" style={{ fontWeight: "var(--sds-font-semibold)" }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-font-bold</strong>700 · <code>.font-bold</code>
          </span>{" "}
          <span className="spec-list__sample" style={{ fontWeight: "var(--sds-font-bold)" }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-font-extrabold</strong>800 · <code>.font-extrabold</code>
          </span>{" "}
          <span className="spec-list__sample" style={{ fontWeight: "var(--sds-font-extrabold)" }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </li>
      </ol>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Value</th>
              <th scope="col">Utility</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--sds-font-light</code>
              </td>
              <td className="cell-type">300</td>
              <td>
                <code>.font-light</code>
              </td>
              <td className="cell-muted">Large display text only. Too fragile below 24px.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-font-normal</code>
              </td>
              <td className="cell-type">400</td>
              <td>
                <code>.font-normal</code>
              </td>
              <td className="cell-muted">Body copy and everything unemphasised.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-font-medium</code>
              </td>
              <td className="cell-type">500</td>
              <td>
                <code>.font-medium</code>
              </td>
              <td className="cell-muted">UI labels, buttons, table headers, active nav.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-font-semibold</code>
              </td>
              <td className="cell-type">600</td>
              <td>
                <code>.font-semibold</code>
              </td>
              <td className="cell-muted">Headings and the default emphasis in the interface.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-font-bold</code>
              </td>
              <td className="cell-type">700</td>
              <td>
                <code>.font-bold</code>
              </td>
              <td className="cell-muted">Page titles and strong inline emphasis.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-font-extrabold</code>
              </td>
              <td className="cell-type">800</td>
              <td>
                <code>.font-extrabold</code>
              </td>
              <td className="cell-muted">Marketing display only. Never in the product UI.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H2 id="font-style">Font style</H2>
      <p>
        Italic carries emphasis in prose — a title, a term being defined, a voice aside. It is not
        an interface style: italic UI labels read as broken rather than emphasised, and at 12–14px
        the slanted stems lose definition.
      </p>
      <div className="specimens">
        <div className="specimen">
          <div className="specimen__head">
            <span className="specimen__token">.italic</span>{" "}
            <span className="specimen__name">font-style: italic · true italic, not a shear</span>
          </div>
          <p className="specimen__alphabet italic">The quick brown fox — 0123456789</p>
          <p className="specimen__pangram">
            Compare the <em>a</em>, <em>g</em> and <em>f</em>: Inter's italic redraws them rather
            than tilting the roman.
          </p>
        </div>
        <div className="specimen">
          <div className="specimen__head">
            <span className="specimen__token">.not-italic</span>{" "}
            <span className="specimen__name">font-style: normal · resets an inherited italic</span>
          </div>
          <p className="specimen__alphabet not-italic">The quick brown fox — 0123456789</p>
          <p className="specimen__pangram">
            Needed inside blockquotes and <code>&lt;em&gt;</code>, where italic is inherited and a
            nested label must stay upright.
          </p>
        </div>
      </div>
      <H2 id="line-height">Line height</H2>
      <p>
        Every fixed leading value is a multiple of 4px, which is what keeps type on the same grid as{" "}
        <Link href="/foundation/spacing-and-layout">spacing</Link>. Set 16px text at{" "}
        <code>--sds-leading-6</code> (24px) and six lines occupy exactly 144px — a number the
        spacing scale also has.
      </p>
      <p> The three columns below are the same paragraph at three leadings, over 4px rules: </p>
      <div className="leading-demo">
        <div className="leading-demo__col">
          <p className="leading-demo__label">--sds-leading-5 · 20px · too tight</p>
          <p className="leading-demo__text" style={{ lineHeight: "var(--sds-leading-5)" }}>
            Lines this close make the eye jump to the wrong return. Fine for a label, wrong for a
            paragraph.
          </p>
        </div>
        <div className="leading-demo__col">
          <p className="leading-demo__label">--sds-leading-6 · 24px · body default</p>
          <p className="leading-demo__text" style={{ lineHeight: "var(--sds-leading-6)" }}>
            A 1.5 ratio at 16px. Comfortable for sustained reading and lands on every second grid
            line.
          </p>
        </div>
        <div className="leading-demo__col">
          <p className="leading-demo__label">--sds-leading-8 · 32px · too loose</p>
          <p className="leading-demo__text" style={{ lineHeight: "var(--sds-leading-8)" }}>
            Past about 1.7 the lines stop reading as one block and the paragraph falls apart.
          </p>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Value</th>
              <th scope="col">px</th>
              <th scope="col">Pair with</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--sds-leading-none</code>
              </td>
              <td className="cell-type">1</td>
              <td>
                <code>ratio</code>
              </td>
              <td className="cell-muted">
                Display sizes from 48px up, where fixed leading would be too tight.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-3</code>
              </td>
              <td className="cell-type">0.75rem</td>
              <td>
                <code>12px</code>
              </td>
              <td className="cell-muted">Micro-labels at 10–12px, set solid. Nothing else.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-4</code>
              </td>
              <td className="cell-type">1rem</td>
              <td>
                <code>16px</code>
              </td>
              <td className="cell-muted">12px text: badges, dense table metadata.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-5</code>
              </td>
              <td className="cell-type">1.25rem</td>
              <td>
                <code>20px</code>
              </td>
              <td className="cell-muted">14px text — the UI default.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-6</code>
              </td>
              <td className="cell-type">1.5rem</td>
              <td>
                <code>24px</code>
              </td>
              <td className="cell-muted">16px body copy. The workhorse.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-7</code>
              </td>
              <td className="cell-type">1.75rem</td>
              <td>
                <code>28px</code>
              </td>
              <td className="cell-muted">18px and 20px text.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-8</code>
              </td>
              <td className="cell-type">2rem</td>
              <td>
                <code>32px</code>
              </td>
              <td className="cell-muted">24px headings.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-9</code>
              </td>
              <td className="cell-type">2.25rem</td>
              <td>
                <code>36px</code>
              </td>
              <td className="cell-muted">30px headings.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-leading-10</code>
              </td>
              <td className="cell-type">2.5rem</td>
              <td>
                <code>40px</code>
              </td>
              <td className="cell-muted">36px page titles.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H2 id="letter-spacing">Letter spacing</H2>
      <p>
        Six tracking values, in absolute pixels. Negative values tighten display type; positive
        values open up small and uppercase text, where the default spacing looks cramped.
      </p>
      <ol className="spec-list">
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-tracking-tighter</strong>-0.8px
          </span>{" "}
          <span
            className="spec-list__sample"
            style={{ letterSpacing: "var(--sds-tracking-tighter)" }}
          >
            Typography in the interface
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-tracking-tight</strong>-0.4px
          </span>{" "}
          <span
            className="spec-list__sample"
            style={{ letterSpacing: "var(--sds-tracking-tight)" }}
          >
            Typography in the interface
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-tracking-normal</strong>0
          </span>{" "}
          <span
            className="spec-list__sample"
            style={{ letterSpacing: "var(--sds-tracking-normal)" }}
          >
            Typography in the interface
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-tracking-wide</strong>0.4px
          </span>{" "}
          <span className="spec-list__sample" style={{ letterSpacing: "var(--sds-tracking-wide)" }}>
            Typography in the interface
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-tracking-wider</strong>0.8px
          </span>{" "}
          <span
            className="spec-list__sample"
            style={{ letterSpacing: "var(--sds-tracking-wider)" }}
          >
            Typography in the interface
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>--sds-tracking-widest</strong>1.6px
          </span>{" "}
          <span
            className="spec-list__sample"
            style={{ letterSpacing: "var(--sds-tracking-widest)" }}
          >
            Typography in the interface
          </span>
        </li>
      </ol>
      <div className="callout callout--warning">
        <span className="callout__icon" aria-hidden>
          <TriangleAlert aria-hidden size={18} />
        </span>
        <div className="callout__body">
          <p className="callout__title">px tracking does not scale with size</p>
          <p>
            <code>-0.8px</code> is a 0.7% correction on a 128px headline and a 6.7% one on 12px text
            — the same token, a very different effect. That is the trade for absolute values, and
            the reason the pairing table names a tracking per size instead of leaving it to taste.
            If you ever need one value to behave the same everywhere, that value has to be in{" "}
            <code>em</code>.
          </p>
        </div>
      </div>
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
                <code>--sds-tracking-tighter</code>
              </td>
              <td className="cell-type">-0.8px</td>
              <td className="cell-muted">
                36px and up. Large type looks loose at its natural spacing.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-tracking-tight</code>
              </td>
              <td className="cell-type">-0.4px</td>
              <td className="cell-muted">24px to 30px headings.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-tracking-normal</code>
              </td>
              <td className="cell-type">0</td>
              <td className="cell-muted">
                Everything from 14px to 20px. Inter is already well spaced.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-tracking-wide</code>
              </td>
              <td className="cell-type">0.4px</td>
              <td className="cell-muted">12px text, and small-caps labels.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-tracking-wider</code>
              </td>
              <td className="cell-type">0.8px</td>
              <td className="cell-muted">Uppercase labels at 12px.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-tracking-widest</code>
              </td>
              <td className="cell-type">1.6px</td>
              <td className="cell-muted">Uppercase eyebrows and section kickers at 11–12px.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H2 id="text-align">Text align</H2>
      <p>
        Left by default, and left for almost everything. Centre only short blocks; right is for
        numeric columns, so digits line up.
      </p>
      <div className="align-demo">
        <div className="align-demo__box text-left">
          <span className="align-demo__label">.text-left</span> A short block of text, set to show
          how the ragged edge falls.
        </div>
        <div className="align-demo__box text-center">
          <span className="align-demo__label">.text-center</span> A short block of text, set to show
          how the ragged edge falls.
        </div>
        <div className="align-demo__box text-right">
          <span className="align-demo__label">.text-right</span> A short block of text, set to show
          how the ragged edge falls.
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Utility</th>
              <th scope="col">Declaration</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>.text-left</code>
              </td>
              <td className="cell-type">text-align: left</td>
              <td className="cell-muted">Everything. Ragged-right is the easiest edge to read.</td>
            </tr>
            <tr>
              <td>
                <code>.text-center</code>
              </td>
              <td className="cell-type">text-align: center</td>
              <td className="cell-muted">
                Short items only: empty states, a dialog, a hero of 1–2 lines.
              </td>
            </tr>
            <tr>
              <td>
                <code>.text-right</code>
              </td>
              <td className="cell-type">text-align: right</td>
              <td className="cell-muted">Numeric table columns, so digits align on the decimal.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        There is deliberately no <code>justify</code>. Browsers justify without hyphenation, which
        opens rivers of white space and hurts readers with dyslexia. If the product ever ships
        right-to-left, swap these for the logical <code>text-align: start</code> and{" "}
        <code>end</code>.
      </p>
      <H2 id="text-decoration">Text decoration</H2>
      <p>
        Underline means link. Keep it in body copy, where colour alone cannot be the only cue, and
        drop it in navigation and other contexts that already read as interactive.
      </p>
      <ol className="spec-list">
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.underline</strong>text-decoration-line: underline
          </span>{" "}
          <span className="spec-list__sample spec-list__sample--sm underline">
            Read the migration guide
          </span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.overline</strong>text-decoration-line: overline
          </span>{" "}
          <span className="spec-list__sample spec-list__sample--sm overline">Annotated value</span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.line-through</strong>text-decoration-line: line-through
          </span>{" "}
          <span className="spec-list__sample spec-list__sample--sm line-through">$79.00</span>
        </li>
        <li className="spec-list__row">
          <span className="spec-list__meta">
            <strong>.no-underline</strong>text-decoration-line: none
          </span>{" "}
          <span className="spec-list__sample spec-list__sample--sm no-underline">Dashboard</span>
        </li>
      </ol>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Utility</th>
              <th scope="col">text-decoration-line</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>.underline</code>
              </td>
              <td className="cell-type">underline</td>
              <td className="cell-muted">
                Links in body copy. The only reliable non-colour link cue.
              </td>
            </tr>
            <tr>
              <td>
                <code>.overline</code>
              </td>
              <td className="cell-type">overline</td>
              <td className="cell-muted">Rare. Annotation and mathematical notation.</td>
            </tr>
            <tr>
              <td>
                <code>.line-through</code>
              </td>
              <td className="cell-type">line-through</td>
              <td className="cell-muted">Superseded values: an old price, a completed task.</td>
            </tr>
            <tr>
              <td>
                <code>.no-underline</code>
              </td>
              <td className="cell-type">none</td>
              <td className="cell-muted">
                Remove an inherited underline — nav items, buttons styled as links.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Use <code>text-underline-offset</code> and <code>text-decoration-thickness</code> to keep
        the line clear of descenders — these docs set an offset of 3px. And use{" "}
        <code>line-through</code> only where the old value still matters; screen readers do not
        announce it, so never let it carry meaning on its own.
      </p>
      <H2 id="implementation">Implementation</H2>
      <p>
        Text styles belong in CSS classes, not scattered across components. Three declarations,
        every time.
      </p>{" "}
      <CodeBlock
        filename="type.css"
        lang="css"
        code={`/* Load the weights and the italic axis you actually use, or the
   browser fakes light, extrabold and italic by shearing the roman.
   Self-hosted variable font: pnpm add @fontsource-variable/inter */
@import "@fontsource-variable/inter/wght.css";
@import "@fontsource-variable/inter/wght-italic.css";

/* Three declarations per text style: size, leading, tracking. */
.page-title {
  font-family: var(--sds-font-sans);
  font-size: var(--sds-text-4xl);      /* 36px */
  line-height: var(--sds-leading-10);  /* 40px */
  letter-spacing: var(--sds-tracking-tighter);
  font-weight: var(--sds-font-bold);
}

.body {
  font-size: var(--sds-text-base);     /* 16px */
  line-height: var(--sds-leading-6);   /* 24px */
  letter-spacing: var(--sds-tracking-normal);
  font-weight: var(--sds-font-normal);
}

/* Uppercase needs tracking back — the caps are all one height. */
.eyebrow {
  font-size: var(--sds-text-xs);
  line-height: var(--sds-leading-4);
  letter-spacing: var(--sds-tracking-widest);
  font-weight: var(--sds-font-semibold);
  text-transform: uppercase;
}`}
      />{" "}
      <H3 id="utilities">Utilities</H3>
      <p>
        The single-property utilities used throughout this page. They read tokens, so a token change
        moves every usage.
      </p>{" "}
      <CodeBlock
        filename="utilities.css"
        lang="css"
        code={`/* Families, weights and style */
.font-sans  { font-family: var(--sds-font-sans); }
.font-serif { font-family: var(--sds-font-serif); }
.font-mono  { font-family: var(--sds-font-mono); }

.font-light     { font-weight: var(--sds-font-light); }
.font-normal    { font-weight: var(--sds-font-normal); }
.font-medium    { font-weight: var(--sds-font-medium); }
.font-semibold  { font-weight: var(--sds-font-semibold); }
.font-bold      { font-weight: var(--sds-font-bold); }
.font-extrabold { font-weight: var(--sds-font-extrabold); }

.italic     { font-style: italic; }
.not-italic { font-style: normal; }

/* Alignment and decoration */
.text-left   { text-align: left; }
.text-center { text-align: center; }
.text-right  { text-align: right; }

/* decoration-line, not the decoration shorthand: the shorthand also
   resets colour and thickness, which link styles rely on. */
.underline    { text-decoration-line: underline; }
.overline     { text-decoration-line: overline; }
.line-through { text-decoration-line: line-through; }
.no-underline { text-decoration-line: none; }`}
      />{" "}
      <H2 id="accessibility">Accessibility</H2>
      <ul>
        <li>
          <strong>Resize</strong> — 1.4.4 requires text to scale to 200% without loss. Every size is
          in <code>rem</code>, so it does; a size in <code>px</code> would not.
        </li>
        <li>
          <strong>Text spacing</strong> — 1.4.12 requires content to survive line height forced to
          1.5×, paragraph spacing to 2×, and letter spacing to 0.12em. Fixed-height text containers
          are what break this, not the type itself.
        </li>
        <li>
          <strong>Line length</strong> — 1.4.8 (AAA) caps a measure at 80 characters.{" "}
          <code>--content-max</code> (46rem) lands at roughly 75 at 16px.
        </li>
        <li>
          <strong>Links in text</strong> — 1.4.1 forbids colour as the only distinguishing cue,
          which is why body links keep their underline.
        </li>
        <li>
          <strong>Case and italic</strong> — uppercase is read letter-by-letter by some screen
          readers and slows everyone down; keep it to short labels. Italic runs should stay under a
          sentence or two.
        </li>
      </ul>
      <H2 id="related">Related</H2>
      <div className="card-grid">
        <Link className="doc-card" href="/foundation/spacing-and-layout">
          <span className="doc-card__title">Spacing &amp; layout</span>{" "}
          <span className="doc-card__text">The 4px grid that line height snaps to.</span>
        </Link>{" "}
        <Link className="doc-card" href="/foundation/color">
          <span className="doc-card__title">Color</span>{" "}
          <span className="doc-card__text">Text tokens and their contrast guarantees.</span>
        </Link>{" "}
        <Link className="doc-card" href="/foundation/border-and-radius">
          <span className="doc-card__title">Border &amp; radius</span>{" "}
          <span className="doc-card__text">The other small scale every component reads from.</span>
        </Link>
      </div>
      <H2 id="changelog">Changelog</H2>
      <ul>
        <li>
          <strong>Unreleased</strong> — three families, six weights, 13 sizes, nine line heights and
          six tracking values as <code>@stefan-florescu/tokens</code>; Inter is self-hosted with the
          full weight axis.
        </li>
      </ul>
    </>
  );
}
