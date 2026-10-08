# @stefan-florescu/themes

Theme layer. Each theme re-assigns **semantic** tokens only and is activated with
`data-theme` on any element (usually `<html>`), so themes can also be scoped to a subtree.

```css
@import "@stefan-florescu/tokens/css";
@import "@stefan-florescu/themes/css";
```

```html
<html data-theme="dark"></html>
```

| Theme | Selector                      | Source                                           |
| ----- | ----------------------------- | ------------------------------------------------ |
| light | `:root, [data-theme="light"]` | semantic defaults from `@stefan-florescu/tokens` |
| dark  | `[data-theme="dark"]`         | `src/dark/` overrides                            |

The build also emits `build/json/themes.json` (every semantic token per theme, exported as
`@stefan-florescu/themes/json`) and `build/json/contrast.json` (WCAG results, exported as
`@stefan-florescu/themes/contrast.json`). **The build fails if any checked colour pairing
misses its WCAG minimum in any theme** — pairings are listed in `scripts/contrast.mjs`.

Adding a theme = add `src/<name>/` with DTCG JSON overrides of semantic tokens. No code changes required.
