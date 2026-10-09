import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4's helper text, class for class: `mt-2.5 text-sm text-body`, with the validation
 * colours `fg-success-strong` and `fg-danger-strong`. The themes build checks each against the
 * page background (WCAG 1.4.3).
 */
export const helperTextVariants = cva("mt-2.5 text-sm", {
  variants: {
    variant: {
      default: "text-body",
      success: "text-fg-success-strong",
      danger: "text-fg-danger-strong",
    },
  },
  defaultVariants: { variant: "default" },
});

export type HelperTextVariantProps = VariantProps<typeof helperTextVariants>;
