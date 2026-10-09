import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4's range slider (https://flowbite.com/docs/forms/range/), class for class:
 * `w-full h-2 bg-neutral-quaternary rounded-full appearance-none cursor-pointer`, with the thumb
 * styles of Flowbite's plugin rebuilt as utilities — a round `brand` thumb (20px; 16px `sm`,
 * 24px `lg`), `body` when disabled, a `brand-medium` halo on focus and a `brand` progress fill
 * in Firefox. The thumb is `brand`, 3:1 against the page. Keyboard focus also draws the solid
 * `ring` outline. The native control is kept, so keyboard, touch and assistive technology work
 * as usual.
 */
export const rangeVariants = cva(
  [
    "w-full cursor-pointer appearance-none rounded-full bg-neutral-quaternary disabled:cursor-not-allowed",
    "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-brand",
    "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-brand",
    "[&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-brand",
    "disabled:[&::-webkit-slider-thumb]:bg-body disabled:[&::-moz-range-thumb]:bg-body",
    "[&::-webkit-slider-thumb]:ring-brand-medium [&::-moz-range-thumb]:ring-brand-medium",
    "focus:[&::-webkit-slider-thumb]:ring-4 focus:[&::-moz-range-thumb]:ring-4",
    "forced-colors:appearance-auto",
    focusOutline,
    "focus-visible:outline-offset-4",
  ],
  {
    variants: {
      size: {
        sm: "h-1 [&::-moz-range-thumb]:size-4 [&::-webkit-slider-thumb]:size-4",
        md: "h-2 [&::-moz-range-thumb]:size-5 [&::-webkit-slider-thumb]:size-5",
        lg: "h-3 [&::-moz-range-thumb]:size-6 [&::-webkit-slider-thumb]:size-6",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type RangeVariantProps = VariantProps<typeof rangeVariants>;
