import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4 alerts, class for class (https://flowbite.com/docs/components/alerts/), on our
 * semantic tokens, which carry Flowbite's role names. Flowbite's "Info" alert is `brand` and its
 * gray "Dark" alert is `dark`. All label and fill pairings pass WCAG 2.2 AA as in Flowbite.
 */
export const alertVariants = cva("flex items-start gap-2 rounded-base p-4 text-sm", {
  variants: {
    variant: {
      brand: "border-brand-subtle bg-brand-softer text-fg-brand-strong",
      danger: "border-danger-subtle bg-danger-soft text-fg-danger-strong",
      success: "border-success-subtle bg-success-soft text-fg-success-strong",
      warning: "border-warning-subtle bg-warning-soft text-fg-warning",
      dark: "border-default-medium bg-neutral-secondary-medium text-heading",
    },
    bordered: {
      true: "border",
      false: "",
    },
    /** Flowbite's "Border accent": a 4px top border and square corners. */
    accentBorder: {
      true: "rounded-none border-t-4",
      false: "",
    },
  },
  defaultVariants: { variant: "brand", bordered: false, accentBorder: false },
});

/** The 16px icon before the content, centred on the first line. */
export const alertIconClassName = "mt-0.5 shrink-0 [&_svg]:size-4";

/** Flowbite's 32px close button, pulled into the padding so it lines up with the text. */
export const alertDismissVariants = cva(
  [
    "-mx-1.5 -my-1.5 ms-auto inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded p-1.5",
    "transition-colors focus:ring-2 motion-reduce:transition-none [&_svg]:size-4",
    focusOutline,
  ],
  {
    variants: {
      variant: {
        brand: "hover:bg-brand-soft focus:ring-brand-medium",
        danger: "hover:bg-danger-medium focus:ring-danger-medium",
        success: "hover:bg-success-medium focus:ring-success-medium",
        warning: "hover:bg-warning-medium focus:ring-warning-medium",
        dark: "hover:bg-neutral-tertiary-medium focus:ring-neutral-tertiary",
      },
    },
    defaultVariants: { variant: "brand" },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
