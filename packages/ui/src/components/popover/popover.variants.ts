import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4's popover (https://flowbite.com/docs/components/popover/), class for class: a `w-64`
 * panel of `text-sm text-body` on `neutral-primary-soft` with a `default` border, `rounded-base`
 * corners and `shadow-xs`, that fades in with `transition-opacity duration-300`.
 *
 * The panel is a native popover (top layer), so the first group of classes resets the browser's
 * popover styles (`p-0` included: set padding with `className`); `z-popover` layers it where the
 * popover API is missing. The fade starts from `@starting-style` and is dropped when the user
 * prefers reduced motion.
 */
export const popoverPanelClassName = [
  "fixed inset-auto z-popover m-0 overflow-visible p-0 outline-hidden",
  "w-64 rounded-base border border-default bg-neutral-primary-soft text-sm text-body shadow-xs",
  "transition-opacity duration-300 starting:open:opacity-0 motion-reduce:transition-none",
].join(" ");

/*
 * Flowbite's `data-popper-arrow`: an 8px square in the panel's colour, turned 45° and half
 * outside the panel, with the `neutral-tertiary` border (Flowbite's arrow border) on its two outer
 * sides. The side comes from where the panel ended up, after any flip.
 */
export const popoverArrowVariants = cva(
  "pointer-events-none absolute size-2 rotate-45 border-neutral-tertiary bg-inherit",
  {
    variants: {
      side: {
        top: "-bottom-1 border-r border-b",
        right: "-left-1 border-b border-l",
        bottom: "-top-1 border-t border-l",
        left: "-right-1 border-t border-r",
      },
    },
    defaultVariants: { side: "top" },
  },
);

export type PopoverArrowVariantProps = VariantProps<typeof popoverArrowVariants>;

/** Flowbite's title bar: `neutral-tertiary` with a `default` line under it. */
export const popoverHeaderClassName =
  "rounded-t-base border-b border-default bg-neutral-tertiary px-3 py-2";

/** Flowbite's popover heading (`h3`): `font-medium text-heading` at the panel's `text-sm`. */
export const popoverTitleClassName = "font-medium text-heading";

/** Flowbite's content row under the title bar. */
export const popoverBodyClassName = "px-3 py-2";
