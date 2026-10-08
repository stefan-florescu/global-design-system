import { cva, type VariantProps } from "class-variance-authority";

/*
 * Native select on the shared field styles (see input.variants.ts), with room for the chevron.
 * `underline` keeps only a bottom border; its focus state thickens that border in `ring`.
 */
export const selectVariants = cva("cursor-pointer appearance-none", {
  variants: {
    variant: {
      default: "pe-9",
      underline:
        "rounded-none border-0 border-b bg-transparent ps-0 pe-7 focus-visible:border-b-2 focus-visible:ring-0",
    },
    list: {
      true: "h-auto py-2 pe-3",
      false: "",
    },
  },
  defaultVariants: { variant: "default", list: false },
});

export const selectChevronClassName =
  "pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";

export type SelectVariantProps = Omit<VariantProps<typeof selectVariants>, "list">;
