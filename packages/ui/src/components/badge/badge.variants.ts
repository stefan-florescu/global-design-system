import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Badges on our semantic tokens. Every variant sets its border and ring colour; `bordered` turns
 * them on (a border, or an inset ring on large badges). All label and fill pairings pass
 * WCAG 2.2 AA.
 */
export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center rounded font-medium whitespace-nowrap [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "border-brand-subtle bg-brand-softer text-fg-brand-strong ring-brand-subtle",
        alternative: "border-default bg-neutral-primary-soft text-heading ring-default",
        gray: "border-default-medium bg-neutral-secondary-medium text-heading ring-default-medium",
        danger: "border-danger-subtle bg-danger-soft text-fg-danger-strong ring-danger-subtle",
        success: "border-success-subtle bg-success-soft text-fg-success-strong ring-success-subtle",
        warning: "border-warning-subtle bg-warning-soft text-fg-warning ring-warning-subtle",
      },
      size: {
        sm: "gap-1 px-1.5 py-0.5 text-xs [&_svg]:size-3",
        lg: "gap-1.5 px-2 py-1 text-sm has-[>svg]:leading-none [&_svg]:size-3.5",
      },
      bordered: {
        true: "",
        false: "",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
      iconOnly: {
        true: "rounded-full p-0",
        false: "",
      },
      /** Set by `Badge` when it renders a link: a hover fill. */
      link: {
        true: "transition-colors motion-reduce:transition-none",
        false: "",
      },
      /** Set by `Badge` when it has a remove button: chip padding. */
      dismissible: {
        true: "pe-0.5",
        false: "",
      },
    },
    compoundVariants: [
      { bordered: true, size: "sm", className: "border" },
      // Large bordered badges draw an inset ring, so they keep the large height.
      { bordered: true, size: "lg", className: "ring-1 ring-inset" },
      { iconOnly: true, size: "sm", className: "size-5" },
      { iconOnly: true, size: "lg", className: "size-6 text-xs" },
      { link: true, variant: "brand", className: "hover:bg-brand-soft" },
      { link: true, variant: "alternative", className: "hover:bg-neutral-secondary-medium" },
      { link: true, variant: "gray", className: "hover:bg-neutral-tertiary-medium" },
      { link: true, variant: "danger", className: "hover:bg-danger-medium" },
      { link: true, variant: "success", className: "hover:bg-success-medium" },
      { link: true, variant: "warning", className: "hover:bg-warning-medium" },
    ],
    defaultVariants: {
      variant: "brand",
      size: "sm",
      bordered: false,
      pill: false,
      iconOnly: false,
      link: false,
      dismissible: false,
    },
  },
);

/** Focus for a badge rendered as a link. */
export const badgeLinkClassName = focusOutline;

/** The dot before the label ("Badges with dot"), in the label colour. */
export const badgeDotVariants = cva("size-1.5 shrink-0 rounded-full", {
  variants: {
    variant: {
      brand: "bg-fg-brand-strong",
      alternative: "bg-heading",
      gray: "bg-heading",
      danger: "bg-fg-danger-strong",
      success: "bg-fg-success-strong",
      warning: "bg-fg-warning",
    },
  },
  defaultVariants: { variant: "brand" },
});

/** The remove button of a dismissible badge (chip). */
export const badgeDismissVariants = cva(
  [
    "inline-flex cursor-pointer items-center rounded-xs bg-transparent p-0.5 text-sm",
    "transition-colors motion-reduce:transition-none [&_svg]:size-3",
    focusOutline,
  ],
  {
    variants: {
      variant: {
        brand: "hover:bg-brand-soft",
        alternative: "hover:bg-neutral-tertiary",
        gray: "hover:bg-neutral-quaternary",
        danger: "hover:bg-danger-medium",
        success: "hover:bg-success-medium",
        warning: "hover:bg-warning-medium",
      },
    },
    defaultVariants: { variant: "brand" },
  },
);

export type BadgeVariantProps = Omit<VariantProps<typeof badgeVariants>, "link" | "dismissible">;
