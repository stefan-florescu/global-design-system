# @stefan-florescu/tokens

Single source of truth for every design decision expressed as data. Authored in
[W3C DTCG](https://www.designtokens.org/) JSON and compiled with Style Dictionary.

| Layer     | Folder           | References allowed     | Consumed by          |
| --------- | ---------------- | ---------------------- | -------------------- |
| Primitive | `src/primitive/` | none (raw values only) | semantic tokens only |
| Semantic  | `src/semantic/`  | primitives             | themes, components   |
| Component | `src/component/` | semantic               | a single component   |

```bash
pnpm --filter @stefan-florescu/tokens build
```

Outputs `build/css/variables.css`, `build/js/tokens.js`, `build/json/tokens.json`.

## Status

| Category   | Tokens                                                       |
| ---------- | ------------------------------------------------------------ |
| Colour     | 8 primitive scales (80) + 48 semantic tokens, light and dark |
| Typography | 3 families, 6 weights, 13 sizes, line heights, tracking      |
| Spacing    | 4px base, 36 steps                                           |
| Border     | 5 widths, 9 radii                                            |
| Elevation  | 3 shadows                                                    |
| Icons      | 4 sizes + stroke width                                       |
| Layout     | 5 breakpoints, 5 containers                                  |

See `docs/architecture/02-token-architecture.md` and the Color page on the docs site.
