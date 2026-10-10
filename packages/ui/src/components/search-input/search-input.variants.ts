import { cva, type VariantProps } from "class-variance-authority";

/*
 * Search bar: the shared field with a 16px search icon and, optionally, a small brand button inside
 * the field's end. With a button the field grows one padding step (`p-3` at the base size) so the
 * button keeps a 6px inset, and reserves room at the end so text never runs under it.
 */
export const searchInputFieldVariants = cva("", {
  variants: {
    size: {
      sm: "py-2.5 pe-24",
      md: "py-3 pe-24",
      lg: "py-3.5 pe-28",
      xl: "py-4 pe-28",
    },
  },
  defaultVariants: { size: "md" },
});

/** The inline submit button: `absolute end-1.5 bottom-1.5 … rounded text-xs px-3 py-1.5`. */
export const searchInputButtonVariants = cva("absolute top-1/2 -translate-y-1/2 rounded", {
  variants: {
    size: {
      sm: "end-1",
      md: "end-1.5",
      lg: "end-2",
      xl: "end-2.5",
    },
  },
  defaultVariants: { size: "md" },
});

export type SearchInputVariantProps = VariantProps<typeof searchInputFieldVariants>;
