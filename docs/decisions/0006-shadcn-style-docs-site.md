# 0006 · Custom shadcn-style docs site (`apps/site`)

- **Status:** Accepted
- **Date:** 2026-10-08

## Context

The public documentation should look and work like ui.shadcn.com: a header with logo, version,
top menu (Components, Changelog), search and theme toggle; a three-column body with a sidebar,
the page content and "On this page" anchors. Storybook's interface has a fixed sidebar + canvas
layout and cannot provide a top menu, header search or a page-level anchor rail.

## Decision

Build a custom site in `apps/site` with Next.js 15 (App Router), Tailwind CSS v4 and MDX:

- Pages are MDX under `app/(docs)/`; navigation is a single config (`lib/navigation.ts`).
- Live examples live in `registry/demos/*.tsx`; `<ComponentPreview>` renders them and shows
  their real source, highlighted with Shiki at build time.
- Theme uses `next-themes` with `data-theme`, matching `@stefan-florescu/themes`.
- Storybook remains the internal workbench (states, controls, a11y checks).
- All pages are statically generated.

## Consequences

Full control of the docs experience and a second Vercel project to maintain. Until Phase A
tokens exist, the site uses an interim neutral palette with the same semantic names, so switching
to real tokens needs no markup changes.

## Alternatives considered

| Option                            | Why not                                                           |
| --------------------------------- | ----------------------------------------------------------------- |
| Restyle Storybook                 | No top menu, header search or anchor rail; limited layout control |
| Docs framework (Fumadocs, Nextra) | Faster start but harder to match the shadcn layout exactly        |
