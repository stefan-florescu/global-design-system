# 08 · Environments & Deployment

| Environment | Where                              | Purpose                              |
| ----------- | ---------------------------------- | ------------------------------------ |
| Local       | Your machine                       | Day-to-day development               |
| Cloud dev   | Claude Code on the web, Codespaces | Develop from anywhere, AI agents     |
| CI          | GitHub Actions                     | Verify every PR, release on `main`   |
| Preview     | Vercel (per PR / branch)           | Review the docs site for each change |
| Production  | Vercel (`main`)                    | Public docs site                     |
| Registry    | npmjs.com + GitHub Packages        | Consumable packages                  |

## 8.1 Local

```bash
# prerequisites: Node 22 (nvm use), pnpm 10 (corepack enable)
git clone git@github.com:stefan-florescu/global-design-system.git
cd global-design-system
corepack enable && pnpm install     # also installs husky git hooks
pnpm dev                            # docs site :3000
```

Useful: `pnpm dev:storybook`, `pnpm build`, `pnpm --filter @stefan-florescu/ui test:watch`.
VS Code extensions are recommended in `.vscode/extensions.json`.

## 8.2 Cloud development

- **Claude Code (web/cloud):** `.claude/hooks/session-start.sh` runs `pnpm install` and builds
  packages automatically when `CLAUDE_CODE_REMOTE=true`.
- **GitHub Codespaces:** works out of the box with Node 22 image; add a `.devcontainer` later if needed.

## 8.3 GitHub — one-time setup checklist

1. **Default branch:** create `main` and set it as default.
2. **Branch protection / ruleset on `main`:** require PR + 1 approval; required checks
   `Lint · Typecheck · Test · Build`, `Changeset present`, `conventional`; block force-push.
3. **Actions → General:** _Workflow permissions_ = read & write; allow Actions to create PRs
   (needed by the Changesets "Version Packages" PR).
4. **Secrets & variables (Settings → Secrets and variables → Actions):**

   | Name          | Type     | Required   | Purpose                                                                                                                                              |
   | ------------- | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `NPM_TOKEN`   | secret   | to publish | npm granular _automation_ token with publish rights to `@stefan-florescu` (or configure npm **Trusted Publishing** for this repo and drop the token) |
   | `TURBO_TOKEN` | secret   | optional   | Vercel access token → Turborepo Remote Cache in CI                                                                                                   |
   | `TURBO_TEAM`  | variable | optional   | Vercel team slug for Remote Cache                                                                                                                    |

   `GITHUB_TOKEN` (automatic) publishes to GitHub Packages.

5. **Merge settings:** squash merge only; auto-delete head branches.
6. **Dependabot** is configured in `.github/dependabot.yml` (weekly, grouped).

## 8.4 npm — one-time setup

1. Create an npm account/org that owns the **`@stefan-florescu`** scope
   (npm user `stefan-florescu`, or an org of that name).
2. Create a granular access token → add as `NPM_TOKEN`, **or** enable Trusted Publishing for
   `stefan-florescu/global-design-system` / `release.yml` on each package once it exists.
3. First publish happens automatically when the first _Version Packages_ PR is merged.

Consumers of GitHub Packages add to their `.npmrc`:

```
@stefan-florescu:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## 8.5 Vercel — the launcher project

One Vercel project, linked to this GitHub repo, serves the whole website: the launcher at `/` and
every app as a section of it, such as the docs site at `/design-system`, the task board at
`/task-board` and the price tracker at `/price-tracker`
([ADR 0010](../decisions/0010-apps-as-launcher-sections.md)).

| Setting                              | Value                                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| Production URL                       | https://stefan-flo.vercel.app                                                            |
| Root Directory                       | `apps/launcher`                                                                          |
| Framework & build                    | from `apps/launcher/vercel.json` (output `.next`)                                        |
| Node.js version                      | 22.x                                                                                     |
| Include files outside root directory | ✅ enabled (default for monorepos)                                                       |
| Ignored build step                   | `npx turbo-ignore` (in `vercel.json`) — skips deploys when nothing it depends on changed |
| Production branch                    | `main`                                                                                   |

The build (`turbo run build --filter=@stefan-florescu/launcher`) builds the section apps first,
as static exports; the launcher copies each into `public/<section>` (`apps/launcher/sections.mjs`)
and serves its pages from there. Every PR gets a preview URL from the Vercel bot; `main` deploys
to production.

### The price tracker's backend — Supabase

The price tracker's pages are static like every section; accounts, data and price checks live in
a Supabase project ([ADR 0011](../decisions/0011-price-tracker-backend-on-supabase.md)).

| Piece                         | Where                                                                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project URL and key           | `apps/price-tracker/lib/supabase-config.ts` (publishable key; overridable with `NEXT_PUBLIC_SUPABASE_*`)                                                       |
| Database                      | `apps/price-tracker/supabase/migrations` — `pt_` tables with row-level security                                                                                |
| Edge Function `price-tracker` | code in `apps/price-tracker/server`; bundle with `pnpm --filter @stefan-florescu/price-tracker build:function`, then deploy `supabase/functions/price-tracker` |
| Scheduled checks              | pg_cron job `price-tracker-check-due`, every 15 minutes                                                                                                        |
| Function secrets              | `SCRAPER_URL_TEMPLATE` (optional): a scraping service for stores that block plain requests                                                                     |
| Auth URLs                     | Site URL `https://stefan-flo.vercel.app/price-tracker/`; redirect URLs for it, previews and `http://localhost:3003/price-tracker/**`                           |

Enable **Vercel Remote Cache** (Team → Settings → Remote Caching) and reuse it in CI via `TURBO_TOKEN`.

## 8.6 Release flow

```
PR (with changeset) ─► merge to main ─► release.yml
                                        ├─ pending changesets? → open/update "Version Packages" PR
                                        └─ Version PR merged?  → build → npm publish (provenance)
                                                                     → mirror to GitHub Packages
                                                                     → git tags + GitHub Releases
```
