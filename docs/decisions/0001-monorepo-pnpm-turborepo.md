# 0001 · pnpm + Turborepo monorepo

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

Tokens, themes, components, icons and the docs site evolve together and must release in lockstep.

## Decision

Single repository with pnpm 10 workspaces and Turborepo 2 for task orchestration and caching.
Shared tooling lives in `packages/config/*`.

## Consequences

Atomic cross-package changes, one CI pipeline, remote cache shared with Vercel. Requires
discipline on dependency direction (tokens → themes → ui → apps).

## Alternatives considered

| Option              | Why not                                                              |
| ------------------- | -------------------------------------------------------------------- |
| Polyrepo            | Cross-package changes need coordinated releases                      |
| Nx                  | More powerful but heavier; Turborepo integrates natively with Vercel |
| npm/yarn workspaces | pnpm is stricter (no phantom deps) and faster                        |
