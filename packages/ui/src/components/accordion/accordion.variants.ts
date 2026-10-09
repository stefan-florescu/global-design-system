import { cva, type VariantProps } from "class-variance-authority";

import { focusOutlineInset } from "../../lib/focus";

/*
 * Flowbite v4 accordions, class for class (https://flowbite.com/docs/components/accordion/), on
 * our semantic tokens. Flowbite's script swaps "active" and "inactive" classes on the title; here
 * they hang off `data-state` instead:
 * - default (`neutral`): `neutral-primary` title, `neutral-secondary-medium` + `heading` when open
 *   or hovered, in a `rounded-base` bordered box with `shadow-xs`;
 * - `brand` ("Color options"): the hover turns `brand-softer` + `fg-brand`;
 * - `separated` ("Separated cards"): every item is its own card, 1rem apart;
 * - `flush`: no box, no side padding, a `default` hairline under every title and panel.
 */
export const accordionVariants = cva("text-base", {
  variants: {
    flush: {
      true: "",
      false: "",
    },
    separated: {
      true: "flex flex-col gap-4",
      false: "",
    },
  },
  compoundVariants: [
    {
      flush: false,
      separated: false,
      className:
        "divide-y divide-default overflow-hidden rounded-base border border-default shadow-xs",
    },
  ],
  defaultVariants: { flush: false, separated: false },
});

/** The last item's panel has no divider above it, as in Flowbite. */
export const accordionItemClassName = "[&:last-child>[data-slot=accordion-content]]:border-t-0";

export const accordionTriggerVariants = cva(
  [
    "group flex w-full cursor-pointer items-center justify-between gap-3 text-start font-medium text-body",
    "transition-colors motion-reduce:transition-none",
    focusOutlineInset,
    "disabled:pointer-events-none disabled:text-fg-disabled",
    "[&_svg]:size-5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: "",
        brand: "",
      },
      flush: {
        true: "border-b border-default bg-neutral-primary py-5 data-[state=open]:text-heading",
        false:
          "bg-neutral-primary p-5 data-[state=open]:bg-neutral-secondary-medium data-[state=open]:text-heading",
      },
      separated: {
        true: "rounded-base border border-default shadow-xs data-[state=open]:rounded-b-none data-[state=open]:shadow-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        flush: false,
        variant: "neutral",
        className: "hover:bg-neutral-secondary-medium hover:text-heading",
      },
      { flush: false, variant: "brand", className: "hover:bg-brand-softer hover:text-fg-brand" },
      { flush: true, variant: "brand", className: "hover:text-fg-brand" },
    ],
    defaultVariants: { variant: "neutral", flush: false, separated: false },
  },
);

/** The chevron turns to point up while its item is open. */
export const accordionIconClassName =
  "transition-transform motion-reduce:transition-none group-data-[state=open]:rotate-180";

export const accordionContentVariants = cva("text-body", {
  variants: {
    flush: {
      true: "border-b border-default py-5",
      false: "border-t border-default p-4 md:p-5",
    },
    separated: {
      true: "rounded-b-base border border-default shadow-xs",
      false: "",
    },
  },
  compoundVariants: [{ separated: true, className: "border-t-0" }],
  defaultVariants: { flush: false, separated: false },
});

export type AccordionVariantProps = VariantProps<typeof accordionVariants> &
  Pick<VariantProps<typeof accordionTriggerVariants>, "variant">;
