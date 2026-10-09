import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4 indicators, class for class (https://flowbite.com/docs/components/indicators/), on
 * our semantic tokens. A dot is Flowbite's `flex w-3 h-3 rounded-full`; a count is its
 * `w-6 h-6 text-xs font-bold rounded-full`, and `bordered` adds its `border-2 border-buffer` ring
 * that separates the indicator from what it overlaps. Flowbite's single-colour purple, indigo
 * and teal fills have no role here, so the colours are our status and neutral roles.
 */

/**
 * Absolute positions from Flowbite's "Indicator position" example: the indicator's centre sits on
 * the parent's edge or corner. The parent must be positioned (`relative`). Logical sides, so
 * `start` and `end` flip in right-to-left layouts.
 */
export const indicatorPlacementVariants = cva("absolute", {
  variants: {
    placement: {
      "top-start": "start-0 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
      "top-center": "start-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
      "top-end": "end-0 top-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2",
      "middle-start": "start-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
      "middle-center": "start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
      "middle-end": "end-0 top-1/2 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2",
      "bottom-start": "start-0 bottom-0 -translate-x-1/2 translate-y-1/2 rtl:translate-x-1/2",
      "bottom-center": "start-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rtl:translate-x-1/2",
      "bottom-end": "end-0 bottom-0 translate-x-1/2 translate-y-1/2 rtl:-translate-x-1/2",
    },
  },
});

export const indicatorVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gray: "bg-neutral-quaternary text-heading",
        dark: "bg-dark text-dark-foreground",
        brand: "bg-brand text-brand-foreground",
        success: "bg-success text-success-foreground",
        danger: "bg-danger text-danger-foreground",
        warning: "bg-warning text-warning-foreground",
      },
      size: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
      /** Set by `Indicator`: a plain dot, or a box that holds a count or an icon. */
      content: {
        dot: "",
        count: "px-0.5 font-bold tabular-nums",
        icon: "",
      },
      bordered: {
        true: "border-2 border-buffer",
        false: "",
      },
    },
    compoundVariants: [
      // Dots: 8, 10, 12 (Flowbite's default), 14 (its status dot) and 16px.
      { content: "dot", size: "xs", className: "size-2" },
      { content: "dot", size: "sm", className: "size-2.5" },
      { content: "dot", size: "md", className: "size-3" },
      { content: "dot", size: "lg", className: "size-3.5" },
      { content: "dot", size: "xl", className: "size-4" },
      // Counts and icons: 16 to 32px tall; `md` is Flowbite's 24px count. Long counts grow wider.
      { content: ["count", "icon"], size: "xs", className: "h-4 min-w-4 text-xs [&_svg]:size-2.5" },
      { content: ["count", "icon"], size: "sm", className: "h-5 min-w-5 text-xs [&_svg]:size-3" },
      { content: ["count", "icon"], size: "md", className: "h-6 min-w-6 text-xs [&_svg]:size-4" },
      { content: ["count", "icon"], size: "lg", className: "h-7 min-w-7 text-sm [&_svg]:size-4" },
      { content: ["count", "icon"], size: "xl", className: "h-8 min-w-8 text-sm [&_svg]:size-5" },
    ],
    defaultVariants: {
      variant: "brand",
      size: "md",
      content: "dot",
      bordered: false,
    },
  },
);

export type IndicatorVariantProps = Omit<VariantProps<typeof indicatorVariants>, "content"> &
  VariantProps<typeof indicatorPlacementVariants>;
