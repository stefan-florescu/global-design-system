# 01 · Repository Architecture

## 1.1 Monorepo strategy

| Concern            | Choice                     | Why                                                                     |
| ------------------ | -------------------------- | ----------------------------------------------------------------------- |
| Package manager    | **pnpm 10** workspaces     | Strict, fast, disk-efficient; `workspace:*` protocol for internal deps  |
| Task orchestration | **Turborepo 2**            | Dependency-aware pipelines, local + Vercel Remote Cache, `turbo-ignore` |
| Versioning         | **Changesets**             | Per-package semver, generated changelogs, release PRs                   |
| Runtime            | **Node 22 LTS** (`.nvmrc`) | Matches Vercel default & GitHub Actions                                 |
| Language           | **TypeScript 5.9 strict**  | Shared presets in `packages/config/typescript`                          |

Principles:

1. **One repo, many packages, one version of each dependency.** Shared tooling lives in
   `packages/config/*` so every package behaves identically.
2. **Strict dependency direction:** `tokens → themes → ui → apps`. Apps never contain design
   decisions; packages never import from apps.
3. **Everything that ships is a package.** Apps are private consumers that dog-food the
   published API exactly as an external product would.
4. **Build what changed.** Turbo hashes inputs; CI and Vercel only rebuild affected graphs.

## 1.2 Folder structure

```
global-design-system/                 # "stefan-design-system"
├── apps/
│   └── storybook/                    # Storybook 10 workbench → Vercel (static)
│       ├── .storybook/               # main.ts, preview.ts, preview.css
│       ├── src/                      # Storybook-only MDX (intro, token playgrounds)
│       └── vercel.json
│
├── packages/
│   ├── tokens/                       # @stefan-florescu/tokens   (published)
│   │   ├── src/primitive|semantic|component/   # DTCG JSON
│   │   └── scripts/build.mjs         # Style Dictionary → build/{css,js,json}
│   ├── themes/                       # @stefan-florescu/themes   (published)
│   │   ├── src/light|dark/           # semantic overrides per theme
│   │   └── scripts/build.mjs         # → build/css/{light,dark,themes}.css
│   ├── ui/                           # @stefan-florescu/ui       (published)
│   │   └── src/{components,hooks,lib}/ + index.ts + styles.css
│   ├── icons/                        # @stefan-florescu/icons    (published) lucide wrapper
│   └── config/
│       ├── typescript/               # @stefan-florescu/typescript-config (private)
│       ├── eslint/                   # @stefan-florescu/eslint-config     (private)
│       └── tailwind/                 # @stefan-florescu/tailwind-config   (private) tokens → @theme
│
├── docs/                             # Architecture plan + ADRs (this folder)
├── .changeset/                       # Pending release notes
├── .github/                          # CI/CD, templates, CODEOWNERS, Copilot instructions
├── .claude/                          # Claude Code settings + cloud SessionStart hook
├── .husky/                           # pre-commit (lint-staged), commit-msg (commitlint)
├── AGENTS.md · CLAUDE.md             # AI agent instructions
├── turbo.json · pnpm-workspace.yaml · package.json
└── .nvmrc · .npmrc · .editorconfig · .prettierrc.json · commitlint.config.mjs
```

### Packages to add later (when they earn their place)

| Package                                 | When                                                                   |
| --------------------------------------- | ---------------------------------------------------------------------- |
| `packages/hooks`                        | When ≥3 non-UI hooks exist (`useControllableState`, …)                 |
| `packages/patterns`                     | Phase D — composed, opinionated building blocks                        |
| `packages/templates` / `apps/templates` | Phase E — full page templates / starter apps                           |
| `packages/figma-sync`                   | When syncing Figma Variables ⇄ tokens (Tokens Studio / REST)           |
| `packages/mcp` (or `apps/mcp`)          | AI phase — MCP server exposing tokens & component metadata             |
| `packages/codemods`                     | First breaking major — automated migrations                            |
| `apps/docs`                             | When guidance outgrows Storybook — Next.js 15 docs site (see ADR 0004) |
| `apps/playground`                       | Optional — sandbox to compose components in a real Next app            |

## 1.3 Package structure

Every publishable package has:

```
package.json   # "type": "module", exports map, files, sideEffects, publishConfig, repository.directory
README.md      # purpose, install, usage, status
src/           # source of truth
build/ | dist/ # generated, git-ignored
eslint.config.js · tsconfig.json
CHANGELOG.md   # generated by Changesets
```

Rules:

- **ESM only**, explicit `exports` map, no deep imports beyond what's exported.
- `sideEffects` lists CSS only so bundlers tree-shake JS.
- `react` / `react-dom` are **peer** dependencies of `ui` and `icons`.
- `ui` output is prefixed with `"use client"` so it works inside RSC apps.

## 1.4 Naming conventions

| Thing                   | Convention                                | Example                                                                     |
| ----------------------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| npm scope               | `@stefan-florescu/*`                      | `@stefan-florescu/ui` (matches GitHub owner → required for GitHub Packages) |
| Package folders         | `kebab-case`, singular noun               | `packages/tokens`, `packages/icons`                                         |
| Component folders/files | `kebab-case`                              | `components/date-picker/date-picker.tsx`                                    |
| Component exports       | `PascalCase`, named only                  | `export function DatePicker`                                                |
| Sub-components          | Parent prefix                             | `DialogTrigger`, `DialogContent`                                            |
| Hooks                   | `use` + `PascalCase`                      | `useControllableState`                                                      |
| Props                   | `camelCase`; booleans as adjectives       | `disabled`, `invalid`, `fullWidth`                                          |
| Variant props           | `variant`, `size`, `tone`                 | `size: "sm" \| "md" \| "lg"`                                                |
| Tokens (JSON path)      | `category.concept.property.variant.state` | `color.action.primary.background.hover`                                     |
| Tokens (CSS)            | `--sds-` + kebab path                     | `--sds-color-action-primary-background-hover`                               |
| Theme names             | lowercase                                 | `light`, `dark`, `high-contrast`, `brand-x`                                 |
| Stories                 | `Category/Name`                           | `Components/Button`, `Foundations/Color`                                    |
| Branches                | `type/short-desc`                         | `feat/button`, `fix/dialog-focus-trap`                                      |
| Commits / PR titles     | Conventional Commits + scope              | `feat(ui): add Button`                                                      |
| ADRs                    | `NNNN-kebab-title.md`                     | `0003-dtcg-token-format.md`                                                 |

`sds` (**S**tefan **D**esign **S**ystem) is the CSS namespace for tokens and any global classes/data attributes.
