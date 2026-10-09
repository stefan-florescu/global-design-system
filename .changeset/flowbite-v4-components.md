---
"@stefan-florescu/ui": minor
"@stefan-florescu/icons": minor
---

**Breaking:** every component now looks like Flowbite v4, class for class, on the new Flowbite-role tokens (ADR 0009). Where Flowbite misses WCAG 2.2 AA, the nearest passing token is used; each docs page lists these deviations. Keyboard focus adds a solid `ring` outline (`lib/focus.ts`) around Flowbite's focus halo.

API changes:

- **Button:** `variant` is `brand | secondary | tertiary | success | danger | warning | dark | ghost`. `outline` applies to brand, secondary, success, danger and warning. `primary`, `destructive`, `info`, `link` and the `outline` variant are removed. Sizes are padding-based (34–54px), and `disabled` uses Flowbite's grey disabled style.
- **Alert:** `variant` `info` → `brand` (the default), `destructive` → `danger`, `neutral` → `dark`.
- **Badge:** `variant` `neutral` → `alternative` / `gray`, `info` → `brand`, `destructive` → `danger`. New `dot` prop.
- **Avatar:** sizes are `2xs` 18, `xs` 24, `sm` 32, `md` 40, `lg` 44, `xl` 56 and `2xl` 64px.
- **Accordion:**
  - New `separated` prop.
  - New `AccordionTrigger` `icon` prop.
- **Banner:** children are no longer wrapped.
- **BottomNavigation:**
  - New `sticky` position.
  - New `header` prop.
- **ButtonGroup:** new `orientation` and `outline` props.
- **Carousel:** new `transition` prop (`default | fast`).
- **ChatBubble:**
  - New `actions` prop.
  - New `ChatBubbleMenu` and `ChatBubbleMenuItem`.
- **Clipboard:**
  - `variant` is `brand | secondary | ghost | tertiary`.
  - `size` is `sm | md`.
  - No longer takes Button props.
- **Datepicker:**
  - Now a text field you can type in.
  - `showTodayButton` / `showClearButton` → `showButtons`.
  - `autoHide` defaults to `false`.
  - New `format`, `orientation` and `id` props.
  - New `DateRangePicker`, `formatDate` and `parseDate`.
- **Label:** includes Flowbite's `mb-2.5`; new `variant` (`default | success | danger`).
- **HelperText:** includes `mt-2.5`; `variant="error"` → `variant="danger"`.
- **Field styles:** `fieldVariants` sizes are `sm | md | lg | xl`, padding-based. New `fieldGroupClassName`, `fieldSelectAddonClassName` and `fieldGroupItemClassName`.
- **Select:** adds the `xl` size.
- **Textarea:** `size` is removed.
- **SearchInput:** new `icon` prop; sizes are `sm | md | lg | xl`.
- **NumberInput:** new `variant` (`default | counter`) and `caption` props; sizes are `sm | md | lg | xl`.
- **PhoneInput:** new `endAddon` prop.
- **Timepicker:** renders its own field; `size`, `startIcon` and `addon` are removed; new `icon` prop.
- **FileInput:**
  - `size` is `sm | md | lg`.
  - New `fileInputVariants`.
- **Checkbox / Radio:**
  - `bordered` → `variant` (`default | bordered | list | card`).
  - New `icon` and `endIcon` props.
- **Toggle:** `size` is `md | lg` (`sm` removed); new `bordered` and `icon` props.
- **`cn()`:** knows the `rounded-base` radius.

New icons include ShoppingCart, Eye, Clipboard, ClipboardCheck, CloudUpload, CreditCard, Phone, QrCode, Users and others used by the new examples.
