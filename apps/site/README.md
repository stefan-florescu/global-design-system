# @stefan-florescu/site

The public documentation website (Next.js 15 · React 19 · Tailwind CSS v4 · MDX), styled after
ui.shadcn.com.

```bash
pnpm dev:site   # http://localhost:3000
```

## Structure

| Path                     | What                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| `app/(docs)/**/page.mdx` | Documentation pages (Foundation, Components, Changelog)           |
| `app/(docs)/layout.tsx`  | Sidebar · content · "On this page" layout                         |
| `lib/navigation.ts`      | Single source for the top menu, sidebar, search and pager         |
| `components/`            | Site chrome (header, search, theme toggle, TOC, code blocks…)     |
| `registry/demos/*.tsx`   | Live examples used by `<ComponentPreview name="…" />`             |
| `registry/placeholder/`  | Docs-only stand-ins until the real components ship — delete later |
| `mdx-components.tsx`     | Typography and components available in every MDX page             |

## Adding a page

1. Create `app/(docs)/<section>/<slug>/page.mdx` with `export const metadata = { title, description }`
   and `<PageHeader {...metadata} section="…" />`.
2. Add it to `lib/navigation.ts` — the sidebar, search and pager update automatically.
3. Use `##` / `###` headings; they populate "On this page" automatically.

## Colours

`app/globals.css` defines an interim neutral palette under the same semantic names the design
system will expose. Remove it once `@stefan-florescu/tokens` and `themes` provide those tokens.
