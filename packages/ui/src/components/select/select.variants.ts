import { cva, type VariantProps } from "class-variance-authority";

/*
 * Select on the shared field styles (see input.variants.ts). It keeps `text-sm` at every size.
 * The chevron is an icon over the field rather than a background image; `pe-10` keeps room for
 * it. The underline border is the `input` token. List selects
 * (`multiple`, `htmlSize`) show no chevron, since they do not open a menu.
 */
export const selectVariants = cva("cursor-pointer appearance-none text-sm", {
  variants: {
    variant: {
      default: "pe-10",
      underline:
        "rounded-none border-0 border-b-2 border-input bg-transparent ps-0 pe-10 text-body shadow-none focus:border-brand focus:ring-0",
    },
    list: {
      true: "pe-3",
      false: "",
    },
  },
  defaultVariants: { variant: "default", list: false },
});

/** The chevron: about 10px wide, `body-subtle` (gray-500), 13px from the end edge. */
export const selectChevronClassName =
  "pointer-events-none absolute end-2 top-1/2 size-5 -translate-y-1/2 text-body-subtle";

export type SelectVariantProps = Omit<VariantProps<typeof selectVariants>, "list">;
