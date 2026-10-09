import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4's mega menu (https://flowbite.com/docs/components/mega-menu/), class for class:
 * - the trigger is Flowbite's navbar item: a full-width row with a `light` bottom border in the
 *   collapsed (mobile) navbar, plain `heading` text that turns `fg-brand` on hover from `md` up;
 * - the anchored panel is a `grid` of columns on `neutral-primary-soft` with a `default` border,
 *   `rounded-base` corners and Flowbite's bare `shadow` (our `shadow-sm`, the same value);
 * - the full-width panel is a `border-y` bar with `shadow-xs` and a centred `max-w-screen-xl` grid.
 *
 * `data-mode` is set by the component: `floating` places the panel in the top layer next to the
 * trigger (or under the navbar), `inline` stacks it in the page flow under the trigger on small
 * screens. The floating classes reset the browser's popover styles; `z-dropdown` layers the
 * panel where the popover API is missing.
 * Accessibility additions (Flowbite shows none): the trigger and links draw the solid `ring`
 * outline on keyboard focus, and the current page's link is `fg-brand`.
 */

export const megaMenuTriggerClassName = [
  "flex w-full cursor-pointer items-center justify-between border-b border-light px-3 py-2 font-medium text-heading hover:bg-neutral-secondary-soft",
  "md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-fg-brand",
  focusOutline,
].join(" ");

/** Flowbite's `w-4 h-4 ms-1.5` chevron after the label. */
export const megaMenuChevronClassName = "ms-1.5 size-4 shrink-0";

const floating =
  "data-[mode=floating]:fixed data-[mode=floating]:inset-auto data-[mode=floating]:z-dropdown data-[mode=floating]:m-0 data-[mode=floating]:overflow-visible";

export const megaMenuContentVariants = cva(["outline-hidden", floating], {
  variants: {
    fullWidth: {
      false:
        "grid w-auto rounded-base border border-default bg-neutral-primary-soft text-sm shadow-sm data-[mode=inline]:mt-2",
      true: "border-y border-default bg-neutral-primary-soft font-normal shadow-xs data-[mode=inline]:mt-1",
    },
    /* Columns from `md` up. Anchored panels show two below that, like Flowbite's. */
    columns: { 1: "", 2: "", 3: "", 4: "" },
  },
  compoundVariants: [
    { fullWidth: false, columns: 2, className: "grid-cols-2" },
    { fullWidth: false, columns: 3, className: "grid-cols-2 md:grid-cols-3" },
    { fullWidth: false, columns: 4, className: "grid-cols-2 md:grid-cols-4" },
  ],
  defaultVariants: { fullWidth: false, columns: 3 },
});

/** The centred grid inside a full-width panel. Stacked columns are 16px apart on small screens. */
export const megaMenuFullWidthInnerVariants = cva(
  "mx-auto grid max-w-screen-xl gap-y-4 px-4 py-5 text-sm text-body has-[[data-description]]:gap-y-0 md:gap-y-0 md:px-6",
  {
    variants: {
      columns: {
        1: "",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-2 md:grid-cols-3",
        4: "sm:grid-cols-2 md:grid-cols-4",
      },
    },
    defaultVariants: { columns: 3 },
  },
);

/**
 * A column of links. In the anchored panel each column is padded (`p-4`, with no bottom padding
 * on the first row when the columns wrap); in the full-width panel the grid spaces them.
 */
export const megaMenuGroupVariants = cva("", {
  variants: {
    layout: {
      anchored: "space-y-3 p-4 pb-0 last:pb-4 md:pb-4",
      full: "space-y-3 has-[[data-description]]:space-y-0",
    },
  },
  defaultVariants: { layout: "anchored" },
});

export const megaMenuLinkVariants = cva([focusOutline, "aria-[current=page]:text-fg-brand"], {
  variants: {
    layout: { anchored: "", full: "" },
    /* A link with a title and a description: Flowbite's full-width "block p-3" rows. */
    description: {
      false:
        "inline-flex items-center rounded-xs text-body hover:text-fg-brand [&>svg]:me-1.5 [&>svg]:size-4 [&>svg]:shrink-0",
      true: "block rounded-lg p-3 hover:bg-neutral-secondary-medium",
    },
  },
  compoundVariants: [{ layout: "full", description: false, className: "hover:underline" }],
  defaultVariants: { layout: "anchored", description: false },
});

export const megaMenuLinkTitleClassName = "block text-base font-semibold text-heading";
export const megaMenuLinkDescriptionClassName = "block text-sm text-body";

export type MegaMenuContentVariantProps = VariantProps<typeof megaMenuContentVariants>;
