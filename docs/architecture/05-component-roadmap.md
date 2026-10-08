# 05 · Component Roadmap

Priority is driven by **dependency** (what others build on) and **frequency** (how often products need it).
P0 = blocks everything after it; P1 = needed for most screens; P2 = common; P3 = specialised.

## Phase 0 — Environment ✅ (this PR)

Monorepo, tooling, CI/CD, Vercel projects, docs site, AI instructions.

## Phase A — Foundations

| Item                                                 | Priority | Deliverable                                  |
| ---------------------------------------------------- | -------- | -------------------------------------------- |
| Color primitives + semantic roles + light/dark       | P0       | tokens, themes, contrast check in build      |
| Typography (families, scale, composites)             | P0       | tokens, Tailwind utilities, docs page        |
| Spacing, size, radius, border-width                  | P0       | tokens                                       |
| Elevation, z-index, opacity                          | P0       | tokens                                       |
| Motion (duration, easing, reduced motion)            | P1       | tokens                                       |
| Breakpoints, grid, containers                        | P1       | tokens + layout docs                         |
| Iconography spec + `@stefan-florescu/icons` defaults | P1       | `Icon` wrapper, size/stroke rules            |
| Focus ring & a11y utilities (`VisuallyHidden`)       | P0       | utilities                                    |
| Tailwind bridge (`@theme inline`)                    | P0       | `packages/config/tailwind/theme.css`         |
| Foundations docs pages with token playgrounds        | P1       | swatches, type specimens, spacing visualiser |

**Exit:** all foundations tokenised, both themes pass contrast, docs pages published.

## Phase B — Core Components

| Component                           | Priority | Notes                                   |
| ----------------------------------- | -------- | --------------------------------------- |
| Button (incl. icon-only)            | P0       | Reference implementation for all others |
| Link                                | P0       |                                         |
| Text, Heading                       | P0       | Typography primitives                   |
| Stack, Inline, Box, Container, Grid | P0       | Layout primitives                       |
| Label, Input, Textarea, FormField   | P0       | FormField = label + help + error wiring |
| Checkbox, Radio/RadioGroup, Switch  | P1       |                                         |
| Badge, Tag, Avatar                  | P1       |                                         |
| Card, Separator                     | P1       |                                         |
| Spinner, Skeleton, Progress         | P1       |                                         |
| Alert / Banner                      | P1       |                                         |
| Tooltip                             | P1       | First floating-UI component             |

**Exit:** all P0/P1 at **Beta**, Button/Input/FormField at **Stable** → release **1.0.0**.

## Phase C — Complex Components

| Component                             | Priority | Notes                                          |
| ------------------------------------- | -------- | ---------------------------------------------- |
| Dialog, AlertDialog, Drawer/Sheet     | P1       | Focus trap, scroll lock, portal                |
| Popover, DropdownMenu, ContextMenu    | P1       |                                                |
| Select, Combobox, Autocomplete        | P1       | Listbox pattern, async options                 |
| Tabs, Accordion, Disclosure           | P1       |                                                |
| Toast / Notification                  | P1       | Live region                                    |
| Table, DataTable                      | P2       | Sorting, selection, pagination; TanStack Table |
| Pagination, Breadcrumb                | P2       |                                                |
| DatePicker, Calendar, DateRangePicker | P2       |                                                |
| Slider, NumberField, FileUpload       | P2       |                                                |
| Command palette, TreeView             | P3       |                                                |

> **Behaviour layer decision (ADR before Phase C):** build on a headless library
> (Radix Primitives / React Aria / Base UI) rather than re-implementing focus management,
> collision detection and ARIA wiring. Styling stays ours (CVA + tokens).

## Phase D — Patterns

Compositions with opinions, documented with rationale and code recipes:

Forms & validation · Empty states · Loading & skeleton strategy · Error handling ·
Navigation (app shell, sidebar, top bar) · Search & filtering · Data display & bulk actions ·
Onboarding · Notifications & feedback · Destructive confirmations · Settings pages ·
AI interaction patterns (prompt input, streaming response, citations).

## Phase E — Templates

Full-page, copy-paste-ready layouts and starter apps:

Authentication (sign in / sign up / reset) · Dashboard · List + detail · Settings ·
Marketing landing · Documentation page · Error pages (404/500) · Next.js starter template
(`create-…` or Vercel template) wired to the system.

## Timeline sketch

```
Phase 0 ████ (done)
Phase A ░░░░████████
Phase B         ░░░░████████████
Phase C                 ░░░░████████████████
Phase D                         ░░░░████████████
Phase E                                 ░░░░████████
```

Phases overlap: the next phase starts discovery while the previous one hardens.
