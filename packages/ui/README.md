# @stefan-florescu/ui

React 19 component library. Tailwind CSS v4 + CVA for styling; all visual values come from
`@stefan-florescu/tokens` via semantic CSS variables.

## Usage

```bash
pnpm add @stefan-florescu/ui @stefan-florescu/tokens @stefan-florescu/themes
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@stefan-florescu/ui/styles.css";
```

## Component folder contract

```
src/components/button/
├── button.tsx            # implementation (forwards ref via React 19 `ref` prop)
├── button.variants.ts    # CVA definition — the only place classes live
├── button.test.tsx       # Vitest + Testing Library (behaviour + a11y)
├── button.stories.tsx    # Storybook stories (rendered by apps/storybook)
├── button.mdx            # usage docs (rendered by Storybook)
├── button.meta.json      # machine-readable metadata for AI agents & docs
└── index.ts              # public exports
```

> Status: **scaffold only** — no components yet. See `docs/architecture/05-component-roadmap.md`.
