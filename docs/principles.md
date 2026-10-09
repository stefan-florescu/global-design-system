# Design Principles

> The principles every decision in the Stefan Design System is measured against — by designers,
> engineers and AI agents alike. When a choice is unclear, come back here.

## Vision

**A scalable, token-driven design system that lets teams build accessible, consistent and fast
web applications — with less effort every time it is used.**

Every visual decision is expressed once, as a token, and flows automatically to every component,
theme and product. Teams spend their time on product problems, not on re-solving buttons, colour
contrast or spacing. The system grows by adding to a stable core, never by forking it.

### What success looks like

- A new product can go from empty repo to on-brand, accessible UI in a day.
- Changing a brand colour or adding a theme is a token change, not a code change.
- Every component works with keyboard and screen reader out of the box.
- Upgrading the system is boring: documented, versioned, and automated where possible.
- Humans and AI assistants produce the same correct result from the same documentation.

---

## The principles

| #   | Principle                | In one sentence                                                |
| --- | ------------------------ | -------------------------------------------------------------- |
| 1   | **Consistency**          | The same problem is always solved the same way.                |
| 2   | **Accessibility**        | Everyone can use what we build — by default, not by effort.    |
| 3   | **Scalability**          | The system grows by composition and tokens, not by exceptions. |
| 4   | **Developer experience** | The right thing is the easy thing.                             |
| 5   | **Performance**          | Nothing we ship makes a product slower than it needs to be.    |

---

### 1. Consistency

**The same problem is always solved the same way.**

Consistency builds trust and learnability for users, and predictability for the people building
with the system. It comes from shared decisions, not from copying pixels.

**In practice**

- All visual values come from **semantic tokens**. If a value is missing, we add a token — we
  never inline a one-off.
- One component per job. Before creating something new, check whether an existing component,
  variant or composition already solves it.
- Shared vocabulary across design, code and docs: the same names in Figma, tokens, props and
  documentation (`variant`, `size`, `disabled`, `invalid`…).
- Interaction patterns behave identically everywhere: focus, hover, disabled, loading, error and
  empty states follow one specification.
- Content follows the voice-and-tone guidelines: same terms, same capitalisation, same tone.

**We avoid**

- Hard-coded colours, spacing, radii, shadows, font sizes, durations or z-indices.
- Near-duplicate components or variants that differ only cosmetically.
- Product-specific styling inside shared components.

**How we check**

- Code review against the component file contract (`AGENTS.md`).
- Lint rules forbidding arbitrary Tailwind values and primitive tokens in components _(planned,
  Phase A)_.
- Visual regression tests across themes _(planned, Phase B)_.

---

### 2. Accessibility

**Everyone can use what we build — by default, not by effort.**

Accessibility is a baseline, not a feature. If the system gets it right once, every product
inherits it. Our target is **WCAG 2.2 level AA**, and AAA contrast for body text where feasible.

**In practice**

- Every interactive component implements the matching
  [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) pattern.
- Full keyboard support with a visible `:focus-visible` indicator (≥ 3:1 contrast).
- Native HTML first (`<button>`, `<dialog>`, `<input>`); ARIA only where HTML falls short.
- Colour is never the only carrier of meaning; contrast is verified for every token pairing in
  every theme.
- Motion respects `prefers-reduced-motion`; nothing flashes or auto-plays without control.
- Icon-only controls always have an accessible name; decorative icons are hidden from assistive
  technology.
- Touch targets are at least 24×24 CSS px (WCAG 2.5.8), 44×44 for primary mobile actions.
- Every component page documents its keyboard map and screen-reader behaviour.

**We avoid**

- `div` buttons, positive `tabindex`, focus outlines removed without a replacement.
- Placeholder text used as a label.
- Shipping a component "to fix accessibility later".

**How we check**

- `eslint-plugin-jsx-a11y` in **strict** mode — errors fail CI _(enforced)_.
- Testing Library tests query by role and accessible name _(enforced in review)_.
- Automated axe checks in component tests and contrast checks in the token build _(planned)_.
- Manual testing with keyboard, VoiceOver and NVDA before a component reaches **Stable**.

> Accessibility is not traded off. It is the floor every other principle stands on.

---

### 3. Scalability

**The system grows by composition and tokens, not by exceptions.**

The system must serve many products, brands and themes without being rewritten. We design for
the tenth product, not just the first.

**In practice**

- **Layered tokens:** primitive → semantic → component, with themes re-assigning semantic tokens
  only. A new theme or brand is data, not code.
- **Composable components:** small primitives combine into complex components, patterns and
  templates (Phases A → E).
- **Stable, minimal APIs:** props describe intent (`variant="danger"`), not implementation
  (`color="red"`). Every public API is a long-term commitment.
- **Strict dependency direction:** tokens → themes → ui → apps. Packages never import from apps.
- **Semantic versioning** with Changesets; breaking changes come with migration notes and, where
  possible, codemods.
- **Decisions are recorded** as ADRs so the reasoning survives the people who made it.

**We avoid**

- One-off props or variants added for a single screen.
- Components that know which product or page they are rendered in.
- Breaking changes without a deprecation period.

**How we check**

- The component approval process and maturity stages in
  [`04-governance.md`](architecture/04-governance.md).
- Changeset required for every change to a published package _(enforced in CI)_.
- Every new theme must build without touching component code.

---

### 4. Developer experience

**The right thing is the easy thing.**

A design system succeeds only if people want to use it. If the correct path is harder than the
workaround, people will take the workaround.

**In practice**

- **Typed, predictable APIs:** TypeScript strict, TSDoc on every prop, consistent prop names,
  sensible defaults, `className` merging via `cn()`.
- **One install, one import:** `@stefan-florescu/ui` plus one CSS import; no deep imports.
- **Docs that can't drift:** live examples are real source files, shown as code exactly as they
  run; props and token tables are generated.
- **Fast feedback:** `pnpm dev`, Turborepo caching, previews on every PR, clear error messages.
- **AI-ready:** `AGENTS.md`, machine-readable component metadata and consistent file contracts, so
  assistants generate correct code on the first try.
- **Copy-paste friendly:** every example on the docs site works as written.

**We avoid**

- Magic: hidden global state, implicit context requirements, surprising defaults.
- APIs that require reading the source to use correctly.
- Undocumented components or props.

**How we check**

- A component is not **Stable** without a docs page, examples and complete metadata.
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass locally and in CI.
- Friction reported by consumers is treated as a bug.

---

### 5. Performance

**Nothing we ship makes a product slower than it needs to be.**

Users feel performance before they see design. The system sits on every page of every product,
so its cost multiplies.

**In practice**

- **Zero-runtime styling:** Tailwind CSS + CSS variables; no CSS-in-JS runtime.
- **Tree-shakable ESM:** named exports, `sideEffects` declared, icons imported individually.
- **Server-first:** components are server-safe unless they need interactivity; `"use client"`
  only where required, so React Server Components ship less JavaScript.
- **Theming without re-rendering:** themes switch via CSS variables and `data-theme`, not React
  state.
- **Lean dependencies:** every new dependency must justify its size; prefer platform features
  (`<dialog>`, CSS) over libraries.
- **Fast docs:** the docs site is statically generated; animations are CSS-only and respect
  reduced motion.

**We avoid**

- Shipping JavaScript for what CSS can do.
- Large dependencies for small conveniences.
- Layout shift caused by components (reserve space for async content, set image dimensions).

**How we check**

- Next.js build reports and static generation for every docs page _(enforced in build)_.
- Bundle-size budgets per component and Core Web Vitals on the docs site _(planned)_.

---

## When principles conflict

1. **Accessibility is never traded away.** It is the baseline for every option on the table.
2. **Users before builders.** Prefer what is better for end users (consistency, performance) over
   what is more convenient for us (scalability, developer experience).
3. **Long-term over short-term.** When two options serve users equally, choose the one that keeps
   the system easier to evolve.
4. **Write it down.** A significant trade-off becomes an ADR in [`decisions/`](decisions/).

---

## Applying the principles

Every proposal, pull request and AI-generated change should answer yes to these questions:

- [ ] **Consistency** — Does it reuse existing tokens, components and patterns, and follow the
      naming conventions?
- [ ] **Accessibility** — Does it work with keyboard and screen reader, meet WCAG 2.2 AA contrast
      in every theme, and respect reduced motion?
- [ ] **Scalability** — Does it work for any product and theme, without one-off exceptions or
      breaking changes (or with a documented migration)?
- [ ] **Developer experience** — Is it typed, documented, and obvious to use correctly?
- [ ] **Performance** — Does it avoid unnecessary JavaScript, dependencies and layout shift?

If an answer is "no", either fix it or explain the trade-off in the pull request.

---

## Related

- [Foundation plan](README.md) · [Governance](architecture/04-governance.md) ·
  [Token architecture](architecture/02-token-architecture.md) ·
  [AI readiness](architecture/07-ai-readiness.md) · [`AGENTS.md`](../AGENTS.md)
