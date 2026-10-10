# @stefan-florescu/icons

## 0.1.0

### Minor Changes

- [#14](https://github.com/stefan-florescu/global-design-system/pull/14) [`3c85283`](https://github.com/stefan-florescu/global-design-system/commit/3c85283689ca49df8f3355293808e68dde170576) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Alert`, `Avatar` (with `AvatarGroup` and `AvatarGroupCounter`), `Badge`, `Banner`, `BottomNavigation` (with `BottomNavigationItem`) and `Breadcrumb` (with `BreadcrumbItem`), modelled on Flowbite and built on semantic tokens. Add the Clock, House, Megaphone, Settings, User and Wallet icons.

- [#15](https://github.com/stefan-florescu/global-design-system/pull/15) [`1e2e2ed`](https://github.com/stefan-florescu/global-design-system/commit/1e2e2ed8cefe672f70a0ac3914d04fde6bf5cd88) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `ButtonGroup`, `Card`, `Carousel`, `ChatBubble`, `Clipboard`, `Calendar` and `Datepicker`, modelled on Flowbite and built on semantic tokens. Add the Calendar, Download, Pause, Play and Star icons.

- [#19](https://github.com/stefan-florescu/global-design-system/pull/19) [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Drawer` (with `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`, `DrawerHandle` and `useDrawer`), modelled on Flowbite's drawer and built on the native `<dialog>`. Add the CalendarPlus, ChartPie, Columns3, Contact, Grid2x2Plus, LogIn, ShoppingBag, Table and Ticket icons.

- [#19](https://github.com/stefan-florescu/global-design-system/pull/19) [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Dropdown`, modelled on Flowbite's dropdowns and following the WAI-ARIA menu button pattern. It comes with:
  
  - `DropdownTrigger`, `DropdownMenu` and `DropdownContent` (a non-menu panel for forms, search and navigation);
  - `DropdownItem`, `DropdownCheckboxItem`, `DropdownRadioGroup` and `DropdownRadioItem`;
  - sub-menus (`DropdownSub`, `DropdownSubTrigger`, `DropdownSubMenu`);
  - `DropdownHeader`, `DropdownGroup` and `DropdownDivider`.
  
  It supports placement, offset and open-on-hover. It also adds the Bell, ChevronUp, Ellipsis, Heart, Lock, LogOut, MessageSquareText, Rocket, SlidersHorizontal and Trash2 icons.

- [#20](https://github.com/stefan-florescu/global-design-system/pull/20) [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Footer` (with `FooterBrand`, `FooterTitle`, `FooterLinkGroup`, `FooterLink`, `FooterCopyright`, `FooterDivider`, `FooterIcons` and `FooterIcon`) and `Kbd`, modelled on Flowbite and built on semantic tokens. `Footer` has `default`, `card` and `sticky` variants, and its link groups are named navigation landmarks; `Kbd` renders `<kbd>` in two sizes. Add the AtSign and Triangle icons.

- [#16](https://github.com/stefan-florescu/global-design-system/pull/16) [`ab53f6a`](https://github.com/stefan-florescu/global-design-system/commit/ab53f6aa5cc87ea3bbae708541d9e23ed29f150c) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add form components: `Input`, `SearchInput`, `NumberInput`, `PhoneInput`, `Select`, `Textarea`, `Timepicker`, `FileInput`, `FileDropzone`, `Checkbox`, `Radio`, `Toggle` and `Range`, plus the `Label`, `HelperText` and `Fieldset` building blocks, modelled on Flowbite's forms and built on semantic tokens. Add the MapPin, Minus, Paperclip, SendHorizontal and Upload icons.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add the Captions, Expand, ListMusic, MicOff, Shuffle, SkipBack, SkipForward and VideoOff icons, for media and meeting controls.

- [#20](https://github.com/stefan-florescu/global-design-system/pull/20) [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `MegaMenu` (with `MegaMenuTrigger`, `MegaMenuContent`, `MegaMenuGroup` and `MegaMenuLink`), modelled on Flowbite's mega menu: a navbar item that opens a panel of grouped links under the item or across the full width of the navbar, following the WAI-ARIA disclosure navigation pattern, and stacking in the collapsed navbar on small screens. Add the FolderOpen, Mailbox, Scale, ScrollText and Shapes icons.

- [#20](https://github.com/stefan-florescu/global-design-system/pull/20) [`6105890`](https://github.com/stefan-florescu/global-design-system/commit/6105890d1edb97264ca9f08cce26a31ad3e0a724) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Modal` (`Modal`, `ModalTrigger`, `ModalContent`, `ModalHeader`, `ModalTitle`, `ModalClose`, `ModalBody`, `ModalFooter`, `useModal`), modelled on Flowbite: a WAI-ARIA modal dialog on the native `<dialog>` with `size` (`sm`–`7xl`, Flowbite's `max-w-*` widths), nine `placement`s, `dismissible` (Flowbite's static modal when `false`), focus moved in (or to `data-autofocus`) and returned to the trigger, Escape and backdrop closing, and page scroll lock. `Drawer` now shares the same dialog logic (no API change). Icons: add `CodeXml`, `Share2` and `SwatchBook`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Navbar` (`Navbar`, `NavbarBrand`, `NavbarToggle`, `NavbarActions`, `NavbarCollapse`, `NavbarLink`, `NavbarDropdownTrigger`), modelled on Flowbite: a named `<nav>` landmark with `default` / `solid` variants, static, sticky or fixed `position`, and a disclosure hamburger that collapses the links below `md` (or at every width with `expand="never"`); Escape closes the open menu and returns focus to the toggle. Icons: add `Globe`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Pagination` (numbered, previous/next, table and single layouts, `sm` / `md` sizes, icons, ellipsis, buttons or links via `getPageHref`; a named `<nav>` with `aria-current="page"` and real disabled ends) and `Rating` (stars in three sizes, exposed as one image named "Rated N out of M"). Icons: add `Building`, `ThumbsDown` and `ThumbsUp`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Progress` (`role="progressbar"` with a required name, five colours, four sizes, labels inside or outside) and `Skeleton` (`Skeleton`, `SkeletonLine`, `SkeletonBlock`, `SkeletonImage`, `SkeletonVideo`, `SkeletonAvatar`: a `role="status"` loading region with hidden placeholders whose pulse stops under reduced motion). Icons: add `FileVideoCamera`.

- [#21](https://github.com/stefan-florescu/global-design-system/pull/21) [`525c214`](https://github.com/stefan-florescu/global-design-system/commit/525c214b6f2dfdfa3417d392f0c439fe03618870) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Sidebar` (`Sidebar`, `SidebarItems`, `SidebarItemGroup`, `SidebarItem`, `SidebarCollapse`, `SidebarLogo`, `SidebarCTA`, `SidebarProvider`, `SidebarToggle`, `useSidebar`), modelled on Flowbite: a named navigation with icons, badges, counts, disclosure sub-menus and separators that moves into a modal `Drawer` below its breakpoint, with a close button (`closeLabel`). Icons: add `Book` and `LifeBuoy`.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Spinner` (Flowbite's SVG loading indicator, with a decorative mode) and `Stepper` / `StepperItem` (default, progress, detailed, vertical, breadcrumb and timeline steppers). `Button`'s `loading` state now draws `Spinner`. Add the `ChevronsRight` and `IdCard` icons.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Table` (`Table`, `TableCaption`, `TableHead`, `TableHeadCell`, `TableBody`, `TableRow`, `TableCell`, `TableFoot`), modelled on Flowbite's tables: a native, server-safe `<table>` in Flowbite's bordered card, with `striped` rows or columns, `hoverable` rows, a `brand` variant, borderless and `rounded` styles, and `toolbar` / `footer` slots for search, filters and pagination. Column and row headers get their `scope`, the caption can be visually hidden, and a table wider than its container scrolls in a keyboard-focusable region named by the caption. Icons: add `ChevronsUpDown` and `Funnel`.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Tabs` (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`), modelled on Flowbite: `default`, `underline`, `pills` and `full-width` styles, `vertical` orientation, controlled or uncontrolled, disabled tabs, and the full WAI-ARIA Tabs keyboard model with automatic or `manual` activation. `TabsNav` and `TabsLink` render the same styles as a navigation of links to other pages (`aria-current="page"`). Icons: add `FileChartColumn`, `Headset`, `LayoutGrid` and `ReceiptText`.

- [#22](https://github.com/stefan-florescu/global-design-system/pull/22) [`da8db71`](https://github.com/stefan-florescu/global-design-system/commit/da8db711a868ba3009d89b79065df59211519c0f) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add `Timeline` (`TimelineItem`, `TimelinePoint`, `TimelineContent`, `TimelineTime`, `TimelineTitle`, `TimelineBody`; vertical and horizontal) and `Toast` (`ToastIcon`, `ToastToggle`, plus `ToastProvider` and `useToast` to show toasts from code), modelled on Flowbite v4. Add the `EyeOff`, `FileArchive`, `FingerprintPattern` and `Reply` icons.

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

- [#7](https://github.com/stefan-florescu/global-design-system/pull/7) [`bd5d451`](https://github.com/stefan-florescu/global-design-system/commit/bd5d4517b712983dff04bec7cf99952b7e1adaaf) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Export a curated set of lucide icons (navigation, actions, status, theme) used by the documentation site. Icons render with a 1.5 stroke via `--sds-icon-stroke`.

- [#19](https://github.com/stefan-florescu/global-design-system/pull/19) [`67946d5`](https://github.com/stefan-florescu/global-design-system/commit/67946d5829b78e104eabf5ff54b96f4472291282) Thanks [@stefan-florescu](https://github.com/stefan-florescu)! - Add the UserMinus icon.
