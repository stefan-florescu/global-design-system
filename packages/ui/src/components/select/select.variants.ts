import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4 select (https://flowbite.com/docs/forms/select/), on the shared field styles (see
 * input.variants.ts). Flowbite keeps `text-sm` at every size, so the select does too. The
 * chevron replaces the one Flowbite's plugin draws as a background image; `pe-10` is the room
 * that plugin reserves for it. The underline border is the `input` token. List selects
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

/** Flowbite's chevron: about 10px wide, `body-subtle` (gray-500), 13px from the end edge. */
export const selectChevronClassName =
  "pointer-events-none absolute end-2 top-1/2 size-5 -translate-y-1/2 text-body-subtle";

export type SelectVariantProps = Omit<VariantProps<typeof selectVariants>, "list">;
