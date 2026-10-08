# Stefan Design System

Token-driven · component-based · accessible by default · multi-theme · AI-friendly.

| Package                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `@stefan-florescu/tokens` | Design tokens (W3C DTCG → Style Dictionary)       |
| `@stefan-florescu/themes` | Light / dark (and future) themes via `data-theme` |
| `@stefan-florescu/ui`     | React 19 components — Tailwind CSS v4 + CVA       |
| `@stefan-florescu/icons`  | Governed lucide.dev icon layer                    |

| App              | Stack                                     | Local                 |
| ---------------- | ----------------------------------------- | --------------------- |
| `apps/storybook` | Next.js 15 · MDX docs site (shadcn-style) | http://localhost:3000 |

## Quick start

```bash
corepack enable
pnpm install
pnpm dev
```

| Command          | Does                                         |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | Run the docs site (`apps/storybook`)         |
| `pnpm build`     | Build every package and app (Turborepo)      |
| `pnpm lint`      | ESLint (incl. jsx-a11y strict)               |
| `pnpm typecheck` | TypeScript strict                            |
| `pnpm test`      | Vitest                                       |
| `pnpm format`    | Prettier                                     |
| `pnpm changeset` | Record a release note for published packages |

## Documentation

- **Foundation plan:** [`docs/`](docs/README.md) — repository, tokens, foundations, governance,
  roadmap, documentation architecture, AI readiness, environments & deployment.
- **Decisions:** [`docs/decisions/`](docs/decisions/)
- **Contributing:** [`CONTRIBUTING.md`](CONTRIBUTING.md)
- **AI agents:** [`AGENTS.md`](AGENTS.md)

## Status

Phase 0 (environment & architecture) complete. Tokens and components start in Phase A.
