# 0004 · Separate docs site (Next.js) and Storybook workbench

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

Designers and product teams need curated guidance (shadcn-style); engineers need an isolated
workbench with every state, controls and a11y checks.

## Decision

`apps/docs` (Next.js 15, App Router, MDX) for guidance; `apps/storybook` (Storybook 10, Vite)
for the workbench. Both consume stories/MDX/metadata colocated in `packages/ui`. Two Vercel projects.

## Consequences

Two deploys to maintain, but each tool does what it is best at and neither drifts from code.
