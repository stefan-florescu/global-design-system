import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4 rating, class for class (https://flowbite.com/docs/components/rating/): solid
 * stars 4px apart, filled in `fg-yellow` (Flowbite's `text-fg-yellow`, yellow-400) and empty in
 * `fg-disabled`. Sizes are Flowbite's "Star sizes": 20px (`sm`, the default), 24px and 28px.
 * Our `Star` icon is filled with `fill-current`; its 1.5 stroke rounds the points like Flowbite's.
 */
export const ratingVariants = cva("flex shrink-0 items-center gap-1", {
  variants: {
    size: {
      sm: "[&_svg]:size-5",
      md: "[&_svg]:size-6",
      lg: "[&_svg]:size-7",
    },
  },
  defaultVariants: { size: "sm" },
});

export const ratingStarVariants = cva("shrink-0 fill-current", {
  variants: {
    filled: {
      true: "text-fg-yellow",
      false: "text-fg-disabled",
    },
  },
  defaultVariants: { filled: true },
});

export type RatingVariantProps = VariantProps<typeof ratingVariants>;
