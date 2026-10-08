import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's badges, mapped to semantic tokens: each intent uses its `-subtle` surface and
 * `-subtle-foreground` text; `neutral` uses `secondary`. Borders reuse the text colour.
 */
export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-sm font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        brand: "bg-brand-subtle text-brand-subtle-foreground",
        neutral: "bg-secondary text-secondary-foreground",
        info: "bg-info-subtle text-info-subtle-foreground",
        success: "bg-success-subtle text-success-subtle-foreground",
        warning: "bg-warning-subtle text-warning-subtle-foreground",
        destructive: "bg-destructive-subtle text-destructive-subtle-foreground",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs [&_svg]:size-3",
        lg: "px-3 py-0.5 text-sm [&_svg]:size-3.5",
      },
      bordered: {
        true: "border border-current/40",
        false: "",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
      iconOnly: {
        true: "aspect-square rounded-full p-0",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "size-6" },
      { iconOnly: true, size: "lg", className: "size-7" },
    ],
    defaultVariants: {
      variant: "brand",
      size: "sm",
      bordered: false,
      pill: false,
      iconOnly: false,
    },
  },
);

export const badgeLinkClassName =
  "no-underline transition hover:brightness-95 motion-reduce:transition-none outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

export const badgeDismissClassName = [
  "-mr-1 ml-0.5 inline-flex size-4 cursor-pointer items-center justify-center rounded-xs",
  "transition-colors hover:bg-current/15 motion-reduce:transition-none",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
  "[&_svg]:size-3",
].join(" ");

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
