# 0004 · Separate docs site (Next.js) and Storybook workbench

- **Status:** Accepted — see the 2026-10-08 update and ADR 0006
- **Date:** 2026-10-07

## Context

Designers and product teams need curated guidance (shadcn-style); engineers need an isolated
workbench with every state, controls and a11y checks.

## Decision

`apps/docs` (Next.js 15, App Router, MDX) for guidance; `apps/storybook` (Storybook 10, Vite)
for the workbench. Both consume stories/MDX/metadata colocated in `packages/ui`. Two Vercel projects.

## Consequences

Two deploys to maintain, but each tool does what it is best at and neither drifts from code.

## Update 2026-10-07

`apps/docs` was removed to focus on a single surface. Storybook hosts foundations and usage docs
as MDX until the guidance outgrows it; the split above remains the target architecture.

## Update 2026-10-08

The docs site is back as `apps/site` — see [ADR 0006](0006-shadcn-style-docs-site.md).
