# @stefan-florescu/tokens

## 0.1.0

### Minor Changes

- [#10](https://github.com/stefan-florescu/global-design-system/pull/10) [`c33206b`](https://github.com/stefan-florescu/global-design-system/commit/c33206bdd169c2a01a013b61fc2e1e2fdf6b6b98) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add the foundation tokens: 8 primitive colour scales (80 Flowbite hex values) and 48 semantic colour tokens with light and dark themes, plus typography, a 4px spacing scale, border widths, radius, elevation, icon sizes, breakpoints and containers. The themes build exports `themes.json` and `contrast.json` and fails when a checked colour pairing misses WCAG 2.2 AA in any theme. Source DTCG files are exported as `@stefan-florescu/tokens/src/*`.

- [#16](https://github.com/stefan-florescu/global-design-system/pull/16) [`ab53f6a`](https://github.com/stefan-florescu/global-design-system/commit/ab53f6aa5cc87ea3bbae708541d9e23ed29f150c) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - **Breaking:** re-base the foundation on Flowbite v4 (ADR 0009).
  
  - **Primitives:** Tailwind v4's palette in OKLCH (16 hues, 50–950), plus `gray.450` for field borders.
  - **Semantic colours:** the tokens now use Flowbite v4's role names, in light and dark: `heading`, `body`, `fg-*`, `neutral-*`, `brand`/`success`/`danger`/`warning` with `-soft`, `-medium` and `-strong`, `default*` borders, and so on. The shadcn-style names (`background`, `muted-foreground`, `destructive`, `info`…) are removed.
  - **Accessibility tokens:** `input` and `ring`, plus the `*-foreground` label colours.
  - **Radius:** follows Flowbite: `default` 8px, `base` 12px, `lg` 16px, `sm` 6px, `xs` 4px.
  - **Shadows:** Tailwind's, `2xs`–`xl`.
  - **Contrast check:** the themes build checks 46 pairings in both themes.

- [#18](https://github.com/stefan-florescu/global-design-system/pull/18) [`e5216af`](https://github.com/stefan-florescu/global-design-system/commit/e5216af6793d5f869ce8d8e70d6320ff76b15fe4) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - The `input` token (field, checkbox, radio and toggle-track borders) is now Flowbite's gray-200 in light mode and gray-700 in dark mode. By request it sits below 3:1 against the page, so the themes build no longer checks it (43 pairings). The `gray.450` primitive, used only by `input`, is removed.

- [#14](https://github.com/stefan-florescu/global-design-system/pull/14) [`3c85283`](https://github.com/stefan-florescu/global-design-system/commit/3c85283689ca49df8f3355293808e68dde170576) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add layer tokens (`--sds-z-base` … `--sds-z-skip-link`) with matching `z-*` Tailwind utilities. `Banner` and `BottomNavigation` now sit on the `z.fixed` layer when pinned to the viewport.
