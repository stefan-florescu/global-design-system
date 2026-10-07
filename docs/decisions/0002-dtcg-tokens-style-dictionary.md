# 0002 · W3C DTCG tokens built with Style Dictionary

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

Tokens must be tool-agnostic (Figma, code, AI) and compile to CSS, JS and JSON.

## Decision

Author tokens in W3C DTCG JSON in four tiers (primitive, semantic, component, theme) and build
with Style Dictionary 5. CSS variables use the `--sds-` prefix. Themes are separate CSS files
scoped by `[data-theme]`.

## Consequences

Runtime theme switching without rebuilds; one source for every platform. Token renames are
breaking changes.

## Alternatives considered

| Option                             | Why not                                              |
| ---------------------------------- | ---------------------------------------------------- |
| Tailwind config as source of truth | Locks tokens to one tool; not consumable by Figma/AI |
| CSS-in-JS theme objects            | Runtime cost; poor RSC support                       |
