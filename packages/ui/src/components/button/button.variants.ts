import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { focusOutline } from "../../lib/focus";

/** Intents that can also be drawn as an outline (Flowbite's "Outline buttons"). */
export const buttonOutlineVariants = [
  "brand",
  "secondary",
  "success",
  "danger",
  "warning",
] as const;

/*
 * Flowbite v4 buttons, class for class (https://flowbite.com/docs/components/buttons/), on our
 * semantic tokens, which carry Flowbite's role names. Accessibility deviations:
 * - keyboard focus adds the solid `ring` outline around Flowbite's soft halo (see lib/focus);
 * - outline success / danger / warning labels use the `fg-*` text tokens, which keep 4.5:1 in
 *   dark mode, and the warning label is dark (`warning-foreground`) instead of white.
 */
const button = cva(
  [
    "relative box-border inline-flex shrink-0 cursor-pointer items-center justify-center rounded-base border font-medium whitespace-nowrap select-none",
    "focus:ring-4",
    focusOutline,
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Flowbite's disabled button; a loading button keeps its colours.
    "disabled:pointer-events-none disabled:not-aria-busy:border-default-medium disabled:not-aria-busy:bg-disabled disabled:not-aria-busy:text-fg-disabled",
  ],
  {
    variants: {
      variant: {
        brand:
          "border-transparent bg-brand text-brand-foreground shadow-xs hover:bg-brand-strong focus:ring-brand-medium",
        secondary:
          "border-default-medium bg-neutral-secondary-medium text-body shadow-xs hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-neutral-tertiary",
        tertiary:
          "border-default bg-neutral-primary-soft text-body shadow-xs hover:bg-neutral-secondary-medium hover:text-heading focus:ring-neutral-tertiary-soft",
        success:
          "border-transparent bg-success text-success-foreground shadow-xs hover:bg-success-strong focus:ring-success-medium",
        danger:
          "border-transparent bg-danger text-danger-foreground shadow-xs hover:bg-danger-strong focus:ring-danger-medium",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-xs hover:bg-warning-strong focus:ring-warning-medium",
        dark: "border-transparent bg-dark text-dark-foreground shadow-xs hover:bg-dark-strong focus:ring-neutral-tertiary",
        ghost:
          "border-transparent bg-transparent text-heading hover:bg-neutral-secondary-medium focus:ring-neutral-tertiary",
      },
      outline: {
        true: "bg-neutral-primary shadow-none",
        false: "",
      },
      size: {
        xs: "gap-1.5 px-3 py-1.5 text-xs leading-5 [&_svg]:size-3.5",
        sm: "gap-1.5 px-3 py-2 text-sm leading-5 [&_svg]:size-4",
        md: "gap-1.5 px-4 py-2.5 text-sm leading-5 [&_svg]:size-4",
        lg: "gap-2 px-5 py-3 text-base [&_svg]:size-4",
        xl: "gap-2 px-6 py-3.5 text-base [&_svg]:size-5",
      },
      pill: {
        true: "rounded-full",
        false: "",
      },
      iconOnly: {
        true: "p-0 [&_svg]:size-5",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // Outline buttons: coloured border and label on the page, filled on hover.
      {
        outline: true,
        variant: "brand",
        className:
          "border-brand text-fg-brand hover:bg-brand hover:text-brand-foreground focus:ring-brand-subtle",
      },
      {
        outline: true,
        variant: "secondary",
        className:
          "border-default text-body hover:bg-neutral-secondary-soft hover:text-heading focus:ring-neutral-tertiary",
      },
      {
        outline: true,
        variant: "success",
        className:
          "border-success text-fg-success hover:bg-success hover:text-success-foreground focus:ring-neutral-tertiary",
      },
      {
        outline: true,
        variant: "danger",
        className:
          "border-danger text-fg-danger hover:bg-danger hover:text-danger-foreground focus:ring-neutral-tertiary",
      },
      {
        outline: true,
        variant: "warning",
        className:
          "border-warning text-fg-warning hover:bg-warning hover:text-warning-foreground focus:ring-neutral-tertiary",
      },
      // Flowbite's icon buttons are square: 32, 36 and 40px, with a 20px icon.
      { iconOnly: true, size: "xs", className: "size-8 [&_svg]:size-4" },
      { iconOnly: true, size: "sm", className: "size-9" },
      { iconOnly: true, size: "md", className: "size-10" },
      { iconOnly: true, size: "lg", className: "size-12" },
      { iconOnly: true, size: "xl", className: "size-14 [&_svg]:size-6" },
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
 * such as a link: `<a className={buttonVariants({ variant: "tertiary" })}>`.
 * Conflicting utilities are merged, so later options (outline, icon-only) always win.
 */
export function buttonVariants(options?: Parameters<typeof button>[0]) {
  return cn(button(options));
}
