# 07 · AI Readiness

Goal: any AI assistant can **discover, use and extend** the system correctly on the first try —
and is stopped by tooling when it doesn't.

## 7.1 Principles

1. **One canonical instruction file** — `AGENTS.md` (open standard read by OpenAI Codex/Agents,
   Cursor, Copilot coding agent, Gemini, Jules, and others). Tool-specific files point to it.
2. **Structure over prose** — predictable file contracts and naming let agents pattern-match.
3. **Machine-readable metadata** next to every component and token.
4. **Guardrails in tooling, not hope** — lint, types and tests catch what instructions miss.
5. **Small, local context** — colocated files, scoped instructions, short READMEs per package.

## 7.2 Files in this repo

| File                                               | Consumed by                                               |
| -------------------------------------------------- | --------------------------------------------------------- |
| `AGENTS.md`                                        | All agents (canonical)                                    |
| `CLAUDE.md` (imports `@AGENTS.md`)                 | Claude Code                                               |
| `.claude/settings.json` + `hooks/session-start.sh` | Claude Code (cloud sessions auto-setup, allowed commands) |
| `.github/copilot-instructions.md`                  | GitHub Copilot (chat, agent, review)                      |
| `.github/instructions/*.instructions.md`           | Copilot path-scoped rules (`applyTo`)                     |
| `packages/*/README.md`                             | Everyone, incl. agents                                    |
| `docs/architecture/*`, `docs/decisions/*`          | Deep context for planning agents                          |

Future: `.cursor/rules/*.mdc` only if needed (Cursor already reads `AGENTS.md`).

## 7.3 Component metadata (`<name>.meta.json`)

```json
{
  "$schema": "../../../schemas/component-meta.schema.json",
  "name": "Button",
  "status": "beta",
  "description": "Triggers an action or event.",
  "category": "actions",
  "import": "import { Button } from \"@stefan-florescu/ui\";",
  "ariaPattern": "https://www.w3.org/WAI/ARIA/apg/patterns/button/",
  "props": "generated",
  "variants": {
    "variant": ["primary", "secondary", "ghost", "danger"],
    "size": ["sm", "md", "lg"]
  },
  "tokens": ["button.primary.background", "color.border.focus"],
  "useWhen": ["Submitting a form", "Starting a primary action"],
  "avoidWhen": ["Navigating to another page — use Link"],
  "related": ["IconButton", "Link"],
  "examples": ["button.stories.tsx#Primary"]
}
```

A JSON Schema (`schemas/component-meta.schema.json`, Phase B) validates these in CI.

## 7.4 Distribution to agents outside this repo

| Channel                              | What it provides                                                                                                 | Phase |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ----- |
| `tokens.json` in the npm package     | Full token tree with descriptions                                                                                | A     |
| Typed exports + TSDoc in `.d.ts`     | Props, variants, docs inside the editor for Copilot/Claude                                                       | B     |
| `llms.txt` / `llms-full.txt` on docs | Concise index + full text of docs for LLMs                                                                       | B     |
| `/<page>.md` endpoints on docs       | Clean Markdown per page                                                                                          | B     |
| **MCP server** (`packages/mcp`)      | Tools: `list_components`, `get_component`, `search_tokens`, `get_pattern` for Claude, Copilot, OpenAI Agents SDK | C     |
| shadcn-compatible **registry** JSON  | `npx shadcn add <url>` style copy-in of components/templates                                                     | D     |

## 7.5 Guardrails

- ESLint: forbid arbitrary Tailwind values and primitive colour classes in `packages/ui` (Phase A),
  forbid `lucide-react` imports outside `packages/icons`, jsx-a11y **strict**.
- TypeScript strict + `noUncheckedIndexedAccess`.
- Storybook a11y = error; Vitest; visual regression (Phase B).
- Required changeset and Conventional Commit titles make AI-authored PRs reviewable.
- Copilot code review / Claude Code GitHub Action can be enabled to review PRs against `AGENTS.md`.

## 7.6 Prompting conventions for contributors

- Reference the contract: _"Create `Badge` following the component file contract in AGENTS.md."_
- Point to an exemplar: _"Mirror `button/` structure and tests."_
- Always finish with: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
