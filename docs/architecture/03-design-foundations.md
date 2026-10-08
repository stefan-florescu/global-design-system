# 03 · Design Foundations

These are the **proposed** scales that Phase A will encode as tokens. Values are a starting
point to validate in Figma before implementation.

## 3.1 Color system

> **Status: implemented** — `packages/tokens/src/primitive/color.json`,
> `packages/tokens/src/semantic/color.json`, `packages/themes/src/dark/color.json`.
> Documented on the docs site at `/foundation/color`.

**Model:** OKLCH primitives → semantic tokens → themes (light = semantic defaults, dark = overrides).

**Primitive palettes** — the 22 Tailwind CSS v4 default palettes (as used by Flowbite), 11 steps
each (`50`…`950`), plus `white` and `black`:
`slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`,
`emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`.

**Semantic tokens** (34, modelled on Flowbite's text / background / border roles):

| Group        | Tokens                                                                                                                                                                                | Tailwind   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `text`       | `heading`, `body`, `body-subtle`, `brand`, `brand-strong`, `on-brand`, `success`, `danger`, `warning`, `disabled`                                                                     | `text-*`   |
| `background` | `default`, `subtle`, `muted`, `emphasis`, `inverse`, `brand`, `brand-strong`, `brand-soft`, `success`, `success-soft`, `danger`, `danger-soft`, `warning`, `warning-soft`, `disabled` | `bg-*`     |
| `border`     | `subtle`, `default`, `strong`, `control`, `focus`, `brand`, `success`, `danger`, `warning`                                                                                            | `border-*` |

Brand = `blue`, neutral = `gray`, success = `emerald`, danger = `rose`, warning = `orange`.
`border.control` (gray-500) is an addition to Flowbite's set so form-control boundaries meet 3:1.

**Accessibility:** text ≥ 4.5:1, focus indicators and control boundaries ≥ 3:1 (WCAG 2.2
SC 1.4.3, 1.4.11). 27 pairings are checked on every `@stefan-florescu/themes` build, in every
theme; the build fails on any regression. Results: `@stefan-florescu/themes/contrast.json`.

## 3.2 Typography system

- **Families:** `sans` (UI — e.g. Inter / Geist), `mono` (code — e.g. Geist Mono / JetBrains Mono),
  optional `display`. Loaded via `next/font` in apps; tokens hold the stack.
- **Scale:** modular, ratio ≈ 1.2 (minor third), rem-based, 16px root.

| Token        | Size / Line height | Weight | Use                  |
| ------------ | ------------------ | ------ | -------------------- |
| `display-lg` | 48 / 56            | 600    | Marketing hero       |
| `display-md` | 40 / 48            | 600    |                      |
| `heading-xl` | 32 / 40            | 600    | Page title (h1)      |
| `heading-lg` | 24 / 32            | 600    | Section (h2)         |
| `heading-md` | 20 / 28            | 600    | h3                   |
| `heading-sm` | 16 / 24            | 600    | h4                   |
| `body-lg`    | 18 / 28            | 400    | Long-form            |
| `body-md`    | 16 / 24            | 400    | Default              |
| `body-sm`    | 14 / 20            | 400    | Dense UI             |
| `label-md`   | 14 / 20            | 500    | Form labels, buttons |
| `label-sm`   | 12 / 16            | 500    | Badges, meta         |
| `code-md`    | 14 / 20            | 400    | Inline / block code  |

Composite `typography` tokens bundle family/size/weight/line-height/letter-spacing and
generate Tailwind utilities (`text-heading-lg`). Fluid `clamp()` sizes for `display-*` only.

## 3.3 Spacing scale

Base unit **4px**. Primitive `dimension` steps; semantic aliases by usage.

| Step | 0   | 0.5 | 1   | 1.5 | 2   | 3   | 4   | 5   | 6   | 8   | 10  | 12  | 16  | 20  | 24  |
| ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| px   | 0   | 2   | 4   | 6   | 8   | 12  | 16  | 20  | 24  | 32  | 40  | 48  | 64  | 80  | 96  |

Semantic: `space.inset.{xs…xl}` (padding), `space.stack.{xs…xl}` (vertical gap),
`space.inline.{xs…xl}` (horizontal gap), `space.section.{sm…xl}` (layout).
Density themes re-map these, not the primitives.

## 3.4 Radius scale

| Token  | Value  | Use                       |
| ------ | ------ | ------------------------- |
| `none` | 0      | Tables, full-bleed        |
| `xs`   | 2px    | Checkbox, tags            |
| `sm`   | 4px    | Inputs (compact)          |
| `md`   | 6px    | Buttons, inputs (default) |
| `lg`   | 8px    | Cards, popovers           |
| `xl`   | 12px   | Dialogs, sheets           |
| `2xl`  | 16px   | Large containers          |
| `full` | 9999px | Pills, avatars            |

## 3.5 Elevation scale

Elevation = **shadow + surface colour + z-index** together, so dark mode can lighten surfaces
instead of relying on shadows.

| Level | Token         | Typical use            | z-index token                         |
| ----- | ------------- | ---------------------- | ------------------------------------- |
| 0     | `elevation.0` | Flat, in-page          | `z.base` (0)                          |
| 1     | `elevation.1` | Cards, raised buttons  | `z.raised` (10)                       |
| 2     | `elevation.2` | Dropdowns, popovers    | `z.dropdown` (1000)                   |
| 3     | `elevation.3` | Sticky headers, toasts | `z.sticky` (1100) / `z.toast` (1400)  |
| 4     | `elevation.4` | Dialogs, drawers       | `z.overlay` (1200) / `z.modal` (1300) |
| —     | —             | Tooltips               | `z.tooltip` (1500)                    |

## 3.6 Grid system

- **12-column** fluid grid, CSS Grid based; components are grid-agnostic.
- Container max-widths: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1440`, `prose 65ch`.

| Breakpoint | Columns | Gutter | Margin          |
| ---------- | ------- | ------ | --------------- |
| < `sm`     | 4       | 16     | 16              |
| `sm`–`md`  | 8       | 16     | 24              |
| `lg`+      | 12      | 24     | 32              |
| `xl`+      | 12      | 32     | auto (centered) |

Prefer **container queries** (`@container`) for component-level responsiveness; breakpoints are for page layout.

## 3.7 Breakpoints

Mobile-first, min-width, rem-based (aligned with Tailwind defaults to minimise surprise):

| Token | rem   | px   |
| ----- | ----- | ---- |
| `sm`  | 40rem | 640  |
| `md`  | 48rem | 768  |
| `lg`  | 64rem | 1024 |
| `xl`  | 80rem | 1280 |
| `2xl` | 96rem | 1536 |

## 3.8 Also in Phase A

- **Motion:** `duration.{instant 0, fast 100, normal 200, slow 300, slower 500}`ms;
  `easing.{standard, enter, exit, emphasized}`; all disabled under `prefers-reduced-motion`.
- **Iconography:** lucide.dev; sizes `12/16/20/24/32`, stroke `1.5` (default) / `2`, `currentColor`,
  decorative icons `aria-hidden`. (Visual spec to be defined.)
- **Focus:** 2px ring, 2px offset, `border.focus` colour, `:focus-visible` only.
- **Opacity, border-width, z-index** scales.
