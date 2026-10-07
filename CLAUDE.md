# CLAUDE.md

@AGENTS.md

## Claude Code specifics

- Cloud sessions run `.claude/hooks/session-start.sh` to install dependencies and build
  token/theme outputs so lint, typecheck and tests work immediately.
- Prefer `pnpm --filter <package>` for scoped commands to keep feedback loops fast.
- When adding a component, use the contract in AGENTS.md and update `packages/ui/src/index.ts`.
