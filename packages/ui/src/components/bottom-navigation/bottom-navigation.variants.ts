import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's bottom navigation: a 64px bar fixed to the bottom of the viewport, on
 * `background` with a `border` hairline. Items are `muted-foreground`; hover and the current
 * page use `brand-subtle-foreground` (checked for contrast on `background` and `accent`).
 *
 * No z-index is set: the system has no layer tokens yet, so add one from your app's layer
 * scale when the bar must sit above positioned content.
 */
export const bottomNavigationVariants = cva("h-16 border-border bg-background", {
  variants: {
    position: {
      fixed: "fixed inset-x-0 bottom-0",
      static: "relative w-full",
    },
    floating: {
      true: "overflow-hidden rounded-full border shadow-md",
      false: "border-t",
    },
  },
  compoundVariants: [{ floating: true, position: "fixed", className: "inset-x-4 bottom-4" }],
  defaultVariants: { position: "fixed", floating: false },
});

export const bottomNavigationListVariants = cva("m-0 flex h-full list-none p-0", {
  variants: {
    bordered: {
      true: "divide-x divide-border border-x border-border",
      false: "",
    },
  },
  defaultVariants: { bordered: false },
});

export const bottomNavigationItemClassName = [
  "inline-flex size-full cursor-pointer flex-col items-center justify-center gap-1 px-5 text-sm font-medium text-muted-foreground no-underline",
  "transition-colors hover:bg-accent hover:text-brand-subtle-foreground motion-reduce:transition-none",
  "aria-[current=page]:text-brand-subtle-foreground aria-[current=true]:text-brand-subtle-foreground",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
  "[&_svg]:size-5 [&_svg]:shrink-0",
].join(" ");

export type BottomNavigationVariantProps = VariantProps<typeof bottomNavigationVariants> &
  VariantProps<typeof bottomNavigationListVariants>;
