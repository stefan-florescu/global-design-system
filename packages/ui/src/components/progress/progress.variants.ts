import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4 progress bars, class for class (https://flowbite.com/docs/components/progress/), on
 * our semantic tokens. Flowbite's sizes are `h-1.5` (small), `h-2` (default) and `h-2.5` (large);
 * `xl` is the 16px bar of its "With label inside" example. Colours are the fills we have roles for:
 * Flowbite's dark, brand, success, danger and warning. flowbite-react's purple, indigo, teal, cyan,
 * lime, pink and gray have no fill role and are left out.
 */
export const progressTrackVariants = cva(
  "bg-neutral-quaternary w-full overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2",
        lg: "h-2.5",
        xl: "h-4",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const progressBarVariants = cva("h-full rounded-full", {
  variants: {
    variant: {
      brand: "bg-brand text-brand-foreground",
      dark: "bg-dark text-dark-foreground",
      success: "bg-success text-success-foreground",
      danger: "bg-danger text-danger-foreground",
      warning: "bg-warning text-warning-foreground",
    },
    /** Set by `Progress` when a label is drawn inside the bar. */
    labelled: {
      true: "flex items-center justify-center gap-2 p-0.5 text-center text-xs leading-none font-medium whitespace-nowrap",
      false: "",
    },
  },
  defaultVariants: { variant: "brand", labelled: false },
});

/** The row of labels above the bar ("With label outside"). */
export const progressLabelClassName = "text-body mb-1 flex justify-between text-sm font-medium";

export type ProgressVariantProps = VariantProps<typeof progressTrackVariants> &
  Omit<VariantProps<typeof progressBarVariants>, "labelled">;
