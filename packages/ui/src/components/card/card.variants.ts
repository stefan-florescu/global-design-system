import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4 card, class for class (https://flowbite.com/docs/components/card/): a
 * `neutral-primary-soft` surface with a `default` border, `rounded-base` corners and `shadow-xs`,
 * padded `p-6`. Link cards take Flowbite's `neutral-secondary-medium` hover. Accessibility
 * addition: link cards draw the solid keyboard outline from lib/focus.
 */
export const cardVariants = cva(
  "flex flex-col rounded-base border border-default bg-neutral-primary-soft shadow-xs",
  {
    variants: {
      horizontal: {
        true: "items-center p-6 md:flex-row",
        false: "",
      },
      interactive: {
        true: ["no-underline hover:bg-neutral-secondary-medium", focusOutline],
        false: "",
      },
    },
    defaultVariants: { horizontal: false, interactive: false },
  },
);

export const cardImageVariants = cva("", {
  variants: {
    horizontal: {
      true: "mb-4 h-64 w-full rounded-base object-cover md:mb-0 md:h-auto md:w-48",
      false: "w-full rounded-t-base",
    },
  },
  defaultVariants: { horizontal: false },
});

export const cardBodyVariants = cva("", {
  variants: {
    horizontal: {
      true: "flex flex-col justify-between leading-normal md:p-4",
      false: "p-6",
    },
  },
  defaultVariants: { horizontal: false },
});

export const cardTitleClassName =
  "mb-3 text-2xl leading-8 font-semibold tracking-tight text-heading";

export const cardDescriptionClassName = "text-body";

export type CardVariantProps = Omit<VariantProps<typeof cardVariants>, "interactive">;
