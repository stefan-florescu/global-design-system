import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite v4 spinner, class for class (https://flowbite.com/docs/components/spinner/), on our
 * semantic tokens: a grey track (`fill-neutral-tertiary`) under a coloured arc that spins.
 *
 * Sizes are Flowbite's four (`w-4`, `w-6`, `w-8` default, `w-10`) as `xs`–`lg`, plus a 48px `xl`.
 * Colours are Flowbite's brand, dark, success, danger, warning, pink and purple. The arc is a
 * graphic that tells sighted users something is loading, so it keeps 3:1 against the track and
 * the page (WCAG 1.4.11) in both modes; Flowbite's fills fail that in places, so each colour uses
 * the nearest passing role:
 * - brand, success, danger: the `fg-*` roles (the same colour as Flowbite's in light mode, a
 *   lighter one in dark mode, where `bg-brand` & co. are 2.4–2.8:1 against the dark track);
 * - dark: `dark`, with `body` in dark mode instead of Flowbite's `quaternary` (1.4:1);
 * - warning: `fg-warning-subtle` (orange 600 / 500) instead of `warning` (2.6:1 in light mode);
 * - pink and purple: the `fg-pink` and `fg-purple` roles.
 * `current` draws the arc in the text colour over a 25% track of the same colour, for spinners
 * inside buttons and badges (Flowbite's loader button and badge loader).
 *
 * The spin stops when the user prefers reduced motion; the status text still says it is loading.
 */
export const spinnerVariants = cva("inline animate-spin motion-reduce:animate-none", {
  variants: {
    size: {
      xs: "size-4",
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-12",
    },
  },
  defaultVariants: { size: "md" },
});

/** The full circle under the arc. */
export const spinnerTrackVariants = cva("", {
  variants: {
    variant: {
      brand: "fill-neutral-tertiary",
      dark: "fill-neutral-tertiary",
      success: "fill-neutral-tertiary",
      danger: "fill-neutral-tertiary",
      warning: "fill-neutral-tertiary",
      pink: "fill-neutral-tertiary",
      purple: "fill-neutral-tertiary",
      current: "fill-current opacity-25",
    },
  },
  defaultVariants: { variant: "brand" },
});

/** The quarter arc that spins. */
export const spinnerArcVariants = cva("", {
  variants: {
    variant: {
      brand: "fill-fg-brand",
      dark: "fill-dark dark:fill-body",
      success: "fill-fg-success",
      danger: "fill-fg-danger",
      warning: "fill-fg-warning-subtle",
      pink: "fill-fg-pink",
      purple: "fill-fg-purple",
      current: "fill-current",
    },
  },
  defaultVariants: { variant: "brand" },
});

export type SpinnerVariantProps = VariantProps<typeof spinnerVariants> &
  VariantProps<typeof spinnerArcVariants>;
