---
applyTo: "packages/{tokens,themes}/src/**"
---

Tokens are W3C DTCG JSON (`$value`, `$type`, `$description`). Primitives hold raw values only;
semantic tokens reference primitives; component tokens reference semantic tokens; themes
re-assign semantic tokens only. Every semantic token needs a `$description`.
