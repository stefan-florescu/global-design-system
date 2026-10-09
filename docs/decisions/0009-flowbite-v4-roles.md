# 0009 · Match Flowbite v4: its palette, roles and component classes

- **Status:** Accepted (supersedes the colour and radius parts of 0007)
- **Date:** 2026-10-08
- **Deciders:** @stefan-florescu

## Context

Components were modelled on Flowbite but translated freely, so they looked noticeably different
from flowbite.com: other hover shades, a different focus treatment, white fields with fixed heights,
8px corners. The request is that every component look exactly like Flowbite's.

flowbite.com now runs **Flowbite v4**. v4 builds every component from Tailwind v4's default
palette (oklch) and a theme of about 90 semantic roles. Examples: `bg-brand`,
`hover:bg-brand-strong`, `focus:ring-brand-medium`, `text-heading`, `text-body`,
`bg-neutral-secondary-medium`, `border-default-medium`, `rounded-base`, `shadow-xs`. The roles are
defined in `flowbite/src/themes/default.css`, in light and dark. The docs markup is in
`themesberg/flowbite` under `content/`.

## Decision

- **Primitives** are Tailwind v4's palette, verbatim in oklch: gray, blue, emerald, rose, orange,
  yellow and the decorative hues, 50–950. Wide-gamut screens therefore show the same colours as
  flowbite.com.
- **Semantic colour tokens take Flowbite v4's role names and values**, in light and dark, so
  Flowbite's class strings map to ours one-to-one. The shadcn-style names (`background`,
  `muted-foreground`, `destructive`, `info`…) are removed. Flowbite's single-colour roles (`gray`,
  `purple`, `teal`…) are left out because they collide with the primitive scale names; Flowbite uses
  them only for decoration.
- **Radius and elevation follow Flowbite:** `rounded` 8px, `rounded-base` 12px (the default for
  buttons, fields and cards), `rounded-lg` 16px, `rounded-sm` 6px, `rounded-xs` 4px. Shadows are
  Tailwind's, from `shadow-2xs` to `shadow-xl`.
- **Components copy Flowbite v4's classes**, translating only `text-white` (to `*-foreground`) and
  raw palette colours (to roles). Variant names follow Flowbite's option names, lowercased (`danger`,
  `dark`, `tertiary`…), with Flowbite's blue default named `brand`.
- **Accessibility wins where Flowbite fails WCAG 2.2 AA.** These tokens and rules are ours:
  - `ring`: a solid keyboard-focus outline (`lib/focus.ts`) around Flowbite's soft focus halo.
    The halo alone is under 3:1.
  - `warning-foreground` is dark: white on orange-500 is about 2.8:1. For the same reason,
    `warning-strong` is one step from `warning` instead of two.
  - `success` stays on emerald-700 in dark mode: white on Flowbite's emerald-600 is under 4.5:1.
  - Outline and validation text uses the `fg-*` text roles instead of the fill colours.

  The themes build checks 43 pairings in both themes.

  **Amended (October 2026):** `input` (field, checkbox and radio borders) was first gray-450 to reach
  3:1. By request it is now Flowbite's own gray-200 (gray-700 in dark), below 3:1 and no longer
  checked; the field's fill and its brand focus border mark the control. `gray.450` is removed.

## Consequences

- New components can copy Flowbite v4 markup almost verbatim, and each docs page mirrors
  Flowbite's example sections.
- The token set is larger (90 colour roles), and several roles hold the same value in light mode.
  The difference only shows in dark mode.
- This is a breaking change for consumers of the old names. Button variants also changed: `primary`,
  `outline` (as a variant), `destructive`, `info` and `link` are gone.
- Icons stay lucide at a 1.5 stroke, by request. Flowbite's own icons use a 2px stroke, so icon
  glyphs are the one visible difference that remains.
