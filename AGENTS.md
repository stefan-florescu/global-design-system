# AGENTS.md — Stefan Design System

Canonical instructions for **all** AI coding agents (Claude Code, GitHub Copilot,
OpenAI Codex/Agents, Cursor, and others). Tool-specific files (`CLAUDE.md`,
`.github/copilot-instructions.md`) point here — edit this file, not those.

## What this repo is

A token-driven, accessible, multi-theme React design system in a pnpm + Turborepo monorepo.

| Path                | Package                                | Purpose                                             |
| ------------------- | -------------------------------------- | --------------------------------------------------- |
| `packages/tokens`   | `@stefan-florescu/tokens`              | DTCG JSON → CSS vars / JS / JSON (Style Dictionary) |
| `packages/themes`   | `@stefan-florescu/themes`              | Per-theme semantic overrides via `[data-theme]`     |
| `packages/ui`       | `@stefan-florescu/ui`                  | React 19 components (Tailwind v4 + CVA)             |
| `packages/icons`    | `@stefan-florescu/icons`               | Governed wrapper over `lucide-react`                |
| `packages/config/*` | `@stefan-florescu/*-config`            | Shared TS / ESLint / Tailwind presets               |
| `apps/site`         | `@stefan-florescu/site` (private)      | Public docs website (Next.js 15, MDX, shadcn-style) |
| `apps/storybook`    | `@stefan-florescu/storybook` (private) | Component workbench                                 |

Dependency direction is strictly **tokens → themes → ui → apps**. Never import "upward".

## Commands

```bash
pnpm install            # Node >= 22, pnpm 10
pnpm dev                # docs site + Storybook + package watchers
pnpm dev:site           # http://localhost:3000
pnpm dev:storybook      # http://localhost:6006
pnpm build | lint | typecheck | test | format
pnpm --filter @stefan-florescu/ui test
pnpm changeset          # required for any change to a published package
```

Before declaring work done, run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

## Non-negotiable rules

1. **Tokens only.** Never hard-code colours, spacing, radii, shadows, font sizes, durations
   or z-indices in components. Use Tailwind utilities mapped to semantic tokens. If a value
   is missing, propose a token — do not inline it.
2. **Components consume semantic or component tokens, never primitives.**
3. **Accessible by default.** Follow the WAI-ARIA Authoring Practices pattern for the
   component; full keyboard support; visible `:focus-visible`; WCAG 2.2 AA contrast;
   respect `prefers-reduced-motion`. Storybook a11y violations are errors.
4. **Styling lives in CVA.** All classes go in `<name>.variants.ts`; components merge
   consumer `className` with `cn()` from `src/lib/cn.ts`.
5. **Icons** come from `@stefan-florescu/icons`, never `lucide-react` directly.
6. **Public API** is `packages/ui/src/index.ts` only. No deep imports.
7. **React 19**: pass `ref` as a prop (no `forwardRef`), function components only,
   no default exports from component files.
8. **Do not create tokens or components unless the task explicitly asks for it.**

## Component file contract

```
packages/ui/src/components/<kebab-name>/
├── <kebab-name>.tsx           # PascalCase export, named only
├── <kebab-name>.variants.ts   # cva() definition + VariantProps type
├── <kebab-name>.test.tsx      # behaviour + a11y (Testing Library, role queries)
├── <kebab-name>.stories.tsx   # title: "Components/<PascalName>"
├── <kebab-name>.mdx           # Storybook usage notes (public docs page lives in apps/site)
├── <kebab-name>.meta.json     # machine-readable metadata (see docs/architecture/07-ai-readiness.md)
└── index.ts
```

## Naming

- Files & folders: `kebab-case`. Components & types: `PascalCase`. Props & hooks: `camelCase`.
- Tokens: dot paths in JSON (`color.action.primary.background`), CSS vars `--sds-color-action-primary-background`.
- Variants: `variant` (visual intent), `size` (`sm | md | lg`), booleans as adjectives (`disabled`, `invalid`).
- Commits: Conventional Commits with a package scope, e.g. `feat(ui): add Button`.

## Where to read more

- `docs/architecture/` — the foundation plan (repo, tokens, foundations, governance, roadmap, docs, AI).
- `docs/decisions/` — ADRs. Check them before proposing architectural changes.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
