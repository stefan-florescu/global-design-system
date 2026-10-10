import { cva, type VariantProps } from "class-variance-authority";

/*
 * Tooltip: `px-3 py-2 text-sm font-medium` with `rounded-base` corners and `shadow-xs`, fading
 * in with `transition-opacity duration-300`. `dark` is the default `bg-dark` fill with
 * `dark-foreground` text; `light` is `neutral-primary-medium` with `heading` text and a `default`
 * border.
 *
 * The tooltip is a native popover (top layer), so the first group of classes resets the browser's
 * popover styles; `z-tooltip` layers it where the popover API is missing. The fade starts from
 * `@starting-style` and is dropped when the user prefers reduced motion.
 */
export const tooltipVariants = cva(
  [
    "fixed inset-auto z-tooltip m-0 overflow-visible outline-hidden",
    "rounded-base px-3 py-2 text-sm font-medium shadow-xs",
    "transition-opacity duration-300 starting:open:opacity-0 motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        dark: "bg-dark text-dark-foreground",
        light: "border border-default bg-neutral-primary-medium text-heading",
      },
    },
    defaultVariants: { variant: "dark" },
  },
);

export type TooltipVariantProps = VariantProps<typeof tooltipVariants>;

/*
 * The arrow: an 8px square in the tooltip's colour, turned 45° and 3px outside the tooltip. The
 * light tooltip's arrow has a `neutral-tertiary` border on its two outer sides. The side comes from
 * where the tooltip ended up, after any flip.
 */
export const tooltipArrowVariants = cva(
  "pointer-events-none absolute size-2 rotate-45 border-neutral-tertiary bg-inherit",
  {
    variants: {
      side: {
        top: "-bottom-0.75",
        right: "-left-0.75",
        bottom: "-top-0.75",
        left: "-right-0.75",
      },
      variant: {
        dark: "",
        light: "",
      },
    },
    compoundVariants: [
      { variant: "light", side: "top", className: "border-r border-b" },
      { variant: "light", side: "right", className: "border-b border-l" },
      { variant: "light", side: "bottom", className: "border-t border-l" },
      { variant: "light", side: "left", className: "border-t border-r" },
    ],
    defaultVariants: { side: "top", variant: "dark" },
  },
);

export type TooltipArrowVariantProps = VariantProps<typeof tooltipArrowVariants>;
