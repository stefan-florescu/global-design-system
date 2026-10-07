# Changesets

Every PR that changes a **published** package (`ui`, `tokens`, `themes`, `icons`) must include a changeset:

```bash
pnpm changeset
```

Pick the affected packages, the semver bump, and write a consumer-facing summary.
See `docs/architecture/04-governance.md` for the versioning policy.
