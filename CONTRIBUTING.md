# Contributing

The full process is in [`docs/architecture/04-governance.md`](docs/architecture/04-governance.md).
The short version:

1. Open an issue from a template (component proposal, token request, bug).
2. Branch from `main`: `feat/…`, `fix/…`, `docs/…`, `chore/…`.
3. Follow the conventions in [`AGENTS.md`](AGENTS.md) (they apply to humans too).
4. Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
5. Add a changeset (`pnpm changeset`) if you touched `ui`, `tokens`, `themes` or `icons`.
6. Open a PR with a Conventional Commit title, e.g. `feat(ui): add Button`.
