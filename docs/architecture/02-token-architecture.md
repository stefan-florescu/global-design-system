# 02 · Token Architecture

Tokens are the **API between design and code**. Every visual decision is a token; components
never contain raw values.

## 2.1 Format & pipeline

- **Format:** [W3C Design Tokens Community Group (DTCG)](https://www.designtokens.org/) JSON —
  `$value`, `$type`, `$description`, `$extensions`. Tool-agnostic, supported by Style Dictionary 5,
  Tokens Studio and Figma Variables export.
- **Build:** Style Dictionary 5 (`packages/tokens/scripts/build.mjs`, `packages/themes/scripts/build.mjs`).
- **Outputs:** CSS custom properties (`--sds-*`), ES module + `.d.ts`, nested JSON (for tooling & AI).

```
 Figma Variables ──(Tokens Studio / REST, later)──┐
                                                  ▼
 packages/tokens/src/{primitive,semantic,component}/*.json   (DTCG)
                │  Style Dictionary
                ▼
 build/css/variables.css   build/js/tokens.js(.d.ts)   build/json/tokens.json
                │
 packages/themes/src/<theme>/*.json ──► build/css/<theme>.css   ([data-theme="…"])
                │
 packages/config/tailwind/theme.css   @theme inline { --color-*: var(--sds-…) }
                │
 packages/ui   bg-surface  text-foreground  rounded-md  shadow-sm  …
```

## 2.2 The four tiers

| Tier          | Purpose                                    | References | Who may use it           | Changes when…                |
| ------------- | ------------------------------------------ | ---------- | ------------------------ | ---------------------------- |
| **Primitive** | The full palette of raw values (_options_) | nothing    | semantic tokens only     | brand refresh                |
| **Semantic**  | Purpose / intent (_decisions_)             | primitives | components, apps, themes | design language evolves      |
| **Component** | Component-specific overrides               | semantic   | that one component       | a component needs to diverge |
| **Theme**     | Re-assign semantic tokens per context      | primitives | applied via `data-theme` | new mode / brand / density   |

Rule of thumb: **if a token name contains a colour hue or a number from a scale, it is a
primitive and components must not use it.**

### Primitive tokens — `src/primitive/`

Raw, context-free values. Named by _what they are_.

```json
{
  "color": {
    "$type": "color",
    "neutral": {
      "0": { "$value": "#ffffff" },
      "50": { "$value": "oklch(0.985 0 0)" },
      "900": { "$value": "oklch(0.205 0 0)" }
    },
    "blue": {
      "500": { "$value": "oklch(0.623 0.214 259.8)" },
      "600": { "$value": "oklch(0.546 0.245 262.9)" },
      "700": { "$value": "oklch(0.488 0.243 264.4)" }
    }
  },
  "dimension": {
    "$type": "dimension",
    "100": { "$value": "4px" },
    "200": { "$value": "8px" },
    "400": { "$value": "16px" }
  }
}
```

### Semantic tokens — `src/semantic/`

Named by _what they're for_. Every colour token has a `$description` and a docs group
(`$extensions.sds.group`). The theme-independent scales — spacing, radius, border width,
typography, elevation, layers (`z.*`), icons, breakpoints, containers — also live here: components use them
directly.

```json
{
  "color": {
    "$type": "color",
    "background": {
      "$value": "{color.white}",
      "$description": "The page canvas. Everything else sits on top of it.",
      "$extensions": { "sds": { "group": "Surfaces" } }
    },
    "muted-foreground": { "$value": "{color.gray.600}" },
    "brand": { "$value": "{color.blue.700}" },
    "overlay": { "$value": "color-mix(in srgb, {color.gray.900} 60%, transparent)" }
  }
}
```

### Component tokens — `src/component/`

Only when a component must diverge from the semantic default, or when we want an explicit
override hook for themes. **Don't create them by default** — most components use semantic tokens
directly via Tailwind.

```json
{
  "button": {
    "primary": {
      "background": { "$type": "color", "$value": "{color.background.brand}" }
    },
    "radius": { "$type": "dimension", "$value": "{radius.md}" },
    "height": {
      "md": { "$type": "dimension", "$value": "{dimension.1000}" }
    }
  }
}
```

### Theme tokens — `packages/themes/src/<theme>/`

A theme re-points **semantic** tokens. Nothing else changes; components are theme-unaware.
The light theme is the semantic defaults; `src/light/` only holds deviations from them.

```json
// packages/themes/src/dark/color.json
{
  "color": {
    "$type": "color",
    "background": { "$value": "{color.gray.900}" },
    "foreground": { "$value": "{color.gray.50}" },
    "brand": { "$value": "{color.blue.600}" }
  }
}
```

Emits:

```css
:root, [data-theme="light"] { --sds-color-background: var(--sds-color-white); … }
[data-theme="dark"]          { --sds-color-background: var(--sds-color-gray-900); … }
```

Theme axes planned (each orthogonal, combinable through separate data attributes):

| Axis    | Attribute      | Values                                     |
| ------- | -------------- | ------------------------------------------ |
| Mode    | `data-theme`   | `light` (default), `dark`, `high-contrast` |
| Brand   | `data-brand`   | `default`, future product brands           |
| Density | `data-density` | `comfortable` (default), `compact`         |

## 2.3 Tailwind v4 bridge

`packages/config/tailwind/theme.css` is the only file mapping tokens to utilities:

```css
@theme inline {
  --color-background: var(--sds-color-background); /* bg-background */
  --color-muted-foreground: var(--sds-color-muted-foreground); /* text-muted-foreground */
  --color-border: var(--sds-color-border); /* border-border */
  --radius-md: var(--sds-radius-md); /* rounded-md */
  --font-sans: var(--sds-font-sans); /* font-sans */
}
```

`inline` keeps the `var()` reference live so theme switching needs no rebuild. Only semantic
colours are mapped — colour primitives are not exposed as utilities. Spacing needs no mapping:
Tailwind's `--spacing` base is set to `--sds-space-1` (4px), so `p-6` is `--sds-space-6`.

## 2.4 Token categories

`color` · `dimension` · `space` · `size` · `radius` · `border-width` · `font-family` ·
`font-weight` · `font-size` · `line-height` · `letter-spacing` · `typography` (composite) ·
`shadow` / `elevation` · `opacity` · `z-index` · `duration` · `easing` · `breakpoint`.

## 2.5 Rules

1. Primitives never reference anything. Semantic tokens reference primitives only.
   Component tokens reference semantic tokens only.
2. Components use semantic (or their own component) tokens. Lint rule planned to forbid
   primitive Tailwind classes and arbitrary values (`bg-[#…]`).
3. Colour primitives are the Flowbite hex palette (50–900); semantic tokens may use `color-mix()`
   with references for translucent values (e.g. `overlay`).
4. Removing or renaming a semantic token is a **breaking change** (major).
5. Token changes require the `token-request` issue template and design review (CODEOWNERS).
