# 04 · Governance

## 4.1 Contribution workflow

```
Idea ─► Issue (RFC / token request / bug) ─► Triage ─► Design ─► Build ─► Review ─► Merge ─► Release
```

1. **Open an issue** using a template (`component-proposal`, `token-request`, `bug`).
2. **Triage** (weekly): label (`rfc`, `component`, `tokens`, `a11y`, `breaking`), assign a phase.
3. **Branch** from `main`: `feat/<name>`, `fix/<name>`, `docs/<name>`, `chore/<name>`.
4. **Build** following the component file contract (AGENTS.md). Run locally:
   `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.
5. **Changeset**: `pnpm changeset` for any change to `ui`, `tokens`, `themes`, `icons`.
6. **PR** with the template checklist; title in Conventional Commits (`feat(ui): add Button`).
7. **Checks** (all required): CI verify, PR title, changeset, Vercel preview of the docs site.
8. **Review**: CODEOWNERS approval; design review for anything visual.
9. **Squash-merge** to `main`. Changesets opens/updates the _Version Packages_ PR.
10. **Release** by merging the Version Packages PR → npm + GitHub Packages + changelog.

Branch protection on `main` (configure in GitHub → Settings → Rules):
require PR, 1 approval, required checks (`Lint · Typecheck · Test · Build`, `Changeset present`,
`conventional`), linear history, no force-push.

## 4.2 Component approval process

Components move through explicit **maturity stages**, shown as a badge on the docs site
(`tags: ["experimental"]` etc.) and recorded in `<name>.meta.json`:

| Stage            | Meaning                                   | Gate to enter                                                            |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| **Proposed**     | RFC open                                  | Problem, ≥2 use cases, a11y pattern identified                           |
| **Experimental** | Shipped, API may change in minor releases | Design spec in Figma, docs demos, basic tests, no a11y lint errors       |
| **Beta**         | Used in ≥1 real product, API stabilising  | Full keyboard/SR testing, both themes, docs page, `meta.json` complete   |
| **Stable**       | Semver-protected                          | 2 weeks in beta without API change, visual regression baseline, sign-off |
| **Deprecated**   | Will be removed in next major             | Replacement documented, console warning in dev, codemod if feasible      |

**Definition of Done (Stable):**

- [ ] Uses semantic/component tokens only; works in light & dark
- [ ] WAI-ARIA pattern implemented; keyboard map documented; tested with VoiceOver + NVDA
- [ ] Unit + interaction tests; axe clean; visual regression baseline
- [ ] Docs demos: default, every variant, every state, composition, RTL
- [ ] Docs page: overview, usage do/don't, props table, a11y, content guidance
- [ ] `meta.json` complete; exported from `src/index.ts`; changeset added

## 4.3 Versioning strategy

- **Semantic Versioning** per package, managed by **Changesets**.
- `ui`, `tokens`, `themes`, `icons` are **linked**: they bump together on a given bump level so
  consumers can reason about compatible sets.
- **0.x** during Phases A–B (breaking changes allowed in minors, always documented).
  **1.0.0** when Phase B core components reach Stable.

| Change                                                                              | Bump      |
| ----------------------------------------------------------------------------------- | --------- |
| Remove/rename component, prop, token, CSS var; change default visuals significantly | **major** |
| New component, prop, variant, token, theme                                          | minor     |
| Bug fix, a11y fix, value tweak within the same intent                               | patch     |

- **Pre-releases:** `pnpm changeset pre enter next` → `x.y.z-next.N` on the `next` dist-tag.
- **Deprecation policy:** deprecate in a minor, remove no earlier than the next major,
  with migration notes and a codemod when feasible.
- **Support:** latest major + previous major for critical fixes.

## 4.4 Documentation standards

- Every published package has a `README.md`; every component has `.mdx` + `.meta.json`.
- Docs are written in **MDX**, plain language, second person, present tense.
- Every component page uses the same template (see 06 · Documentation Architecture).
- Every token has a `$description`; every prop has a TSDoc comment (feeds the props table and AI).
- Architecturally significant decisions get an **ADR** in `docs/decisions/` (template provided).
- Docs PRs are reviewed like code; docs are part of the Definition of Done, not a follow-up.
