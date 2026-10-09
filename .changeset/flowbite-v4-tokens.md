---
"@stefan-florescu/tokens": minor
"@stefan-florescu/themes": minor
---

**Breaking:** re-base the foundation on Flowbite v4 (ADR 0009).

- **Primitives:** Tailwind v4's palette in OKLCH (16 hues, 50–950), plus `gray.450` for field borders.
- **Semantic colours:** the tokens now use Flowbite v4's role names, in light and dark: `heading`, `body`, `fg-*`, `neutral-*`, `brand`/`success`/`danger`/`warning` with `-soft`, `-medium` and `-strong`, `default*` borders, and so on. The shadcn-style names (`background`, `muted-foreground`, `destructive`, `info`…) are removed.
- **Accessibility tokens:** `input` and `ring`, plus the `*-foreground` label colours.
- **Radius:** follows Flowbite: `default` 8px, `base` 12px, `lg` 16px, `sm` 6px, `xs` 4px.
- **Shadows:** Tailwind's, `2xs`–`xl`.
- **Contrast check:** the themes build checks 46 pairings in both themes.
