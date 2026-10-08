# 03 · Design Foundations

These are the **proposed** scales that Phase A will encode as tokens. Values are a starting
point to validate in Figma before implementation.

> **Status: implemented.** The foundations below are tokens in `@stefan-florescu/tokens` and are
> documented, with live specimens, on the docs site: `/foundation/color`, `/foundation/typography`,
> `/foundation/spacing-and-layout`, `/foundation/border-and-radius`. The docs site is the
> detailed reference; this section is the summary.

## 3.1 Color system

- **Primitives:** 8 scales from the Flowbite palette — `gray`, `red`, `yellow`, `green`, `blue`,
  `indigo`, `purple`, `pink` — each `50`…`900` (80 hex values) plus `white` and `black`.
  `--sds-color-{hue}-{step}`.
- **Semantic tokens (48):** shadcn-style names grouped as Surfaces (`background`, `card`,
  `popover`, `muted`, `accent`, `overlay`), Text (`foreground`, `*-foreground`), Borders & focus
  (`border`, `input`, `ring`), Actions (`primary`, `secondary`, `brand`, `brand-subtle`), Status
  (`success`, `warning`, `destructive`, `info` with `-foreground`, `-subtle`,
  `-subtle-foreground`) and Code surface (`code-*`, `syntax-*`). `--sds-color-{name}`; Tailwind
  `bg-{name}`, `text-{name}`, `border-{name}`, `ring-{name}`.
- **Themes:** light = semantic defaults; dark re-points 29 colour tokens and `shadow-lg`.
- **Accessibility:** 29 pairings (text ≥ 4.5:1, `input`, `ring`, `brand` fill ≥ 3:1) are checked in
  both themes on every themes build; the build fails on a regression.

## 3.2 Typography system

Inter (sans, self-hosted variable font, weights 300–800 + italic), Georgia (serif), system mono.
13 sizes `--sds-text-xs`…`9xl` (12–128px), 6 weights `--sds-font-light`…`extrabold`, line heights
`--sds-leading-3`…`10` on the 4px grid plus `--sds-leading-none`, tracking
`--sds-tracking-tighter`…`widest` (absolute px).

## 3.3 Spacing scale

4px base, 36 steps `--sds-space-0`…`96` (`--sds-space-6` = 24px), with half-steps below 20px and
`--sds-space-px` for hairlines. Tailwind's `p-6`/`gap-6` resolve to the same values.

## 3.4 Radius scale

`--sds-radius-none`, `xs` 2, `sm` 4, `md` 6, `lg` 8, `xl` 12, `2xl` 16, `3xl` 24, `full`. Border widths
`--sds-border-width-0/1/2/4/8`.

## 3.5 Elevation scale

`--sds-shadow-sm`, `md`, `lg` (dark theme strengthens `lg`). Icons: `--sds-icon-sm/md/lg/xl`
(16/20/24/32px) and `--sds-icon-stroke` 1.5.

## 3.6 Grid system

Fluid grid: 4 columns (base), 8 from `md`, 12 from `lg`; gutters and margins step 16 → 24 → 32px.
Containers `--sds-container-sm`…`2xl` (640–1536px).

## 3.7 Breakpoints

`--sds-breakpoint-sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem — reference values
(custom properties can't be used inside media queries).

## 3.8 Also in Phase A

- **Motion:** `duration.{instant 0, fast 100, normal 200, slow 300, slower 500}`ms;
  `easing.{standard, enter, exit, emphasized}`; all disabled under `prefers-reduced-motion`.
- **Iconography:** lucide.dev; sizes `12/16/20/24/32`, stroke `1.5` (default) / `2`, `currentColor`,
  decorative icons `aria-hidden`. (Visual spec to be defined.)
- **Focus:** 2px ring, 2px offset, `border.focus` colour, `:focus-visible` only.
- **Opacity, border-width, z-index** scales.
