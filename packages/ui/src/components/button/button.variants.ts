import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

/** Intents that have a filled surface and can also be drawn as an outline. */
export const buttonOutlineVariants = [
  "brand",
  "primary",
  "success",
  "warning",
  "destructive",
  "info",
] as const;

/*
 * Every value maps to a semantic token through the Tailwind preset: fills use
 * `bg-<intent>` + `text-<intent>-foreground`; outlines use the `<intent>-subtle-foreground`
 * label on the page background and the `<intent>-subtle` hover surface. The themes build
 * checks each of these pairs for WCAG contrast in every theme.
 */
const button = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg text-center font-medium whitespace-nowrap select-none",
    "transition motion-reduce:transition-none",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        brand: "bg-brand text-brand-foreground hover:brightness-90",
        primary: "bg-primary text-primary-foreground hover:brightness-90",
        secondary: "bg-secondary text-secondary-foreground hover:brightness-95",
        success: "bg-success text-success-foreground hover:brightness-90",
        warning: "bg-warning text-warning-foreground hover:brightness-90",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-90",
        info: "bg-info text-info-foreground hover:brightness-90",
        outline:
          "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      outline: {
        true: "border border-current bg-transparent hover:brightness-100",
        false: "",
      },
      size: {
        xs: "h-8 gap-1.5 px-3 text-xs [&_svg]:size-3.5",
        sm: "h-9 gap-2 px-3 text-sm [&_svg]:size-4",
        md: "h-10 gap-2 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 gap-2.5 px-5 text-base [&_svg]:size-5",
        xl: "h-13 gap-2.5 px-6 text-base [&_svg]:size-5",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
      iconOnly: {
        true: "aspect-square px-0",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // Links size to their text; listed here so it wins over the size padding.
      { variant: "link", className: "h-auto px-0" },
      {
        outline: true,
        variant: "brand",
        className: "text-brand-subtle-foreground hover:bg-brand-subtle",
      },
      {
        outline: true,
        variant: "primary",
        className: "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      {
        outline: true,
        variant: "success",
        className: "text-success-subtle-foreground hover:bg-success-subtle",
      },
      {
        outline: true,
        variant: "warning",
        className: "text-warning-subtle-foreground hover:bg-warning-subtle",
      },
      {
        outline: true,
        variant: "destructive",
        className: "text-destructive-subtle-foreground hover:bg-destructive-subtle",
      },
      {
        outline: true,
        variant: "info",
        className: "text-info-subtle-foreground hover:bg-info-subtle",
      },
    ],
    defaultVariants: {
      variant: "brand",
      outline: false,
      size: "md",
      pill: false,
      iconOnly: false,
      fullWidth: false,
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof button>;

/**
 * Class names for a button. Use it to style an element that is not a `<button>`,
 * such as a link: `<a className={buttonVariants({ variant: "outline" })}>`.
 * Conflicting utilities are merged, so later options (outline, link) always win.
 */
export function buttonVariants(options?: Parameters<typeof button>[0]) {
  return cn(button(options));
}
