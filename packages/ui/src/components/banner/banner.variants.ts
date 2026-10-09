import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4 sticky banners, class for class (https://flowbite.com/docs/components/banner/), on
 * our semantic tokens. A full-width `neutral-primary-soft` bar with a `default` hairline, pinned
 * to the top or bottom of the viewport on the `z.fixed` layer; `floating` is Flowbite's marketing
 * CTA card, 1rem in from the edges and 1.5rem from the top or bottom.
 */
export const bannerVariants = cva(
  "flex justify-between gap-2 border-default bg-neutral-primary-soft p-4 text-sm text-body",
  {
    variants: {
      position: {
        top: "fixed z-fixed",
        bottom: "fixed z-fixed",
        static: "relative w-full",
      },
      floating: {
        true: "flex-col rounded-base border shadow-xs md:flex-row",
        false: "",
      },
    },
    compoundVariants: [
      { floating: false, position: "top", className: "inset-x-0 top-0 border-b" },
      { floating: false, position: "bottom", className: "inset-x-0 bottom-0 border-t" },
      { floating: false, position: "static", className: "border-y" },
      { floating: true, position: "top", className: "inset-x-4 top-6 mx-auto lg:max-w-7xl" },
      { floating: true, position: "bottom", className: "inset-x-4 bottom-6 mx-auto lg:max-w-7xl" },
    ],
    defaultVariants: { position: "top", floating: false },
  },
);

/** Holds the close button at the end of the banner. */
export const bannerDismissWrapperClassName = "flex items-center";

/** Flowbite's 28px close button. */
export const bannerDismissClassName = [
  "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-sm text-body",
  "transition-colors hover:bg-neutral-tertiary hover:text-heading motion-reduce:transition-none",
  "[&_svg]:size-4",
  focusOutline,
].join(" ");

export type BannerVariantProps = VariantProps<typeof bannerVariants>;
