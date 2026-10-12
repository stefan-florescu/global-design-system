# 0010 · Apps are static sections of the launcher

- **Status:** Accepted
- **Date:** 2026-10-12
- **Deciders:** @stefan-florescu

## Context

`apps/launcher` is a directory of websites: one card per app. Clicking a card should open the
app as a page of the same website (`stefan-flo.vercel.app/design-system`), not another domain,
and every future app should work the same way. Until now the docs site deployed as its own
Vercel project (`sds-storybook`, [0006](0006-shadcn-style-docs-site.md)).

## Decision

One website, one Vercel project: the launcher. Each app keeps its own folder in `apps/` and is
built as a static Next.js export (`output: "export"`) with a `basePath` matching its section
(`/design-system` for `apps/storybook`). The launcher depends on those apps, so Turborepo builds
them first; its build copies each export into `public/<section>`
(`apps/launcher/sections.mjs`, `scripts/copy-sections.mjs`) and rewrites
`/<section>/<page>` to the copied `<page>.html`. In development the launcher forwards
`/<section>` to the app's own dev server instead.

## Consequences

- Visitors see one site; each app's pages, scripts and images are served from the launcher's
  deployment. The `sds-storybook` Vercel project is no longer needed.
- Section apps must be fully static: no route handlers, middleware, server actions or
  per-request rendering, and no `redirects`/`rewrites` in their `next.config`.
- Links inside an app use `next/link` (which adds the `basePath`); plain `<a href>` and
  public-file paths must include the section path.
- Any change to a section app redeploys the launcher, and its build includes every section.

## Alternatives considered

| Option                                  | Why not                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Next.js multi-zones (one project each)  | Every app needs its own Vercel project and production domain for the launcher to forward to.      |
| Merge every app into the launcher's app | Mixes unrelated apps into one codebase and one router; each app loses its own layout and tooling. |
| Link out to each app's own domain       | Each app opens on a different address instead of as a page of the launcher.                       |
