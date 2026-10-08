# 0006 · One shadcn-style docs site in `apps/storybook`

- **Status:** Accepted
- **Date:** 2026-10-08
- **Supersedes:** [0004](0004-docs-and-storybook-split.md)

## Context

The documentation should look and work like ui.shadcn.com: a header with logo, version, top menu
(Components, Changelog), search and theme toggle; a three-column body with a sidebar, the page
content and "On this page" anchors. The Storybook tool has a fixed sidebar + canvas layout and
cannot provide this. Running both a docs site and Storybook would mean two surfaces to maintain.

## Decision

Replace the Storybook tool with a single custom site, built with Next.js 15 (App Router),
Tailwind CSS v4 and MDX. It lives in `apps/storybook` (package `@stefan-florescu/storybook`): the
folder keeps that name, but it does not use the Storybook tool.

- Pages are MDX under `app/(docs)/`; navigation is a single config (`lib/navigation.ts`).
- Live examples live in `registry/demos/*.tsx`; `<ComponentPreview>` renders them and shows
  their real source, highlighted with Shiki at build time.
- Theme uses `next-themes` with `data-theme`, matching `@stefan-florescu/themes`.
- All pages are statically generated; one Vercel project (`sds-storybook`).

## Consequences

- One surface to maintain, with full control of the docs experience.
- Storybook's built-in workbench features are gone: the a11y panel, controls and interaction
  tests. Accessibility is enforced by `jsx-a11y` (strict) lint now; axe assertions in Vitest and
  visual regression tests are planned for Phase B.
- Until Phase A tokens exist, the site uses an interim neutral palette with the same semantic
  names, so switching to real tokens needs no markup changes.

## Alternatives considered

| Option                             | Why not                                                           |
| ---------------------------------- | ----------------------------------------------------------------- |
| Restyle the Storybook tool         | No top menu, header search or anchor rail; limited layout control |
| Docs site + Storybook side by side | Two surfaces and two deploys to maintain                          |
| Docs framework (Fumadocs, Nextra)  | Harder to match the shadcn layout exactly                         |
