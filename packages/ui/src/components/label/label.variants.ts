import { cva, type VariantProps } from "class-variance-authority";

/*
 * Field label: `block mb-2.5 text-sm font-medium text-heading`. `success` and `danger` colour the
 * label to match a validation state; `disabled` mutes it when its control is disabled.
 */
export const labelVariants = cva("mb-2.5 block text-sm font-medium", {
  variants: {
    variant: {
      default: "text-heading",
      success: "text-fg-success-strong",
      danger: "text-fg-danger-strong",
    },
    disabled: {
      true: "cursor-not-allowed text-body",
      false: "",
    },
  },
  defaultVariants: { variant: "default", disabled: false },
});

export type LabelVariantProps = VariantProps<typeof labelVariants>;
