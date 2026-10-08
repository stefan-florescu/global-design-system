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

Named by _what they're for_. Every one needs a `$description`.

```json
{
  "color": {
    "$type": "color",
    "text": {
      "heading": {
        "$value": "{color.gray.900}",
        "$description": "Headings and high-emphasis text."
      },
      "body": { "$value": "{color.gray.600}", "$description": "Default body copy." }
    },
    "background": {
      "default": { "$value": "{color.white}", "$description": "Page and app canvas." },
      "brand": {
        "$value": "{color.blue.700}",
        "$description": "Primary actions and selected states."
      },
      "brand-strong": {
        "$value": "{color.blue.800}",
        "$description": "Hover and pressed states of brand backgrounds."
      }
    },
    "border": {
      "focus": {
        "$value": "{color.blue.600}",
        "$description": "Focus rings and outlines — meets 3:1."
      }
    }
  },
  "space": {
    "$type": "dimension",
    "inset": { "md": { "$value": "{dimension.400}" } },
    "stack": { "sm": { "$value": "{dimension.200}" } }
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
    "text": { "heading": { "$value": "{color.white}" } },
    "background": {
      "default": { "$value": "{color.gray.950}" },
      "brand": { "$value": "{color.blue.600}" }
    }
  }
}
```

Emits:

```css
:root, [data-theme="light"] { --sds-color-background-default: var(--sds-color-white); … }
[data-theme="dark"]          { --sds-color-background-default: var(--sds-color-gray-950); … }
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
  --text-color-heading: var(--sds-color-text-heading); /* text-heading */
  --background-color-brand: var(--sds-color-background-brand); /* bg-brand */
  --border-color-default: var(--sds-color-border-default); /* border-default */
  --ring-color-focus: var(--sds-color-border-focus); /* ring-focus */
}
```

`inline` keeps the `var()` reference live so theme switching needs no rebuild. Type-specific
namespaces (`--text-color-*`, `--background-color-*`, `--border-color-*`) mean `text-heading`
exists but `bg-heading` does not. Only semantic tokens are mapped — primitives are not exposed as
utilities. Resetting Tailwind's default palette (`--color-*: initial;`) is planned once the docs
site no longer relies on it.

## 2.4 Token categories

`color` · `dimension` · `space` · `size` · `radius` · `border-width` · `font-family` ·
`font-weight` · `font-size` · `line-height` · `letter-spacing` · `typography` (composite) ·
`shadow` / `elevation` · `opacity` · `z-index` · `duration` · `easing` · `breakpoint`.

## 2.5 Rules

1. Primitives never reference anything. Semantic tokens reference primitives only.
   Component tokens reference semantic tokens only.
2. Components use semantic (or their own component) tokens. Lint rule planned to forbid
   primitive Tailwind classes and arbitrary values (`bg-[#…]`).
3. Colours authored in **OKLCH** for perceptual uniformity; Style Dictionary emits hex fallbacks
   if needed.
4. Removing or renaming a semantic token is a **breaking change** (major).
5. Token changes require the `token-request` issue template and design review (CODEOWNERS).
