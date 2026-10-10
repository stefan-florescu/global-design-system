import { cva, type VariantProps } from "class-variance-authority";

import { focusOutlineInset } from "../../lib/focus";

/*
 * Sidebar on our semantic tokens.
 * - Below the breakpoint the aside is hidden and the same content opens in our `Drawer` (a modal
 *   dialog), so focus, Escape and the backdrop behave as in every other drawer.
 * - The sidebar takes the sticky layer, under the fixed layer of navbars and bottom bars.
 * - Items mark the current page with their hover colours, and draw the inset keyboard focus
 *   outline.
 */
export const sidebarVariants = cva("w-64", {
  variants: {
    position: {
      /** Fixed to the start edge of the viewport, full height. */
      fixed: "fixed start-0 top-0 z-sticky h-full",
      /** Stays in view while the page scrolls, inside a flex or grid layout. */
      sticky: "sticky top-0 h-screen shrink-0",
      /** In the flow of the page, as tall as its container. */
      static: "h-full shrink-0",
    },
    /** Below this breakpoint the sidebar is hidden and opens as a drawer from `SidebarToggle`. */
    breakpoint: {
      sm: "max-sm:hidden",
      md: "max-md:hidden",
      lg: "max-lg:hidden",
      none: "",
    },
  },
  defaultVariants: { position: "fixed", breakpoint: "sm" },
});

export type SidebarVariantProps = VariantProps<typeof sidebarVariants>;

/** The scrolling panel inside the aside. */
export const sidebarPanelClassName =
  "h-full overflow-y-auto border-e border-default bg-neutral-primary-soft px-3 py-4";

/** The drawer the sidebar becomes below its breakpoint: the panel's width, no padding of its own. */
export const sidebarDrawerClassName = "w-64 border-0 p-0";

/** The panel inside the drawer: room at the top for the drawer's close button. */
export const sidebarDrawerPanelClassName = "pt-14";

/** The drawer's close button, above the panel. */
export const sidebarDrawerCloseClassName = "z-raised";

/**
 * The hamburger button (`sm:hidden`), shown only below the breakpoint. The breakpoint
 * classes come from `sidebarToggleBreakpoint`.
 */
export const sidebarToggleClassName = "p-2 [&_svg]:size-6";

export const sidebarToggleBreakpoint = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  none: "hidden",
} as const;

/** A list of items. Every group after the first gets a separator line. */
export const sidebarItemGroupClassName =
  "space-y-2 font-medium not-first:mt-4 not-first:border-t not-first:border-default not-first:pt-4";

/** A sidebar link; also the collapse button. */
export const sidebarItemVariants = cva(
  [
    "group flex w-full items-center rounded-base px-2 py-1.5 text-body",
    "hover:bg-neutral-tertiary hover:text-fg-brand",
    "aria-[current=page]:bg-neutral-tertiary aria-[current=page]:text-fg-brand",
    "[&>svg]:size-5 [&>svg]:shrink-0",
    focusOutlineInset,
  ],
  {
    variants: {
      /** An item inside a `SidebarCollapse`: `pl-10`, lined up with the parent label. */
      nested: {
        true: "ps-10",
        false: "",
      },
    },
    defaultVariants: { nested: false },
  },
);

/** The item's text, which takes the free space so the label or count sits at the end. */
export const sidebarItemLabelClassName = "ms-3 flex-1 text-start whitespace-nowrap";

/** The collapse button: the link classes as a full-width button. */
export const sidebarCollapseButtonClassName = "cursor-pointer justify-between";

/** The collapse chevron. It turns over when the group is open. */
export const sidebarCollapseChevronClassName =
  "size-5 shrink-0 transition-transform motion-reduce:transition-none group-aria-expanded:rotate-180";

/** The nested list of a collapse. */
export const sidebarCollapseListClassName = "space-y-2 py-2";

/** A "Pro" tag after an item: a small bordered badge with `rounded-sm` corners. */
export const sidebarItemTagClassName = "rounded-sm";

/** A round counter after an item (`w-4.5 h-4.5`). */
export const sidebarItemCountClassName = "ms-2 size-4.5 p-0";

/** The logo link at the top of the sidebar. */
export const sidebarLogoClassName = [
  "mb-5 flex items-center rounded-base ps-2.5",
  focusOutlineInset,
].join(" ");

export const sidebarLogoImageClassName = "me-3 h-6 w-auto shrink-0";

/** A logo mark element (`logo`), 24px, in `fg-brand`. */
export const sidebarLogoMarkClassName = "me-3 flex shrink-0 text-fg-brand [&_svg]:size-6";

export const sidebarLogoNameClassName =
  "self-center text-lg font-semibold whitespace-nowrap text-heading";

/** The CTA card under the items: a brand alert with `mt-4 mb-4` gaps. */
export const sidebarCtaClassName = "my-4";

/** The CTA's close button, in the top-end corner next to the title. */
export const sidebarCtaDismissClassName = "absolute end-2.5 top-2.5 m-0";

/** A dismissible CTA: places the close button and keeps the title clear of it. */
export const sidebarCtaDismissibleClassName = "relative [&_[data-slot=alert-title]]:pe-6";
