import { cva, type VariantProps } from "class-variance-authority";

import { focusOutlineInset } from "../../lib/focus";

/*
 * Dropdown: a `w-44` panel on `neutral-primary-medium` with a `default-medium` border,
 * `rounded-base` corners and `shadow-lg`, and `p-2` rows of `text-sm font-medium text-body` items
 * that turn `neutral-tertiary-medium` / `heading` on hover.
 *
 * The panel uses the native popover (top layer), so the first group of classes resets the
 * browser's popover styles; `z-dropdown` layers it where the popover API is missing.
 * Accessibility:
 * - items draw the solid `ring` outline and the hover fill on keyboard focus;
 * - disabled items use `fg-disabled` and keep no hover;
 * - checkbox, radio and switch items draw their state with the form controls' tokens
 *   (`input` border, `brand` fill) so they match `Checkbox`, `Radio` and `Toggle`.
 */
export const dropdownPanelClassName = [
  "fixed inset-auto z-dropdown m-0 overflow-visible outline-hidden",
  "w-44 rounded-base border border-default-medium bg-neutral-primary-medium p-2 text-sm font-medium text-body shadow-lg",
].join(" ");

export const dropdownItemVariants = cva(
  [
    "flex w-full cursor-pointer items-center rounded p-2 text-start",
    "[:where(&>svg)]:size-4 [:where(&>svg)]:shrink-0",
    focusOutlineInset,
    "aria-disabled:cursor-not-allowed aria-disabled:text-fg-disabled aria-disabled:hover:bg-transparent aria-disabled:hover:text-fg-disabled",
  ],
  {
    variants: {
      variant: {
        default:
          "hover:bg-neutral-tertiary-medium hover:text-heading focus-visible:bg-neutral-tertiary-medium focus-visible:text-heading",
        danger:
          "text-fg-danger hover:bg-neutral-tertiary-medium focus-visible:bg-neutral-tertiary-medium",
      },
      /* Space between an icon, the label and a control: 6px, 8px or 12px. */
      gap: {
        icon: "gap-1.5",
        control: "gap-2",
        toggle: "gap-3",
      },
      /* Rows with a description start at the top. */
      align: {
        center: "",
        start: "items-start",
      },
    },
    defaultVariants: { variant: "default", gap: "icon", align: "center" },
  },
);

/** Checkbox and radio rows label their option in `heading`. */
export const dropdownChoiceLabelClassName = "text-heading";

/** Helper-text rows: the control sits in a 20px line next to the title. */
export const dropdownControlLineClassName = "flex h-5 shrink-0 items-center";

export const dropdownDescriptionVariants = cva("block text-sm", {
  variants: {
    part: {
      title: "font-medium text-heading",
      description: "text-xs font-normal text-body",
    },
  },
});

/* The checkbox: our `Checkbox` box, checked from the item's `aria-checked`. */
export const dropdownCheckboxIndicatorClassName = [
  "relative inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-input bg-neutral-secondary-medium text-brand-foreground",
  "group-aria-checked:border-brand group-aria-checked:bg-brand",
  "[&_svg]:hidden [&_svg]:size-3.5 group-aria-checked:[&_svg]:block",
].join(" ");

/* The radio: our `Radio` circle with its centre dot. */
export const dropdownRadioIndicatorClassName = [
  "relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-neutral-secondary-medium",
  "group-aria-checked:border-brand group-aria-checked:bg-brand",
].join(" ");

export const dropdownRadioDotClassName =
  "hidden size-1.5 rounded-full bg-brand-foreground group-aria-checked:block forced-colors:border";

/* The switch: our `Toggle` track and knob. */
export const dropdownToggleIndicatorClassName = [
  "relative block h-5 w-9 shrink-0 rounded-full bg-input group-aria-checked:bg-brand",
  "after:absolute after:start-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-brand-foreground after:content-['']",
  "after:transition-all motion-reduce:after:transition-none",
  "group-aria-checked:after:translate-x-full rtl:group-aria-checked:after:-translate-x-full",
  "forced-colors:border forced-colors:after:border",
].join(" ");

/** Pushes a control to the end of its row (such as a "Dark mode" switch). */
export const dropdownIndicatorEndClassName = "ms-auto";

/** The dropdown header: the user box above the items. */
export const dropdownHeaderClassName =
  "mb-2 flex items-center gap-1.5 rounded bg-neutral-secondary-strong px-2.5 py-2 text-sm";

/** The divider: a full-width `default-medium` line between groups. */
export const dropdownDividerClassName = "-mx-2 my-2 border-t border-default-medium";

/** The chevron that opens a sub-menu (a multi-level dropdown). */
export const dropdownSubChevronClassName = "ms-auto rtl:rotate-180";

/** The chevron of the default trigger, before the label for a `left` placement. */
export const dropdownTriggerChevronVariants = cva("", {
  variants: {
    position: {
      end: "-me-0.5",
      start: "-ms-0.5",
    },
  },
  defaultVariants: { position: "end" },
});

export type DropdownItemVariantProps = Pick<VariantProps<typeof dropdownItemVariants>, "variant">;
