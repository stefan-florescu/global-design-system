import { cva, type VariantProps } from "class-variance-authority";

/* Flowbite's label: small, medium-weight `foreground` text; muted when its control is disabled. */
export const labelVariants = cva("text-sm font-medium text-foreground", {
  variants: {
    disabled: {
      true: "cursor-not-allowed text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: { disabled: false },
});

export type LabelVariantProps = VariantProps<typeof labelVariants>;
