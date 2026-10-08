import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's alerts, mapped to semantic tokens: each intent uses its `-subtle` surface with
 * `-subtle-foreground` text (pairs the themes build checks for contrast); `neutral` uses
 * `muted` + `foreground`. Borders reuse the text colour so they always match the intent.
 */
export const alertVariants = cva("flex gap-3 rounded-lg p-4 text-sm", {
  variants: {
    variant: {
      info: "bg-info-subtle text-info-subtle-foreground",
      success: "bg-success-subtle text-success-subtle-foreground",
      warning: "bg-warning-subtle text-warning-subtle-foreground",
      destructive: "bg-destructive-subtle text-destructive-subtle-foreground",
      neutral: "bg-muted text-foreground",
    },
    bordered: {
      true: "border border-current/40",
      false: "",
    },
    accentBorder: {
      true: "rounded-none border-t-4 border-current",
      false: "",
    },
  },
  defaultVariants: { variant: "info", bordered: false, accentBorder: false },
});

export const alertIconClassName = "mt-0.5 shrink-0 [&_svg]:size-4";

export const alertDismissClassName = [
  "-m-1.5 ml-auto inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg p-1.5",
  "transition-colors hover:bg-current/10 motion-reduce:transition-none",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
  "[&_svg]:size-4",
].join(" ");

export type AlertVariantProps = VariantProps<typeof alertVariants>;
