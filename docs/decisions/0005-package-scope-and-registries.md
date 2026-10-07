# 0005 · `@stefan-florescu` scope, dual publish to npm and GitHub Packages

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

Packages must be installable publicly (npm) and from GitHub Packages. GitHub Packages requires
the npm scope to match the GitHub owner.

## Decision

Scope all packages `@stefan-florescu/*`. Changesets publishes to npm (with provenance); the release
workflow mirrors the same versions to GitHub Packages.

## Consequences

The npm scope `@stefan-florescu` must be owned on npmjs.com. Renaming the scope later is a breaking change.
