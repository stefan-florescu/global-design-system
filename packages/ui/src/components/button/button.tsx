import type { ComponentProps } from "react";

import { Spinner } from "../spinner";

import {
  buttonVariants,
  type ButtonVariantProps,
  type buttonOutlineVariants,
} from "./button.variants";

type OutlineVariant = (typeof buttonOutlineVariants)[number];

type ButtonStyleProps = Omit<ButtonVariantProps, "variant" | "outline"> &
  (
    | {
        /** Visual intent. `brand` is the default call to action. */
        variant?: OutlineVariant;
        /** Draw the intent as an outline: transparent fill, coloured border and label. */
        outline?: boolean;
      }
    | {
        variant: "tertiary" | "dark" | "ghost";
        outline?: never;
      }
  );

export type ButtonProps = ComponentProps<"button"> &
  ButtonStyleProps & {
    /**
     * Shows a spinner, disables the button and sets `aria-busy`. Keep the label visible
     * so screen readers still announce what is in progress.
     */
    loading?: boolean;
  };

/**
 * Triggers an action. Renders a native `<button>` that defaults to `type="button"`.
 *
 * Icon-only buttons (`iconOnly`) must have an `aria-label`.
 */
export function Button({
  className,
  variant,
  outline,
  size,
  pill,
  iconOnly,
  fullWidth,
  loading = false,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  // Flowbite's loader button: the spinner in the label colour, or brand on neutral surfaces.
  // The button's `[&_svg]:size-*` sizes it.
  const neutral = variant === "secondary" || variant === "tertiary" || variant === "ghost";
  const spinner = <Spinner decorative size={null} variant={neutral ? "brand" : "current"} />;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-slot="button"
      className={buttonVariants({ variant, outline, size, pill, iconOnly, fullWidth, className })}
      {...props}
    >
      {loading && iconOnly ? (
        spinner
      ) : (
        <>
          {loading ? spinner : null}
          {children}
        </>
      )}
    </button>
  );
}
