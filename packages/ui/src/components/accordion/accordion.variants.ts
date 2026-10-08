import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's accordion, mapped to semantic tokens: hairlines use `border`, closed titles
 * `muted-foreground`, hover `accent`, and the open title either `muted` + `foreground`
 * (neutral) or `brand-subtle` + `brand-subtle-foreground` (brand). Open state is read
 * from `data-state` on the trigger.
 */
export const accordionVariants = cva("divide-y divide-border text-sm", {
  variants: {
    flush: {
      true: "border-b border-border",
      false: "overflow-hidden rounded-lg border border-border",
    },
  },
  defaultVariants: { flush: false },
});

export const accordionTriggerVariants = cva(
  [
    "group flex w-full cursor-pointer items-center justify-between gap-3 py-5 text-left font-medium text-muted-foreground",
    "transition-colors motion-reduce:transition-none",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        neutral: "",
        brand: "",
      },
      flush: {
        true: "px-0 hover:text-foreground data-[state=open]:text-foreground",
        false: "px-5 hover:bg-accent hover:text-accent-foreground",
      },
    },
    compoundVariants: [
      {
        flush: false,
        variant: "neutral",
        className: "data-[state=open]:bg-muted data-[state=open]:text-foreground",
      },
      {
        flush: false,
        variant: "brand",
        className:
          "data-[state=open]:bg-brand-subtle data-[state=open]:text-brand-subtle-foreground",
      },
      {
        flush: true,
        variant: "brand",
        className: "data-[state=open]:text-brand-subtle-foreground",
      },
    ],
    defaultVariants: { variant: "neutral", flush: false },
  },
);

/** The chevron turns to point up while its item is open. */
export const accordionIconClassName =
  "ml-auto transition-transform motion-reduce:transition-none group-data-[state=open]:rotate-180";

export const accordionContentVariants = cva("border-t border-border py-5 text-muted-foreground", {
  variants: {
    flush: {
      true: "px-0",
      false: "px-5",
    },
  },
  defaultVariants: { flush: false },
});

export type AccordionVariantProps = VariantProps<typeof accordionVariants> &
  VariantProps<typeof accordionTriggerVariants>;
