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

| Theme | Selector                      | Status   |
| ----- | ----------------------------- | -------- |
| light | `:root, [data-theme="light"]` | scaffold |
| dark  | `[data-theme="dark"]`         | scaffold |

Adding a theme = add `src/<name>/` with DTCG JSON overrides. No code changes required.
