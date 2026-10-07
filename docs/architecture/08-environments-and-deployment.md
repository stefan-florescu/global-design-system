# 08 · Environments & Deployment

| Environment | Where                              | Purpose                                 |
| ----------- | ---------------------------------- | --------------------------------------- |
| Local       | Your machine                       | Day-to-day development                  |
| Cloud dev   | Claude Code on the web, Codespaces | Develop from anywhere, AI agents        |
| CI          | GitHub Actions                     | Verify every PR, release on `main`      |
| Preview     | Vercel (per PR / branch)           | Review docs + Storybook for each change |
| Production  | Vercel (`main`)                    | Public docs + Storybook                 |
| Registry    | npmjs.com + GitHub Packages        | Consumable packages                     |

## 8.1 Local

```bash
# prerequisites: Node 22 (nvm use), pnpm 10 (corepack enable)
git clone git@github.com:stefan-florescu/global-design-system.git
cd global-design-system
corepack enable && pnpm install     # also installs husky git hooks
pnpm dev                            # docs :3000 + storybook :6006
```

Useful: `pnpm dev:docs`, `pnpm dev:storybook`, `pnpm build`, `pnpm --filter @stefan-florescu/ui test:watch`.
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

## 8.5 Vercel — two projects from one repo

Import the GitHub repo **twice** in Vercel (New Project → Import → same repo):

| Setting                                | Docs project                                                                                        | Storybook project                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Project name                           | `sds-docs`                                                                                          | `sds-storybook`                                        |
| Root Directory                         | `apps/docs`                                                                                         | `apps/storybook`                                       |
| Framework preset                       | Next.js                                                                                             | Other                                                  |
| Build / Output                         | from `apps/docs/vercel.json`                                                                        | from `apps/storybook/vercel.json` (`storybook-static`) |
| Node.js version                        | 22.x                                                                                                | 22.x                                                   |
| "Include files outside root directory" | ✅ enabled (default for monorepos)                                                                  | ✅ enabled                                             |
| Ignored build step                     | `npx turbo-ignore` (in `vercel.json`) — skips deploys when the app's dependency graph didn't change |
| Domains (suggested)                    | `design.<your-domain>`                                                                              | `storybook.<your-domain>`                              |

Environment variables (both projects, all environments):
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STORYBOOK_URL` (so docs can link to Storybook and vice-versa).

Every PR then gets two preview URLs posted by the Vercel bot; `main` deploys to production.
Enable **Vercel Remote Cache** (Team → Settings → Remote Caching) and reuse it in CI via `TURBO_TOKEN`.

## 8.6 Release flow

```
PR (with changeset) ─► merge to main ─► release.yml
                                        ├─ pending changesets? → open/update "Version Packages" PR
                                        └─ Version PR merged?  → build → npm publish (provenance)
                                                                     → mirror to GitHub Packages
                                                                     → git tags + GitHub Releases
```
