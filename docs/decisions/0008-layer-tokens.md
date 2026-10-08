# 0008 · Layer (z-index) tokens

- **Status:** Accepted
- **Date:** 2026-10-08
- **Deciders:** @stefan-florescu

## Context

`Banner` and `BottomNavigation` are fixed to the viewport and must sit above positioned page
content. AGENTS.md forbids hard-coded z-indices, and the token set had no layer scale, so these
components shipped without a z-index. The docs site also used raw values (40, 45, 100). Upcoming
components — dropdowns, dialogs, drawers, popovers, toasts, tooltips — all need a predictable
stacking order relative to each other.

## Decision

Add a semantic, theme-independent layer scale in `packages/tokens/src/semantic/layer.json`:

| Token         | Value | For                                   |
| ------------- | ----- | ------------------------------------- |
| `z.base`      | 0     | Normal flow                           |
| `z.raised`    | 10    | Lifting an element above its siblings |
| `z.dropdown`  | 1000  | Menus and listboxes                   |
| `z.sticky`    | 1100  | Sticky headers and toolbars           |
| `z.fixed`     | 1200  | Banners, bottom navigation            |
| `z.overlay`   | 1300  | Backdrops                             |
| `z.modal`     | 1400  | Dialogs and drawers                   |
| `z.popover`   | 1500  | Popovers (can open inside a dialog)   |
| `z.toast`     | 1600  | Toasts                                |
| `z.tooltip`   | 1700  | Tooltips                              |
| `z.skip-link` | 1800  | The skip link, above everything       |

They are emitted as `--sds-z-*` and mapped to Tailwind's `--z-index-*` theme namespace, so
components use `z-fixed`, `z-modal`… Components and apps never use raw z-index numbers.

## Consequences

- One ordering for every overlay; new components pick a layer by purpose instead of guessing.
- Gaps of 100 leave room for new layers without renumbering.
- Layers only compete within a stacking context. Components that render overlays should portal
  them or use the native `<dialog>` top layer; documented on the Spacing & layout page.
- Values are not themable (they live in `semantic/`, not in a theme override).

## Alternatives considered

| Option                              | Why not                                                      |
| ----------------------------------- | ------------------------------------------------------------ |
| Tailwind's numeric `z-10`…`z-50`    | Raw numbers with no meaning; violates the tokens-only rule   |
| Consumers add z-index per app       | Every app reinvents the order; overlays from the DS collide  |
| Component tokens (`banner.z-index`) | Too granular; layers are a cross-component ordering decision |
