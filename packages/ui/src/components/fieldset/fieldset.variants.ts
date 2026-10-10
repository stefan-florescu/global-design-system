import { cva, type VariantProps } from "class-variance-authority";

/* Groups related controls, such as radios or checkboxes, under one legend. */
export const fieldsetVariants = cva("m-0 flex min-w-0 border-0 p-0", {
  variants: {
    orientation: {
      vertical: "flex-col gap-3",
      horizontal: "flex-row flex-wrap gap-x-6 gap-y-3",
    },
  },
  defaultVariants: { orientation: "vertical" },
});

/* The legend looks like a `Label` (`block mb-2.5 text-sm font-medium text-heading`). */
export const fieldsetLegendClassName = "mb-2.5 block p-0 text-sm font-medium text-heading";

export type FieldsetVariantProps = VariantProps<typeof fieldsetVariants>;
