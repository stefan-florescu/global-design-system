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

> Status: **scaffold only** — no tokens authored yet. See `docs/architecture/02-token-architecture.md`.
