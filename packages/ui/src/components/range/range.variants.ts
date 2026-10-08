import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's range slider: a `border` track with a `brand` thumb (3:1 against the page). The
 * native control is kept, so keyboard, touch and assistive technology work as usual.
 */
export const rangeVariants = cva(
  [
    "w-full cursor-pointer appearance-none rounded-full bg-border accent-brand",
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-brand",
    "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-brand",
    "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-1 [&::-moz-range-thumb]:size-3 [&::-webkit-slider-thumb]:size-3",
        md: "h-2 [&::-moz-range-thumb]:size-4 [&::-webkit-slider-thumb]:size-4",
        lg: "h-3 [&::-moz-range-thumb]:size-5 [&::-webkit-slider-thumb]:size-5",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type RangeVariantProps = VariantProps<typeof rangeVariants>;
