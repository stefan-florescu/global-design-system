# @stefan-florescu/themes

## 1.0.0

### Major Changes

- [#23](https://github.com/stefan-florescu/global-design-system/pull/23) [`42df3ea`](https://github.com/stefan-florescu/global-design-system/commit/42df3eab6688cdc5f87f4699a3a7178e9338fdcc) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - First stable release: 1.0.0. The tokens, themes, icons and the full component set (forms, navigation, overlays, feedback and data display) are now considered stable and follow semantic versioning from here on.

### Minor Changes

- [#10](https://github.com/stefan-florescu/global-design-system/pull/10) [`c33206b`](https://github.com/stefan-florescu/global-design-system/commit/c33206bdd169c2a01a013b61fc2e1e2fdf6b6b98) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add the foundation tokens: 8 primitive colour scales (80 hex values) and 48 semantic colour tokens with light and dark themes, plus typography, a 4px spacing scale, border widths, radius, elevation, icon sizes, breakpoints and containers. The themes build exports `themes.json` and `contrast.json` and fails when a checked colour pairing misses WCAG 2.2 AA in any theme. Source DTCG files are exported as `@stefan-florescu/tokens/src/*`.

- [#18](https://github.com/stefan-florescu/global-design-system/pull/18) [`e5216af`](https://github.com/stefan-florescu/global-design-system/commit/e5216af6793d5f869ce8d8e70d6320ff76b15fe4) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - The `input` token (field, checkbox, radio and toggle-track borders) is now gray-200 in light mode and gray-700 in dark mode, for lighter field borders. By design it sits below 3:1 against the page, so the themes build no longer checks it (43 pairings). The `gray.450` primitive, used only by `input`, is removed.

- [#23](https://github.com/stefan-florescu/global-design-system/pull/23) [`42df3ea`](https://github.com/stefan-florescu/global-design-system/commit/42df3eab6688cdc5f87f4699a3a7178e9338fdcc) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - **Breaking:** re-base the foundation on role-based semantic tokens (ADR 0009).
  
  - **Primitives:** Tailwind v4's palette in OKLCH (16 hues, 50–950), plus `gray.450` for field borders.
  - **Semantic colours:** the tokens now use role names, in light and dark: `heading`, `body`, `fg-*`, `neutral-*`, `brand`/`success`/`danger`/`warning` with `-soft`, `-medium` and `-strong`, `default*` borders, and so on. The shadcn-style names (`background`, `muted-foreground`, `destructive`, `info`…) are removed.
  - **Accessibility tokens:** `input` and `ring`, plus the `*-foreground` label colours.
  - **Radius:** `default` 8px, `base` 12px, `lg` 16px, `sm` 6px, `xs` 4px.
  - **Shadows:** Tailwind's, `2xs`–`xl`.
  - **Contrast check:** the themes build checks 43 pairings in both themes.

### Patch Changes

- [#12](https://github.com/stefan-florescu/global-design-system/pull/12) [`cb4d639`](https://github.com/stefan-florescu/global-design-system/commit/cb4d6397a64e93de2cab88d1681f6e4639c360da) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Button` and `buttonVariants()`: brand, primary, secondary, outline, ghost, success, warning, destructive, info and link variants, an `outline` style for filled intents, five sizes (`xs`–`xl`), `pill`, `iconOnly`, `fullWidth` and `loading`. The themes contrast check now also verifies `-subtle-foreground` labels on the page background (34 pairings).
- Updated dependencies [[`c33206b`](https://github.com/stefan-florescu/global-design-system/commit/c33206bdd169c2a01a013b61fc2e1e2fdf6b6b98), [`e5216af`](https://github.com/stefan-florescu/global-design-system/commit/e5216af6793d5f869ce8d8e70d6320ff76b15fe4), [`3c85283`](https://github.com/stefan-florescu/global-design-system/commit/3c85283689ca49df8f3355293808e68dde170576), [`42df3ea`](https://github.com/stefan-florescu/global-design-system/commit/42df3eab6688cdc5f87f4699a3a7178e9338fdcc), [`42df3ea`](https://github.com/stefan-florescu/global-design-system/commit/42df3eab6688cdc5f87f4699a3a7178e9338fdcc)]:
  - @stefan-florescu/tokens@1.0.0
