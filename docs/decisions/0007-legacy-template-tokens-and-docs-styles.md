# 0007 · Adopt the documentation template's tokens and styles

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

A reference HTML documentation template defined the target look of the docs site and a complete
token set: the Flowbite colour palette (8 scales, 50–900, hex), shadcn-style semantic colour names
(`background`, `muted-foreground`, `brand-subtle`…) with a dark theme, and scales for typography,
spacing, border, radius, elevation, icons and layout. The site had to match it exactly while
keeping our header, routing and package architecture.

## Decision

- The template's tokens become `@stefan-florescu/tokens` (DTCG), replacing the earlier OKLCH set.
  Names keep our `--sds-` prefix (`--sds-color-background`, `--sds-space-6`) to avoid collisions
  with Tailwind's own variables (`--text-sm`, `--radius-md`…) in consuming apps.
- Colour and elevation are themable; the other scales are theme-independent.
- The template's stylesheet is ported to `apps/storybook/app/docs.css`, with every value mapped to
  `--sds-*` tokens and all rules inside cascade layers so Tailwind utilities still win.
- Its markup is rebuilt as React components (sidebar, table of contents, pager, page header, code
  block, tabs); repetitive data (colour scales, token tables) renders from the token files.
- Icons are lucide imports with a 1.5 stroke (`--sds-icon-stroke`).

## Consequences

- The docs site and the token packages share one source of truth; changing a token restyles both.
- The contrast check now covers the template's pairings (29 in both themes).
- Token names differ from the template's unprefixed names; docs show the short semantic name in
  tables and the full `--sds-color-{name}` variable in prose and code.
