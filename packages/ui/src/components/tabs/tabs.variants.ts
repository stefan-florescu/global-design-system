import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Tabs on our semantic tokens. The component works out each tab's `state` (`active`, `inactive` or
 * `disabled`) and the variant picks the classes for it, so a consumer can still restyle a state
 * with `data-[state=active]:…` (an attribute selector, which outranks the variant's plain classes):
 * - `default`: `p-4` tabs with `rounded-t-base` corners over a `default` bottom border; the active
 *   tab is `fg-brand` on `neutral-secondary-soft`, others turn `heading` on it when hovered;
 * - `underline`: the same tabs with a 2px bottom border (the "Interactive tabs" style) that is
 *   `brand` under the active tab and on hover, overlapping the list's 1px `default` line;
 * - `pills`: `rounded-base` pills, the active one filled with `brand`;
 * - `full-width`: joined, equal-width tabs on `neutral-primary-soft`, with
 *   `neutral-secondary-medium` for the active and hovered tab and the `neutral-secondary-strong`
 *   focus halo.
 * `vertical` stacks the tabs in a column beside the panels from `md` up ("Vertical tabs").
 *
 * Accessibility: every tab draws the solid `ring` outline on keyboard focus
 * (lib/focus), and in `full-width` the focused tab rises to the `z.raised` layer so its outline
 * isn't hidden behind a neighbour. Spacing uses `gap`, so it also works right to left.
 */

export const tabsVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "md:flex",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export const tabsListVariants = cva("flex text-center text-sm font-medium text-body", {
  variants: {
    variant: {
      default: "border-default",
      underline: "border-default",
      pills: "",
      "full-width": "",
    },
    orientation: {
      horizontal: "",
      vertical: "mb-4 flex-col text-start md:mb-0 md:me-4",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", variant: ["default", "underline"], className: "border-b" },
    {
      orientation: "horizontal",
      variant: ["default", "underline", "pills"],
      className: "flex-wrap gap-x-2",
    },
    {
      orientation: "horizontal",
      variant: "full-width",
      className: "-space-x-px *:first:rounded-s-base *:last:rounded-e-base rtl:space-x-reverse",
    },
    { orientation: "vertical", variant: ["default", "underline"], className: "border-e" },
    { orientation: "vertical", variant: "pills", className: "gap-y-4" },
    {
      orientation: "vertical",
      variant: "full-width",
      className: "-space-y-px *:first:rounded-t-base *:last:rounded-b-base",
    },
  ],
  defaultVariants: { variant: "default", orientation: "horizontal" },
});

export const tabsTriggerVariants = cva(
  ["inline-flex cursor-pointer items-center", focusOutline, "[&_svg]:size-4 [&_svg]:shrink-0"],
  {
    variants: {
      variant: {
        default: "gap-2 p-4",
        underline: "gap-2 p-4",
        pills: "gap-2 rounded-base px-4 py-2.5",
        "full-width": [
          "relative w-full gap-1.5 border border-default bg-neutral-primary-soft px-4 py-2.5 leading-5",
          "focus:z-raised focus:ring-4 focus:ring-neutral-secondary-strong focus-visible:z-raised",
        ],
      },
      orientation: {
        horizontal: "justify-center",
        vertical: "w-full justify-start",
      },
      state: {
        active: "",
        inactive: "",
        disabled: "cursor-not-allowed text-fg-disabled",
      },
    },
    compoundVariants: [
      /* default */
      { variant: "default", orientation: "horizontal", className: "rounded-t-base" },
      { variant: "default", orientation: "vertical", className: "rounded-s-base" },
      {
        variant: "default",
        state: "active",
        className: "bg-neutral-secondary-soft text-fg-brand",
      },
      {
        variant: "default",
        state: "inactive",
        className: "hover:bg-neutral-secondary-soft hover:text-heading",
      },
      /* underline */
      {
        variant: "underline",
        orientation: "horizontal",
        className: "-mb-px rounded-t-base border-b-2",
      },
      {
        variant: "underline",
        orientation: "vertical",
        className: "-me-px rounded-s-base border-e-2",
      },
      { variant: "underline", state: "active", className: "border-brand text-fg-brand" },
      {
        variant: "underline",
        state: "inactive",
        className: "border-transparent hover:border-brand hover:text-fg-brand",
      },
      { variant: "underline", state: "disabled", className: "border-transparent" },
      /* pills */
      { variant: "pills", state: "active", className: "bg-brand text-brand-foreground" },
      {
        variant: "pills",
        state: "inactive",
        className: "hover:bg-neutral-secondary-soft hover:text-heading",
      },
      /* full width: the list (or the nav's list items) rounds the outer corners */
      {
        variant: "full-width",
        state: "active",
        className: "bg-neutral-secondary-medium text-heading",
      },
      {
        variant: "full-width",
        state: "inactive",
        className: "hover:bg-neutral-secondary-medium hover:text-heading",
      },
    ],
    defaultVariants: { variant: "default", orientation: "horizontal", state: "inactive" },
  },
);

/**
 * The list item around a `TabsLink`. In `full-width` it stretches, lifts its link above its
 * neighbours while focused, and rounds the outer corners of the first and last link.
 */
export const tabsNavItemVariants = cva("flex", {
  variants: {
    variant: {
      default: "",
      underline: "",
      pills: "",
      "full-width": "w-full focus-within:z-raised",
    },
    orientation: {
      horizontal: "",
      vertical: "",
    },
  },
  compoundVariants: [
    {
      variant: "full-width",
      orientation: "horizontal",
      className: "first:*:rounded-s-base last:*:rounded-e-base",
    },
    {
      variant: "full-width",
      orientation: "vertical",
      className: "first:*:rounded-t-base last:*:rounded-b-base",
    },
  ],
  defaultVariants: { variant: "default", orientation: "horizontal" },
});

/** Panels: no styles of their own besides the keyboard outline (they are a tab stop). */
export const tabsContentClassName = focusOutline;

export type TabsVariantProps = VariantProps<typeof tabsListVariants>;
export type TabsVariant = NonNullable<TabsVariantProps["variant"]>;
export type TabsOrientation = NonNullable<TabsVariantProps["orientation"]>;
