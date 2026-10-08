import { cva, type VariantProps } from "class-variance-authority";

/*
 * Hint, error or success text under a control. Error and success use the `-subtle-foreground`
 * tokens, which the themes build checks against the page background.
 */
export const helperTextVariants = cva("m-0 text-sm", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      error: "text-destructive-subtle-foreground",
      success: "text-success-subtle-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export type HelperTextVariantProps = VariantProps<typeof helperTextVariants>;
