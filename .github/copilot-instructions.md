# Copilot instructions

This repository's canonical agent instructions live in [`AGENTS.md`](../AGENTS.md). Follow it.

Key reminders for inline completions:

- Never hard-code design values; use Tailwind utilities mapped to semantic tokens.
- Put classes in `*.variants.ts` using `cva()`; merge with `cn()`.
- React 19: `ref` is a regular prop; named exports only.
- Icons from `@stefan-florescu/icons` only.
- Tests use Testing Library role-based queries (`getByRole`), never test IDs unless unavoidable.
