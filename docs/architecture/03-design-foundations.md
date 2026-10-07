# 03 · Design Foundations

These are the **proposed** scales that Phase A will encode as tokens. Values are a starting
point to validate in Figma before implementation.

## 3.1 Color system

**Model:** OKLCH primitives → semantic roles → themes.

**Primitive palettes** (11 steps each: 50, 100, 200 … 900, 950):

| Palette   | Role                                         |
| --------- | -------------------------------------------- |
| `neutral` | Text, surfaces, borders (slightly cool grey) |
| `brand`   | Primary identity colour (to be chosen)       |
| `blue`    | Info, links, focus                           |
| `green`   | Success                                      |
| `amber`   | Warning                                      |
| `red`     | Danger / error                               |
| `violet`  | Accent / AI features                         |

**Semantic roles:**

| Group        | Tokens                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| `background` | `default`, `subtle`, `muted`, `inverse`, `overlay`                                                           |
| `surface`    | `default`, `raised`, `sunken`, `overlay`                                                                     |
| `text`       | `default`, `muted`, `subtle`, `inverse`, `disabled`, `link`, `on-action`                                     |
| `border`     | `default`, `subtle`, `strong`, `focus`, `invalid`                                                            |
| `action`     | `primary`, `secondary`, `ghost`, `danger` × `background/foreground/border` × `default/hover/active/disabled` |
| `feedback`   | `info`, `success`, `warning`, `danger` × `background/foreground/border/icon`                                 |

**Accessibility targets:** body text ≥ 7:1 (AAA where feasible), other text ≥ 4.5:1,
UI components & focus indicators ≥ 3:1 (WCAG 2.2 SC 1.4.11, 2.4.13). Contrast will be
asserted automatically in the token build.

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
