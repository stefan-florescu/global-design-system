import { CircleCheck, CircleX, Info, TriangleAlert } from "@stefan-florescu/icons";
import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { H2, H3 } from "@/components/heading";
import { PageHeader } from "@/components/page-header";

const DESCRIPTION =
  "One 4px grid underneath everything. The spacing scale sets the distance between any two elements; the layout grid, breakpoints and containers decide where those elements sit on the page, and layers decide what sits on top.";

export const metadata: Metadata = { title: "Spacing & layout", description: DESCRIPTION };

export default function SpacingAndLayoutPage() {
  return (
    <>
      <PageHeader
        title="Spacing & layout"
        section="Foundation"
        description={DESCRIPTION}
        badges={[
          { label: "Beta", variant: "success" },
          { label: "4px base · 36 steps", variant: "secondary" },
          { label: "12 columns", variant: "outline" },
        ]}
      />
      <div className="callout callout--info">
        <span className="callout__icon" aria-hidden>
          <Info aria-hidden size={18} />
        </span>
        <div className="callout__body">
          <p className="callout__title">One rule</p>
          <p>
            No raw lengths in component CSS. Every padding, gap and margin is a{" "}
            <code>--space-*</code> token; every column, gutter and max-width is a layout token. A
            value that is not on the scale is a decision nobody can repeat.
          </p>
        </div>
      </div>
      <H2 id="the-4px-grid">The 4px base unit</H2>
      <p>
        <strong>4px</strong> is the base unit, and the number in a token name is the multiple of it:{" "}
        <code>--sds-space-6</code> is 6&nbsp;×&nbsp;4&nbsp;=&nbsp;24px. Four is small enough to
        describe dense controls and, because 16px is the browser's default font size, every multiple
        is also a clean fraction of a rem.
      </p>
      <p>
        The payoff is that independent components line up without anyone coordinating: if a button's
        padding and a card's padding are both multiples of 4, their edges agree. Anything the layout
        leans on — control heights, padding, gaps, gutters — stays on the unit.
      </p>
      <div className="guideline-grid">
        <div className="guideline guideline--do">
          <div className="guideline__figure grid-canvas">
            <button className="btn btn--primary" type="button">
              {" "}
              Save changes{" "}
            </button>
          </div>
          <p className="guideline__caption">
            <CircleCheck aria-hidden size={16} />
            <span>
              <strong>Do</strong> — 36px tall, 16px side padding. Every edge lands on a grid line.
            </span>
          </p>
        </div>
        <div className="guideline guideline--dont">
          <div className="guideline__figure grid-canvas">
            <button className="btn btn--primary btn--offgrid" type="button">
              {" "}
              Save changes{" "}
            </button>
          </div>
          <p className="guideline__caption">
            <CircleX aria-hidden size={16} />
            <span>
              <strong>Don't</strong> — 34px tall, 15px padding. Off the grid, and nothing else will
              align to it.
            </span>
          </p>
        </div>
      </div>
      <H2 id="spacing-scale">Spacing scale</H2>
      <p>
        36 steps from 0 to 384px. The <em>step size</em> grows with the value, because a 4px
        difference is obvious on a chip and invisible on a hero — precision is spent where it shows:
      </p>
      <ul>
        <li>
          <strong>2px steps</strong> from 4 to 20px — controls.
        </li>
        <li>
          <strong>4px steps</strong> from 24 to 48px — components.
        </li>
        <li>
          <strong>8px steps</strong> at 56 and 64px — layout.
        </li>
        <li>
          <strong>16px steps</strong> from 80 to 256px — sections.
        </li>
        <li>
          <strong>32px then 64px</strong> at 288, 320 and 384px.
        </li>
      </ul>
      <p>
        The bars below are drawn at their real width, so the ramp is the scale rather than a picture
        of it.
      </p>
      <ol className="ramp">
        <li className="ramp__group">Sub-grid · 1–2px · hairlines and optical corrections</li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-0</span>{" "}
          <span className="ramp__bar" style={{ width: "0px" }}></span>{" "}
          <span className="ramp__px">0</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-px</span>{" "}
          <span className="ramp__bar" style={{ width: "1px" }}></span>{" "}
          <span className="ramp__px">1px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-0-5</span>{" "}
          <span className="ramp__bar" style={{ width: "2px" }}></span>{" "}
          <span className="ramp__px">2px</span>
        </li>
        <li className="ramp__group">Dense · 2px steps · controls and tight layouts</li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-1</span>{" "}
          <span className="ramp__bar" style={{ width: "4px" }}></span>{" "}
          <span className="ramp__px">4px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-1-5</span>{" "}
          <span className="ramp__bar" style={{ width: "6px" }}></span>{" "}
          <span className="ramp__px">6px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-2</span>{" "}
          <span className="ramp__bar" style={{ width: "8px" }}></span>{" "}
          <span className="ramp__px">8px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-2-5</span>{" "}
          <span className="ramp__bar" style={{ width: "10px" }}></span>{" "}
          <span className="ramp__px">10px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-3</span>{" "}
          <span className="ramp__bar" style={{ width: "12px" }}></span>{" "}
          <span className="ramp__px">12px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-3-5</span>{" "}
          <span className="ramp__bar" style={{ width: "14px" }}></span>{" "}
          <span className="ramp__px">14px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-4</span>{" "}
          <span className="ramp__bar" style={{ width: "16px" }}></span>{" "}
          <span className="ramp__px">16px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-4-5</span>{" "}
          <span className="ramp__bar" style={{ width: "18px" }}></span>{" "}
          <span className="ramp__px">18px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-5</span>{" "}
          <span className="ramp__bar" style={{ width: "20px" }}></span>{" "}
          <span className="ramp__px">20px</span>
        </li>
        <li className="ramp__group">Component · 4px steps · the everyday range</li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-6</span>{" "}
          <span className="ramp__bar" style={{ width: "24px" }}></span>{" "}
          <span className="ramp__px">24px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-7</span>{" "}
          <span className="ramp__bar" style={{ width: "28px" }}></span>{" "}
          <span className="ramp__px">28px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-8</span>{" "}
          <span className="ramp__bar" style={{ width: "32px" }}></span>{" "}
          <span className="ramp__px">32px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-9</span>{" "}
          <span className="ramp__bar" style={{ width: "36px" }}></span>{" "}
          <span className="ramp__px">36px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-10</span>{" "}
          <span className="ramp__bar" style={{ width: "40px" }}></span>{" "}
          <span className="ramp__px">40px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-11</span>{" "}
          <span className="ramp__bar" style={{ width: "44px" }}></span>{" "}
          <span className="ramp__px">44px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-12</span>{" "}
          <span className="ramp__bar" style={{ width: "48px" }}></span>{" "}
          <span className="ramp__px">48px</span>
        </li>
        <li className="ramp__group">Layout · 8px steps</li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-14</span>{" "}
          <span className="ramp__bar" style={{ width: "56px" }}></span>{" "}
          <span className="ramp__px">56px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-16</span>{" "}
          <span className="ramp__bar" style={{ width: "64px" }}></span>{" "}
          <span className="ramp__px">64px</span>
        </li>
        <li className="ramp__group">Section · 16px steps</li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-20</span>{" "}
          <span className="ramp__bar" style={{ width: "80px" }}></span>{" "}
          <span className="ramp__px">80px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-24</span>{" "}
          <span className="ramp__bar" style={{ width: "96px" }}></span>{" "}
          <span className="ramp__px">96px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-28</span>{" "}
          <span className="ramp__bar" style={{ width: "112px" }}></span>{" "}
          <span className="ramp__px">112px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-32</span>{" "}
          <span className="ramp__bar" style={{ width: "128px" }}></span>{" "}
          <span className="ramp__px">128px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-36</span>{" "}
          <span className="ramp__bar" style={{ width: "144px" }}></span>{" "}
          <span className="ramp__px">144px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-40</span>{" "}
          <span className="ramp__bar" style={{ width: "160px" }}></span>{" "}
          <span className="ramp__px">160px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-44</span>{" "}
          <span className="ramp__bar" style={{ width: "176px" }}></span>{" "}
          <span className="ramp__px">176px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-48</span>{" "}
          <span className="ramp__bar" style={{ width: "192px" }}></span>{" "}
          <span className="ramp__px">192px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-52</span>{" "}
          <span className="ramp__bar" style={{ width: "208px" }}></span>{" "}
          <span className="ramp__px">208px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-56</span>{" "}
          <span className="ramp__bar" style={{ width: "224px" }}></span>{" "}
          <span className="ramp__px">224px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-60</span>{" "}
          <span className="ramp__bar" style={{ width: "240px" }}></span>{" "}
          <span className="ramp__px">240px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-64</span>{" "}
          <span className="ramp__bar" style={{ width: "256px" }}></span>{" "}
          <span className="ramp__px">256px</span>
        </li>
        <li className="ramp__group">Page · 32px then 64px steps</li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-72</span>{" "}
          <span className="ramp__bar" style={{ width: "288px" }}></span>{" "}
          <span className="ramp__px">288px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-80</span>{" "}
          <span className="ramp__bar" style={{ width: "320px" }}></span>{" "}
          <span className="ramp__px">320px</span>
        </li>
        <li className="ramp__row">
          <span className="ramp__name">--sds-space-96</span>{" "}
          <span className="ramp__bar" style={{ width: "384px" }}></span>{" "}
          <span className="ramp__px">384px</span>
        </li>
      </ol>
      <H3 id="choosing-a-step">Choosing a step</H3>
      <p> Two of the six bands need a rule, because they are the ones people misuse: </p>
      <ul>
        <li>
          <strong>Half-steps</strong> (<code>--sds-space-1-5</code>, <code>-2-5</code>,{" "}
          <code>-3-5</code>, <code>-4-5</code> — 6, 10, 14, 18px) exist because at control scale a
          4px jump is a visible redesign. They are off the base unit, so reach for the whole step
          first and use a half-step only when it is demonstrably wrong.
        </li>
        <li>
          <strong>Sub-grid</strong> (<code>--sds-space-px</code> and <code>--sds-space-0-5</code> —
          1 and 2px) is for optical corrections only: a focus ring offset, a border compensation, an
          icon sitting a hair too low. Never for layout.
        </li>
      </ul>
      <p>
        At the other end, spacing itself rarely needs more than <code>--sds-space-32</code> (128px).
        The steps above it are in the scale mostly so that <em>fixed sizes</em> — drawer widths,
        media boxes, illustration frames — come from the same source as everything else instead of
        being invented per component.
      </p>
      <div className="table-wrap">
        <table className="token-table">
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">rem</th>
              <th scope="col">px</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr className="row-group">
              <th colSpan={4} scope="colgroup">
                Sub-grid · 1–2px · hairlines and optical corrections
              </th>
            </tr>
            <tr>
              <td>
                <code>--sds-space-0</code>
              </td>
              <td className="cell-type">0</td>
              <td>
                <code>0</code>
              </td>
              <td className="cell-muted">Remove an inherited gap or padding.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-px</code>
              </td>
              <td className="cell-type">0.0625rem</td>
              <td>
                <code>1px</code>
              </td>
              <td className="cell-muted">
                Hairline offsets — a 1px nudge, a border compensation. Not for layout.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-0-5</code>
              </td>
              <td className="cell-type">0.125rem</td>
              <td>
                <code>2px</code>
              </td>
              <td className="cell-muted">
                Optical corrections: focus ring offset, an icon sitting a hair low.
              </td>
            </tr>
            <tr className="row-group">
              <th colSpan={4} scope="colgroup">
                Dense · 2px steps · controls and tight layouts
              </th>
            </tr>
            <tr>
              <td>
                <code>--sds-space-1</code>
              </td>
              <td className="cell-type">0.25rem</td>
              <td>
                <code>4px</code>
              </td>
              <td className="cell-muted">Icon-to-label gap in a dense control; badge padding.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-1-5</code>
              </td>
              <td className="cell-type">0.375rem</td>
              <td>
                <code>6px</code>
              </td>
              <td className="cell-muted">Half-step. Chip padding when 8px is too loose.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-2</code>
              </td>
              <td className="cell-type">0.5rem</td>
              <td>
                <code>8px</code>
              </td>
              <td className="cell-muted">Icon-to-label gap; gap inside a button group.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-2-5</code>
              </td>
              <td className="cell-type">0.625rem</td>
              <td>
                <code>10px</code>
              </td>
              <td className="cell-muted">Half-step. Vertical padding of a small input.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-3</code>
              </td>
              <td className="cell-type">0.75rem</td>
              <td>
                <code>12px</code>
              </td>
              <td className="cell-muted">Side padding of a small control; table cell padding.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-3-5</code>
              </td>
              <td className="cell-type">0.875rem</td>
              <td>
                <code>14px</code>
              </td>
              <td className="cell-muted">
                Half-step. Side padding when 12 is tight and 16 is wide.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-4</code>
              </td>
              <td className="cell-type">1rem</td>
              <td>
                <code>16px</code>
              </td>
              <td className="cell-muted">
                The default. Gap between form fields; card padding on mobile; page margin at base.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-4-5</code>
              </td>
              <td className="cell-type">1.125rem</td>
              <td>
                <code>18px</code>
              </td>
              <td className="cell-muted">Half-step. Rarely needed — prefer 16 or 20.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-5</code>
              </td>
              <td className="cell-type">1.25rem</td>
              <td>
                <code>20px</code>
              </td>
              <td className="cell-muted">Padding of a medium control; gap in a dense card list.</td>
            </tr>
            <tr className="row-group">
              <th colSpan={4} scope="colgroup">
                Component · 4px steps · the everyday range
              </th>
            </tr>
            <tr>
              <td>
                <code>--sds-space-6</code>
              </td>
              <td className="cell-type">1.5rem</td>
              <td>
                <code>24px</code>
              </td>
              <td className="cell-muted">
                Card padding; gap between cards; gutter and page margin from md up.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-7</code>
              </td>
              <td className="cell-type">1.75rem</td>
              <td>
                <code>28px</code>
              </td>
              <td className="cell-muted">Gap between a heading and the block it introduces.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-8</code>
              </td>
              <td className="cell-type">2rem</td>
              <td>
                <code>32px</code>
              </td>
              <td className="cell-muted">Gap between groups inside a panel; gutter at xl.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-9</code>
              </td>
              <td className="cell-type">2.25rem</td>
              <td>
                <code>36px</code>
              </td>
              <td className="cell-muted">Padding of a large card or a modal body.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-10</code>
              </td>
              <td className="cell-type">2.5rem</td>
              <td>
                <code>40px</code>
              </td>
              <td className="cell-muted">Space above a sub-heading in long-form content.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-11</code>
              </td>
              <td className="cell-type">2.75rem</td>
              <td>
                <code>44px</code>
              </td>
              <td className="cell-muted">
                Also the AAA touch target (2.5.5) — usable as a control height.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-12</code>
              </td>
              <td className="cell-type">3rem</td>
              <td>
                <code>48px</code>
              </td>
              <td className="cell-muted">Gap between the major sections of a page.</td>
            </tr>
            <tr className="row-group">
              <th colSpan={4} scope="colgroup">
                Layout · 8px steps
              </th>
            </tr>
            <tr>
              <td>
                <code>--sds-space-14</code>
              </td>
              <td className="cell-type">3.5rem</td>
              <td>
                <code>56px</code>
              </td>
              <td className="cell-muted">
                Header and toolbar heights; space before a section heading.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-16</code>
              </td>
              <td className="cell-type">4rem</td>
              <td>
                <code>64px</code>
              </td>
              <td className="cell-muted">Section rhythm on marketing and landing pages.</td>
            </tr>
            <tr className="row-group">
              <th colSpan={4} scope="colgroup">
                Section · 16px steps
              </th>
            </tr>
            <tr>
              <td>
                <code>--sds-space-20</code>
              </td>
              <td className="cell-type">5rem</td>
              <td>
                <code>80px</code>
              </td>
              <td className="cell-muted">Top and bottom padding of a page's content area.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-24</code>
              </td>
              <td className="cell-type">6rem</td>
              <td>
                <code>96px</code>
              </td>
              <td className="cell-muted">Hero padding from lg up.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-28</code>
              </td>
              <td className="cell-type">7rem</td>
              <td>
                <code>112px</code>
              </td>
              <td className="cell-muted">Section padding on a landing page.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-32</code>
              </td>
              <td className="cell-type">8rem</td>
              <td>
                <code>128px</code>
              </td>
              <td className="cell-muted">
                Full-bleed section padding. The largest step spacing normally needs.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-36</code>
              </td>
              <td className="cell-type">9rem</td>
              <td>
                <code>144px</code>
              </td>
              <td className="cell-muted">Generous section padding at xl.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-40</code>
              </td>
              <td className="cell-type">10rem</td>
              <td>
                <code>160px</code>
              </td>
              <td className="cell-muted">Large hero from xl up.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-44</code>
              </td>
              <td className="cell-type">11rem</td>
              <td>
                <code>176px</code>
              </td>
              <td className="cell-muted">Fixed sizing: a narrow sidebar or media box.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-48</code>
              </td>
              <td className="cell-type">12rem</td>
              <td>
                <code>192px</code>
              </td>
              <td className="cell-muted">Fixed sizing: drawer width at md.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-52</code>
              </td>
              <td className="cell-type">13rem</td>
              <td>
                <code>208px</code>
              </td>
              <td className="cell-muted">Fixed sizing: illustration and empty-state art.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-56</code>
              </td>
              <td className="cell-type">14rem</td>
              <td>
                <code>224px</code>
              </td>
              <td className="cell-muted">Fixed sizing: card media height.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-60</code>
              </td>
              <td className="cell-type">15rem</td>
              <td>
                <code>240px</code>
              </td>
              <td className="cell-muted">Fixed sizing: a wide sidebar.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-64</code>
              </td>
              <td className="cell-type">16rem</td>
              <td>
                <code>256px</code>
              </td>
              <td className="cell-muted">Fixed sizing: panel and popover widths.</td>
            </tr>
            <tr className="row-group">
              <th colSpan={4} scope="colgroup">
                Page · 32px then 64px steps
              </th>
            </tr>
            <tr>
              <td>
                <code>--sds-space-72</code>
              </td>
              <td className="cell-type">18rem</td>
              <td>
                <code>288px</code>
              </td>
              <td className="cell-muted">Fixed sizing: dialog width.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-80</code>
              </td>
              <td className="cell-type">20rem</td>
              <td>
                <code>320px</code>
              </td>
              <td className="cell-muted">Fixed sizing: drawer width at lg.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-space-96</code>
              </td>
              <td className="cell-type">24rem</td>
              <td>
                <code>384px</code>
              </td>
              <td className="cell-muted">Largest step. Fixed sizing: wide drawer or split pane.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H3 id="padding-gap-margin">Padding, gap and margin</H3>
      <p>
        Same scale, three jobs. In the diagram below the tint <em>is</em> the spacing: the band
        around the rows is the container's padding, the bands between them are its gap.
      </p>
      <div className="box-demo">
        <div className="box-demo__inner">
          <div className="box-demo__item">Project name</div>
          <div className="box-demo__item">Visibility</div>
          <div className="box-demo__item">Default branch</div>
        </div>
      </div>
      <p className="demo-caption">
        Outer tint: <code>padding: var(--sds-space-6)</code> · between rows:{" "}
        <code>gap: var(--sds-space-4)</code> · inside a row:{" "}
        <code>padding: var(--sds-space-3) var(--sds-space-4)</code>
      </p>
      <p>
        Prefer <code>gap</code> on the parent over margins on children. One element owns the space,
        so it cannot collapse, double up, or leave a stray margin on the last child.
      </p>{" "}
      <CodeBlock
        filename="card.css"
        lang="css"
        code={`/* Padding, gap and margin all come from the same scale. */
.card {
  padding: var(--sds-space-6);          /* 24px */
  border-radius: var(--sds-radius-xl);
}

.card__body {
  /* Prefer gap over margins on children: one owner for the space. */
  display: grid;
  gap: var(--sds-space-4);              /* 16px */
}

.card__actions {
  display: flex;
  gap: var(--sds-space-2);              /* 8px */
  margin-top: var(--sds-space-6);
}

/* Never a raw value. This breaks the grid and cannot be re-themed: */
/*   padding: 15px;  gap: 0.9rem;  margin-top: 30px;               */`}
      />{" "}
      <H2 id="layout-grid">Layout grid</H2>
      <p>
        A responsive column grid: <strong>4</strong> columns on phones, <strong>8</strong> on
        tablets, <strong>12</strong> from laptops up. Columns are fluid, gutters are fixed — the
        columns absorb the extra width, the rhythm between them does not change.
      </p>
      <p>
        The demo below reads the live tokens. Resize the window and the column count, gutter and
        margin change with it.
      </p>
      <div className="grid-demo">
        <div className="layout-grid">
          <div className="grid-demo__col">1</div>
          <div className="grid-demo__col">2</div>
          <div className="grid-demo__col">3</div>
          <div className="grid-demo__col">4</div>
          <div className="grid-demo__col">5</div>
          <div className="grid-demo__col">6</div>
          <div className="grid-demo__col">7</div>
          <div className="grid-demo__col">8</div>
          <div className="grid-demo__col">9</div>
          <div className="grid-demo__col">10</div>
          <div className="grid-demo__col">11</div>
          <div className="grid-demo__col">12</div>
        </div>
        <div className="grid-demo__meta">
          <span>
            <span className="bp-only" data-bp="base">
              base · 4 columns
            </span>{" "}
            <span className="bp-only" data-bp="md">
              md · 8 columns
            </span>{" "}
            <span className="bp-only" data-bp="lg">
              lg · 12 columns
            </span>{" "}
            <span className="bp-only" data-bp="xl">
              xl · 12 columns
            </span>
          </span>{" "}
          <span>
            gutter{" "}
            <span className="bp-only" data-bp="base">
              16px
            </span>{" "}
            <span className="bp-only" data-bp="md">
              24px
            </span>{" "}
            <span className="bp-only" data-bp="lg">
              24px
            </span>{" "}
            <span className="bp-only" data-bp="xl">
              32px
            </span>
          </span>{" "}
          <span>
            margin{" "}
            <span className="bp-only" data-bp="base">
              16px
            </span>{" "}
            <span className="bp-only" data-bp="md">
              24px
            </span>{" "}
            <span className="bp-only" data-bp="lg">
              32px
            </span>{" "}
            <span className="bp-only" data-bp="xl">
              32px
            </span>
          </span>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">base</th>
              <th scope="col">md</th>
              <th scope="col">lg</th>
              <th scope="col">xl</th>
              <th scope="col">Controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--grid-columns</code>
              </td>
              <td>4</td>
              <td>8</td>
              <td>12</td>
              <td>12</td>
              <td className="cell-muted">Number of columns in the layout grid.</td>
            </tr>
            <tr>
              <td>
                <code>--grid-gutter</code>
              </td>
              <td>16px</td>
              <td>24px</td>
              <td>24px</td>
              <td>32px</td>
              <td className="cell-muted">Space between two columns.</td>
            </tr>
            <tr>
              <td>
                <code>--grid-margin</code>
              </td>
              <td>16px</td>
              <td>24px</td>
              <td>32px</td>
              <td>32px</td>
              <td className="cell-muted">Space between the grid and the viewport edge.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H3 id="spanning-columns">Spanning columns</H3>
      <p>
        4, 8 and 12 were chosen because they share divisors. A block that spans <strong>4</strong>{" "}
        columns is full width at base, a half at md and a third at lg — one declaration, three
        layouts, no media query. The three blocks below do exactly that.
      </p>
      <div className="grid-demo">
        <div className="layout-grid">
          <div className="grid-demo__span col-4">span 4</div>
          <div className="grid-demo__span col-4">span 4</div>
          <div className="grid-demo__span col-4">span 4</div>
        </div>
        <div className="grid-demo__meta">
          <span>
            <span className="bp-only" data-bp="base">
              1 per row (4 of 4)
            </span>{" "}
            <span className="bp-only" data-bp="md">
              2 per row (4 of 8)
            </span>{" "}
            <span className="bp-only" data-bp="lg">
              3 per row (4 of 12)
            </span>{" "}
            <span className="bp-only" data-bp="xl">
              3 per row (4 of 12)
            </span>
          </span>
        </div>
      </div>{" "}
      <CodeBlock
        filename="grid.css"
        lang="css"
        code={`.layout-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
  gap: var(--grid-gutter);
}

/* 4 columns at base, 8 at md, 12 at lg — so "span 4" is
   full width, then a half, then a third. No media query needed. */
.col-4 {
  grid-column: span 4;
}

/* Only reach for a media query when the span itself must change. */
@media (min-width: 64rem) {
  .col-sidebar {
    grid-column: span 3;
  }

  .col-main {
    grid-column: span 9;
  }
}`}
      />{" "}
      <H2 id="breakpoints">Breakpoints</H2>
      <p>
        Five breakpoints, named by size and used mobile-first: styles outside a media query are the
        phone layout, and every <code>@media</code> rule is <code>min-width</code>. The grid only
        changes at <code>md</code> and <code>lg</code> — <code>sm</code>, <code>xl</code> and{" "}
        <code>2xl</code> adjust spacing and type without reshaping the page.
      </p>
      <ol className="ruler">
        <li className="ruler__row">
          <span className="ruler__name">base</span>{" "}
          <span className="ruler__track">
            <span className="ruler__fill" style={{ "--from": "0%" }}></span>
          </span>{" "}
          <span className="ruler__value">0 – 639px</span>
        </li>
        <li className="ruler__row">
          <span className="ruler__name">sm</span>{" "}
          <span className="ruler__track">
            <span className="ruler__fill" style={{ "--from": "40%" }}></span>
          </span>{" "}
          <span className="ruler__value">≥ 640px</span>
        </li>
        <li className="ruler__row">
          <span className="ruler__name">md</span>{" "}
          <span className="ruler__track">
            <span className="ruler__fill" style={{ "--from": "48%" }}></span>
          </span>{" "}
          <span className="ruler__value">≥ 768px</span>
        </li>
        <li className="ruler__row">
          <span className="ruler__name">lg</span>{" "}
          <span className="ruler__track">
            <span className="ruler__fill" style={{ "--from": "64%" }}></span>
          </span>{" "}
          <span className="ruler__value">≥ 1024px</span>
        </li>
        <li className="ruler__row">
          <span className="ruler__name">xl</span>{" "}
          <span className="ruler__track">
            <span className="ruler__fill" style={{ "--from": "80%" }}></span>
          </span>{" "}
          <span className="ruler__value">≥ 1280px</span>
        </li>
        <li className="ruler__row">
          <span className="ruler__name">2xl</span>{" "}
          <span className="ruler__track">
            <span className="ruler__fill" style={{ "--from": "96%" }}></span>
          </span>{" "}
          <span className="ruler__value">≥ 1536px</span>
        </li>
      </ol>
      <div className="ruler__scale" aria-hidden>
        <span></span>{" "}
        <span className="ruler__ticks">
          <span>0</span>
          <span>400</span>
          <span>800</span>
          <span>1200</span>
          <span>1600px</span>
        </span>{" "}
        <span></span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Token</th>
              <th scope="col">Min-width</th>
              <th scope="col">Cols</th>
              <th scope="col">Gutter</th>
              <th scope="col">Margin</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>base</code>
              </td>
              <td>—</td>
              <td className="cell-type">0</td>
              <td>4</td>
              <td>16px</td>
              <td>16px</td>
              <td className="cell-muted">Phones. Everything must work here first.</td>
            </tr>
            <tr>
              <td>
                <code>sm</code>
              </td>
              <td>
                <code>--sds-breakpoint-sm</code>
              </td>
              <td className="cell-type">640px</td>
              <td>4</td>
              <td>16px</td>
              <td>16px</td>
              <td className="cell-muted">Large phones and small tablets in portrait.</td>
            </tr>
            <tr>
              <td>
                <code>md</code>
              </td>
              <td>
                <code>--sds-breakpoint-md</code>
              </td>
              <td className="cell-type">768px</td>
              <td>8</td>
              <td>24px</td>
              <td>24px</td>
              <td className="cell-muted">
                Tablets. The grid doubles and the sidebar drawer becomes a column.
              </td>
            </tr>
            <tr>
              <td>
                <code>lg</code>
              </td>
              <td>
                <code>--sds-breakpoint-lg</code>
              </td>
              <td className="cell-type">1024px</td>
              <td>12</td>
              <td>24px</td>
              <td>32px</td>
              <td className="cell-muted">Laptops. Full 12-column grid.</td>
            </tr>
            <tr>
              <td>
                <code>xl</code>
              </td>
              <td>
                <code>--sds-breakpoint-xl</code>
              </td>
              <td className="cell-type">1280px</td>
              <td>12</td>
              <td>32px</td>
              <td>32px</td>
              <td className="cell-muted">
                Desktops. Gutters open up; the docs table of contents appears.
              </td>
            </tr>
            <tr>
              <td>
                <code>2xl</code>
              </td>
              <td>
                <code>--sds-breakpoint-2xl</code>
              </td>
              <td className="cell-type">1536px</td>
              <td>12</td>
              <td>32px</td>
              <td>32px</td>
              <td className="cell-muted">Wide desktops. Containers stop growing.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <H3 id="using-breakpoints">Using breakpoints</H3>
      <div className="callout callout--warning">
        <span className="callout__icon" aria-hidden>
          <TriangleAlert aria-hidden size={18} />
        </span>
        <div className="callout__body">
          <p className="callout__title"> Custom properties do not work in media queries </p>
          <p>
            <code>@media (min-width: var(--sds-breakpoint-md))</code> is invalid CSS — the condition
            is evaluated before custom properties resolve, so the rule silently never matches. Write
            the literal <code>48rem</code> and treat <code>--sds-breakpoint-md</code> as the
            documented value, or generate the queries with PostCSS.
          </p>
        </div>
      </div>{" "}
      <CodeBlock
        filename="breakpoints.css"
        lang="css"
        code={`/* A custom property CANNOT be used in a media query condition.  */
/* This is invalid CSS and will never match:                     */
/*   @media (min-width: var(--sds-breakpoint-md)) { … }                      */

/* Write the literal, and keep --bp-* as the documented source   */
/* of truth. Mobile-first: min-width only, never max-width.      */
@media (min-width: 48rem) {
  /* md and up */
  .page {
    padding-inline: var(--grid-margin);
  }
}

/* With PostCSS you can hoist the value out of the literal: */
@custom-media --md (min-width: 48rem);

@media (--md) {
  .page { padding-inline: var(--grid-margin); }
}`}
      />{" "}
      <p>
        Breakpoints describe the viewport, not a component. A card that needs to reflow inside a
        narrow column should use a container query (<code>@container</code>) instead — the card does
        not know how wide the window is, and should not care.
      </p>
      <H2 id="containers">Containers</H2>
      <p>
        A container caps the width of content and centres it. Below each max-width is drawn against
        the same 1536px reference, so the hatched area is the space a container gives back on a wide
        screen.
      </p>
      <div className="containers">
        <div className="containers__row">
          <span className="containers__name">--content-max</span>{" "}
          <span className="containers__track">
            <span className="containers__bar" style={{ "--w": "47.9%" }}>
              736px
            </span>
          </span>
        </div>
        <div className="containers__row">
          <span className="containers__name">--sds-container-sm</span>{" "}
          <span className="containers__track">
            <span className="containers__bar" style={{ "--w": "41.7%" }}>
              640px
            </span>
          </span>
        </div>
        <div className="containers__row">
          <span className="containers__name">--sds-container-md</span>{" "}
          <span className="containers__track">
            <span className="containers__bar" style={{ "--w": "50.0%" }}>
              768px
            </span>
          </span>
        </div>
        <div className="containers__row">
          <span className="containers__name">--sds-container-lg</span>{" "}
          <span className="containers__track">
            <span className="containers__bar" style={{ "--w": "66.7%" }}>
              1024px
            </span>
          </span>
        </div>
        <div className="containers__row">
          <span className="containers__name">--sds-container-xl</span>{" "}
          <span className="containers__track">
            <span className="containers__bar" style={{ "--w": "83.3%" }}>
              1280px
            </span>
          </span>
        </div>
        <div className="containers__row">
          <span className="containers__name">--sds-container-2xl</span>{" "}
          <span className="containers__track">
            <span className="containers__bar" style={{ "--w": "100.0%" }}>
              1536px
            </span>
          </span>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Max-width</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--content-max</code>
              </td>
              <td className="cell-type">46rem · 736px</td>
              <td className="cell-muted">
                Measure for long-form text — roughly 75 characters per line.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-container-sm</code>
              </td>
              <td className="cell-type">40rem · 640px</td>
              <td className="cell-muted">Narrow forms, auth screens, single-column dialogs.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-container-md</code>
              </td>
              <td className="cell-type">48rem · 768px</td>
              <td className="cell-muted">Article and settings pages.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-container-lg</code>
              </td>
              <td className="cell-type">64rem · 1024px</td>
              <td className="cell-muted">Standard application content.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-container-xl</code>
              </td>
              <td className="cell-type">80rem · 1280px</td>
              <td className="cell-muted">Dashboards and wide data tables.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-container-2xl</code>
              </td>
              <td className="cell-type">96rem · 1536px</td>
              <td className="cell-muted">
                The widest shell. <code>--container-max</code> is an alias of this.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Width and reading measure are separate decisions. <code>--sds-container-xl</code> can hold a
        dashboard at 1280px while the prose inside it stays at <code>--content-max</code>, because a
        1280px line of text is unreadable no matter how much room there is. These docs do exactly
        that.
      </p>{" "}
      <CodeBlock
        filename="container.css"
        lang="css"
        code={`.container {
  width: 100%;
  max-width: var(--sds-container-xl);
  margin-inline: auto;
  /* The margin token keeps content off the viewport edge */
  padding-inline: var(--grid-margin);
}

/* Long-form text gets a measure, not the full container. */
.prose {
  max-width: var(--content-max);
}`}
      />{" "}
      <H2 id="layering">Layering</H2>
      <p>
        Elements that overlap the page — sticky headers, fixed bars, dropdowns, dialogs, toasts —
        take their <code>z-index</code> from a named layer, never a raw number. Each layer sits
        above the ones before it, and the gaps leave room to add layers later without renumbering.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Value</th>
              <th scope="col">Tailwind</th>
              <th scope="col">When to use it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>--sds-z-base</code>
              </td>
              <td className="cell-type">0</td>
              <td>
                <code>z-base</code>
              </td>
              <td className="cell-muted">Default stacking: the normal page flow.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-raised</code>
              </td>
              <td className="cell-type">10</td>
              <td>
                <code>z-raised</code>
              </td>
              <td className="cell-muted">
                Lifts an element above its siblings, such as the focused item in a button group.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-dropdown</code>
              </td>
              <td className="cell-type">1000</td>
              <td>
                <code>z-dropdown</code>
              </td>
              <td className="cell-muted">Menus and listboxes anchored to a control.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-sticky</code>
              </td>
              <td className="cell-type">1100</td>
              <td>
                <code>z-sticky</code>
              </td>
              <td className="cell-muted">Sticky headers and toolbars, like this site's header.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-fixed</code>
              </td>
              <td className="cell-type">1200</td>
              <td>
                <code>z-fixed</code>
              </td>
              <td className="cell-muted">
                Bars fixed to the viewport: Banner and Bottom Navigation.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-overlay</code>
              </td>
              <td className="cell-type">1300</td>
              <td>
                <code>z-overlay</code>
              </td>
              <td className="cell-muted">Backdrops that dim the page behind a drawer or dialog.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-modal</code>
              </td>
              <td className="cell-type">1400</td>
              <td>
                <code>z-modal</code>
              </td>
              <td className="cell-muted">Dialogs and drawers.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-popover</code>
              </td>
              <td className="cell-type">1500</td>
              <td>
                <code>z-popover</code>
              </td>
              <td className="cell-muted">Popovers, which can open from inside a dialog.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-toast</code>
              </td>
              <td className="cell-type">1600</td>
              <td>
                <code>z-toast</code>
              </td>
              <td className="cell-muted">
                Toast notifications, above dialogs so they are never hidden.
              </td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-tooltip</code>
              </td>
              <td className="cell-type">1700</td>
              <td>
                <code>z-tooltip</code>
              </td>
              <td className="cell-muted">Tooltips, which can describe anything below them.</td>
            </tr>
            <tr>
              <td>
                <code>--sds-z-skip-link</code>
              </td>
              <td className="cell-type">1800</td>
              <td>
                <code>z-skip-link</code>
              </td>
              <td className="cell-muted">
                The skip link, which must be visible above everything when focused.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A layer only competes with elements in the same stacking context. A parent with a
        <code>transform</code>, <code>filter</code> or its own <code>z-index</code> starts a new
        context, so a modal inside it can't rise above the page around it — render overlays near the
        end of <code>&lt;body&gt;</code>, or use the native <code>&lt;dialog&gt;</code>, which opens
        in the browser's top layer.
      </p>{" "}
      <CodeBlock
        filename="layers.tsx"
        lang="tsx"
        code={`<header className="sticky top-0 z-sticky">…</header>

/* In CSS */
.drawer-backdrop {
  z-index: var(--sds-z-overlay);
}`}
      />{" "}
      <H2 id="accessibility">Accessibility</H2>
      <ul>
        <li>
          <strong>Reflow</strong> — WCAG 2.2 1.4.10 asks for no two-dimensional scrolling at 320 CSS
          px wide. The base layout is the one that has to satisfy this, which is why it is only 4
          columns.
        </li>
        <li>
          <strong>Zoom</strong> — spacing in <code>rem</code> grows with the user's font size. A
          layout pinned in <code>px</code> does not, and text collides with its container at 200%
          zoom.
        </li>
        <li>
          <strong>Target size</strong> — 2.5.8 (AA) requires 24 × 24 CSS px; 2.5.5 (AAA) asks for 44
          × 44. A 36px control with <code>--sds-space-2</code> around it clears AA with room to
          spare.
        </li>
        <li>
          <strong>Spacing overrides</strong> — 1.4.12 requires text to survive increased line height
          and paragraph spacing. Using <code>gap</code> rather than fixed heights is what makes that
          work.
        </li>
      </ul>
      <H2 id="related">Related</H2>
      <div className="card-grid">
        <Link className="doc-card" href="/foundation/color">
          <span className="doc-card__title">Color</span>{" "}
          <span className="doc-card__text">Primitive scales and the semantic token layer.</span>
        </Link>{" "}
        <Link className="doc-card" href="/foundation/typography">
          <span className="doc-card__title">Typography</span>{" "}
          <span className="doc-card__text">Type scale, line height and vertical rhythm.</span>
        </Link>{" "}
        <Link className="doc-card" href="/foundation/border-and-radius">
          <span className="doc-card__title">Border &amp; radius</span>{" "}
          <span className="doc-card__text">
            Radius nesting subtracts the padding values defined here.
          </span>
        </Link>
      </div>
      <H2 id="changelog">Changelog</H2>
      <ul>
        <li>
          <strong>Unreleased</strong> — 4px spacing scale with 36 steps (including half-steps and{" "}
          <code>--sds-space-px</code>), the 4/8/12-column grid, five breakpoints and the container
          scale as <code>@stefan-florescu/tokens</code>.
        </li>
        <li>
          <strong>Unreleased</strong> — Layer tokens (<code>--sds-z-*</code>) and the matching{" "}
          <code>z-*</code> utilities, from <code>z-base</code> to <code>z-skip-link</code>.
        </li>
      </ul>
    </>
  );
}
