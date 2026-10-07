# 0003 · Tailwind CSS v4 + CVA for component styling

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

Components need zero-runtime styling that works in React Server Components and maps cleanly to tokens.

## Decision

Tailwind v4 (CSS-first config). Tokens are exposed to Tailwind only through
`packages/config/tailwind/theme.css` using `@theme inline`. Variants are declared with
`class-variance-authority`; class merging uses `tailwind-merge` via `cn()`.

## Consequences

Consumers must run Tailwind v4 and `@import "@stefan-florescu/ui/styles.css"`. A pre-compiled CSS
build for non-Tailwind consumers can be added later.

## Alternatives considered

| Option                  | Why not                             |
| ----------------------- | ----------------------------------- |
| CSS Modules             | No utility reuse; verbose variants  |
| vanilla-extract / Panda | Extra build step; smaller ecosystem |
