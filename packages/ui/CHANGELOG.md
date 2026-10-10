# @stefan-florescu/ui

## 0.1.0

### Minor Changes

- [#13](https://github.com/stefan-florescu/global-design-system/pull/13) [`42cc7ac`](https://github.com/stefan-florescu/global-design-system/commit/42cc7ac60a24091269c4c2a107d2804a397f7006) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Accordion` (`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`), modelled on Flowbite: single or `multiple` open items, controlled or uncontrolled, `brand` colour option, `flush` style, nesting, and WAI-ARIA keyboard support. The build now emits one file per module, so client components keep their `"use client"` directive.

- [#14](https://github.com/stefan-florescu/global-design-system/pull/14) [`3c85283`](https://github.com/stefan-florescu/global-design-system/commit/3c85283689ca49df8f3355293808e68dde170576) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Alert`, `Avatar` (with `AvatarGroup` and `AvatarGroupCounter`), `Badge`, `Banner`, `BottomNavigation` (with `BottomNavigationItem`) and `Breadcrumb` (with `BreadcrumbItem`), modelled on Flowbite and built on semantic tokens. Add the Clock, House, Megaphone, Settings, User and Wallet icons.

- [#15](https://github.com/stefan-florescu/global-design-system/pull/15) [`1e2e2ed`](https://github.com/stefan-florescu/global-design-system/commit/1e2e2ed8cefe672f70a0ac3914d04fde6bf5cd88) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `ButtonGroup`, `Card`, `Carousel`, `ChatBubble`, `Clipboard`, `Calendar` and `Datepicker`, modelled on Flowbite and built on semantic tokens. Add the Calendar, Download, Pause, Play and Star icons.

- [#12](https://github.com/stefan-florescu/global-design-system/pull/12) [`cb4d639`](https://github.com/stefan-florescu/global-design-system/commit/cb4d6397a64e93de2cab88d1681f6e4639c360da) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Button` and `buttonVariants()`: brand, primary, secondary, outline, ghost, success, warning, destructive, info and link variants, an `outline` style for filled intents, five sizes (`xs`–`xl`), `pill`, `iconOnly`, `fullWidth` and `loading`. The themes contrast check now also verifies `-subtle-foreground` labels on the page background (34 pairings).

- [#19](https://github.com/stefan-florescu/global-design-system/pull/19) [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Drawer` (with `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`, `DrawerHandle` and `useDrawer`), modelled on Flowbite's drawer and built on the native `<dialog>`. Add the CalendarPlus, ChartPie, Columns3, Contact, Grid2x2Plus, LogIn, ShoppingBag, Table and Ticket icons.

- [#19](https://github.com/stefan-florescu/global-design-system/pull/19) [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Dropdown`, modelled on Flowbite's dropdowns and following the WAI-ARIA menu button pattern. It comes with:
  
  - `DropdownTrigger`, `DropdownMenu` and `DropdownContent` (a non-menu panel for forms, search and navigation);
  - `DropdownItem`, `DropdownCheckboxItem`, `DropdownRadioGroup` and `DropdownRadioItem`;
  - sub-menus (`DropdownSub`, `DropdownSubTrigger`, `DropdownSubMenu`);
  - `DropdownHeader`, `DropdownGroup` and `DropdownDivider`.
  
  It supports placement, offset and open-on-hover. It also adds the Bell, ChevronUp, Ellipsis, Heart, Lock, LogOut, MessageSquareText, Rocket, SlidersHorizontal and Trash2 icons.

- [#20](https://github.com/stefan-florescu/global-design-system/pull/20) [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Footer` (with `FooterBrand`, `FooterTitle`, `FooterLinkGroup`, `FooterLink`, `FooterCopyright`, `FooterDivider`, `FooterIcons` and `FooterIcon`) and `Kbd`, modelled on Flowbite and built on semantic tokens. `Footer` has `default`, `card` and `sticky` variants, and its link groups are named navigation landmarks; `Kbd` renders `<kbd>` in two sizes. Add the AtSign and Triangle icons.

- [#16](https://github.com/stefan-florescu/global-design-system/pull/16) [`ab53f6a`](https://github.com/stefan-florescu/global-design-system/commit/ab53f6aa5cc87ea3bbae708541d9e23ed29f150c) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add form components: `Input`, `SearchInput`, `NumberInput`, `PhoneInput`, `Select`, `Textarea`, `Timepicker`, `FileInput`, `FileDropzone`, `Checkbox`, `Radio`, `Toggle` and `Range`, plus the `Label`, `HelperText` and `Fieldset` building blocks, modelled on Flowbite's forms and built on semantic tokens. Add the MapPin, Minus, Paperclip, SendHorizontal and Upload icons.

- [#20](https://github.com/stefan-florescu/global-design-system/pull/20) [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Indicator`, modelled on Flowbite's indicators: a dot, count or icon in `gray`, `dark`, `brand`, `success`, `danger` or `warning`, five sizes, a `bordered` buffer ring, `count` with `max`, a visually hidden `label`, and nine `placement`s that pin it to an edge or corner of a `relative` parent (`indicatorPlacementVariants` positions other elements the same way). Server-safe. `Avatar`'s status dot is now an `Indicator`; its API and look are unchanged.

- [#20](https://github.com/stefan-florescu/global-design-system/pull/20) [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `MegaMenu` (with `MegaMenuTrigger`, `MegaMenuContent`, `MegaMenuGroup` and `MegaMenuLink`), modelled on Flowbite's mega menu: a navbar item that opens a panel of grouped links under the item or across the full width of the navbar, following the WAI-ARIA disclosure navigation pattern, and stacking in the collapsed navbar on small screens. Add the FolderOpen, Mailbox, Scale, ScrollText and Shapes icons.

- [#20](https://github.com/stefan-florescu/global-design-system/pull/20) [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Modal` (`Modal`, `ModalTrigger`, `ModalContent`, `ModalHeader`, `ModalTitle`, `ModalClose`, `ModalBody`, `ModalFooter`, `useModal`), modelled on Flowbite: a WAI-ARIA modal dialog on the native `<dialog>` with `size` (`sm`–`7xl`, Flowbite's `max-w-*` widths), nine `placement`s, `dismissible` (Flowbite's static modal when `false`), focus moved in (or to `data-autofocus`) and returned to the trigger, Escape and backdrop closing, and page scroll lock. `Drawer` now shares the same dialog logic (no API change). Icons: add `CodeXml`, `Share2` and `SwatchBook`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Navbar` (`Navbar`, `NavbarBrand`, `NavbarToggle`, `NavbarActions`, `NavbarCollapse`, `NavbarLink`, `NavbarDropdownTrigger`), modelled on Flowbite: a named `<nav>` landmark with `default` / `solid` variants, static, sticky or fixed `position`, and a disclosure hamburger that collapses the links below `md` (or at every width with `expand="never"`); Escape closes the open menu and returns focus to the toggle. Icons: add `Globe`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Pagination` (numbered, previous/next, table and single layouts, `sm` / `md` sizes, icons, ellipsis, buttons or links via `getPageHref`; a named `<nav>` with `aria-current="page"` and real disabled ends) and `Rating` (stars in three sizes, exposed as one image named "Rated N out of M"). Icons: add `Building`, `ThumbsDown` and `ThumbsUp`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Popover` (`Popover`, `PopoverHeader`, `PopoverTitle`, `PopoverBody`), modelled on Flowbite: click or hover trigger, twelve placements plus `auto`, offset and optional arrow, in the top layer. Click popovers are non-modal dialogs that take focus and return it on Escape; hover popovers also open on focus and stay open while hovered (WCAG 1.4.13).

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Progress` (`role="progressbar"` with a required name, five colours, four sizes, labels inside or outside) and `Skeleton` (`Skeleton`, `SkeletonLine`, `SkeletonBlock`, `SkeletonImage`, `SkeletonVideo`, `SkeletonAvatar`: a `role="status"` loading region with hidden placeholders whose pulse stops under reduced motion). Icons: add `FileVideoCamera`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Sidebar` (`Sidebar`, `SidebarItems`, `SidebarItemGroup`, `SidebarItem`, `SidebarCollapse`, `SidebarLogo`, `SidebarCTA`, `SidebarProvider`, `SidebarToggle`, `useSidebar`), modelled on Flowbite: a named navigation with icons, badges, counts, disclosure sub-menus and separators that moves into a modal `Drawer` below its breakpoint, with a close button (`closeLabel`). Icons: add `Book` and `LifeBuoy`.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Spinner` (Flowbite's SVG loading indicator, with a decorative mode) and `Stepper` / `StepperItem` (default, progress, detailed, vertical, breadcrumb and timeline steppers). `Button`'s `loading` state now draws `Spinner`. Add the `ChevronsRight` and `IdCard` icons.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Table` (`Table`, `TableCaption`, `TableHead`, `TableHeadCell`, `TableBody`, `TableRow`, `TableCell`, `TableFoot`), modelled on Flowbite's tables: a native, server-safe `<table>` in Flowbite's bordered card, with `striped` rows or columns, `hoverable` rows, a `brand` variant, borderless and `rounded` styles, and `toolbar` / `footer` slots for search, filters and pagination. Column and row headers get their `scope`, the caption can be visually hidden, and a table wider than its container scrolls in a keyboard-focusable region named by the caption. Icons: add `ChevronsUpDown` and `Funnel`.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Tabs` (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`), modelled on Flowbite: `default`, `underline`, `pills` and `full-width` styles, `vertical` orientation, controlled or uncontrolled, disabled tabs, and the full WAI-ARIA Tabs keyboard model with automatic or `manual` activation. `TabsNav` and `TabsLink` render the same styles as a navigation of links to other pages (`aria-current="page"`). Icons: add `FileChartColumn`, `Headset`, `LayoutGrid` and `ReceiptText`.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Timeline` (`TimelineItem`, `TimelinePoint`, `TimelineContent`, `TimelineTime`, `TimelineTitle`, `TimelineBody`; vertical and horizontal) and `Toast` (`ToastIcon`, `ToastToggle`, plus `ToastProvider` and `useToast` to show toasts from code), modelled on Flowbite v4. Add the `EyeOff`, `FileArchive`, `FingerprintPattern` and `Reply` icons.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Tooltip`, Flowbite's tooltip: a short text in a dark or light box with an arrow that describes
  its trigger (`aria-describedby`) or, with `mode="label"`, names an icon-only trigger
  (`aria-labelledby`). It opens on hover and keyboard focus (or on click with `trigger="click"`) in the
  top layer, flips when there is no room, stays open while hovered and hides with Escape (WCAG 1.4.13).
  Options: `placement` (incl. `auto`), `variant` (`dark` | `light`), `arrow`, `animation`, `offset`,
  `delay` and a controlled `open` state.
  
  `Pagination` gains `showTooltips` (Flowbite's "Previous" / "Next" tooltips on icon-only controls) and
  `Clipboard` gains `showTooltip` (the label, then "Copied!", in a tooltip on icon-only buttons).
  Popover's positioning moved into a shared internal module; its behaviour is unchanged.

- [#19](https://github.com/stefan-florescu/global-design-system/pull/19) [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Rebuild `ChatBubbleMenu` and `ChatBubbleMenuItem` on `Dropdown`: the "more" button is now a WAI-ARIA menu button with arrow keys, Home, End, typeahead and Escape. `ChatBubbleMenu` gains `placement`, `open`, `defaultOpen` and `onOpenChange`; `ChatBubbleMenuItem` takes `DropdownItem` props (`href`, `variant`, `disabled`…).

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - `Checkbox` takes `indeterminate`: the "mixed" state, drawn as a dash on the brand fill and announced as mixed, for a select-all with some rows selected (the Table examples use it).

- [#16](https://github.com/stefan-florescu/global-design-system/pull/16) [`ab53f6a`](https://github.com/stefan-florescu/global-design-system/commit/ab53f6aa5cc87ea3bbae708541d9e23ed29f150c) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - **Breaking:** every component now looks like Flowbite v4, class for class, on the new Flowbite-role tokens (ADR 0009). Where Flowbite misses WCAG 2.2 AA, the nearest passing token is used; each docs page lists these deviations. Keyboard focus adds a solid `ring` outline (`lib/focus.ts`) around Flowbite's focus halo.
  
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

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - `Navbar` takes `expand="lg"`: the links stay behind the hamburger up to 1024px and show in a row from `lg` up, for a bar with more links or actions. `md` stays the default.

- [#10](https://github.com/stefan-florescu/global-design-system/pull/10) [`c33206b`](https://github.com/stefan-florescu/global-design-system/commit/c33206bdd169c2a01a013b61fc2e1e2fdf6b6b98) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - `styles.css` renders lucide icons with the `--sds-icon-stroke` width (1.5), and the Tailwind preset now maps the semantic colour, typography, spacing, radius and shadow tokens (`bg-background`, `text-muted-foreground`, `border-border`, `rounded-md`…).

### Patch Changes

- [#17](https://github.com/stefan-florescu/global-design-system/pull/17) [`dd89a4a`](https://github.com/stefan-florescu/global-design-system/commit/dd89a4ad663e24ae5828a2949c227543997d3834) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - FileInput: the "Choose file" button is now a segment inside the field, 4px from the border, with start corners rounded to 8px and even padding. Fields keep their 38, 42 and 50px heights.

- [#14](https://github.com/stefan-florescu/global-design-system/pull/14) [`3c85283`](https://github.com/stefan-florescu/global-design-system/commit/3c85283689ca49df8f3355293808e68dde170576) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add layer tokens (`--sds-z-base` … `--sds-z-skip-link`) with matching `z-*` Tailwind utilities. `Banner` and `BottomNavigation` now sit on the `z.fixed` layer when pinned to the viewport.

- [#7](https://github.com/stefan-florescu/global-design-system/pull/7) [`bd5d451`](https://github.com/stefan-florescu/global-design-system/commit/bd5d4517b712983dff04bec7cf99952b7e1adaaf) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Stop marking the whole bundle as `"use client"` so server-safe exports such as `cn()` can be called from React Server Components.
- Updated dependencies [[`3c85283`](https://github.com/stefan-florescu/global-design-system/commit/3c85283689ca49df8f3355293808e68dde170576), [`1e2e2ed`](https://github.com/stefan-florescu/global-design-system/commit/1e2e2ed8cefe672f70a0ac3914d04fde6bf5cd88), [`cb4d639`](https://github.com/stefan-florescu/global-design-system/commit/cb4d6397a64e93de2cab88d1681f6e4639c360da), [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282), [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282), [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724), [`ab53f6a`](https://github.com/stefan-florescu/global-design-system/commit/ab53f6aa5cc87ea3bbae708541d9e23ed29f150c), [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f), [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724), [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724), [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870), [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870), [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870), [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870), [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f), [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f), [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f), [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f), [`c33206b`](https://github.com/stefan-florescu/global-design-system/commit/c33206bdd169c2a01a013b61fc2e1e2fdf6b6b98), [`ab53f6a`](https://github.com/stefan-florescu/global-design-system/commit/ab53f6aa5cc87ea3bbae708541d9e23ed29f150c), [`ab53f6a`](https://github.com/stefan-florescu/global-design-system/commit/ab53f6aa5cc87ea3bbae708541d9e23ed29f150c), [`bd5d451`](https://github.com/stefan-florescu/global-design-system/commit/bd5d4517b712983dff04bec7cf99952b7e1adaaf), [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282), [`e5216af`](https://github.com/stefan-florescu/global-design-system/commit/e5216af6793d5f869ce8d8e70d6320ff76b15fe4), [`3c85283`](https://github.com/stefan-florescu/global-design-system/commit/3c85283689ca49df8f3355293808e68dde170576)]:
  - @stefan-florescu/icons@0.1.0
  - @stefan-florescu/themes@0.1.0
  - @stefan-florescu/tokens@0.1.0
