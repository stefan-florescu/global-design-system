import { LoaderCircle } from "@stefan-florescu/icons";
import type { ComponentProps } from "react";

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
  const spinner = <LoaderCircle aria-hidden className="animate-spin motion-reduce:animate-none" />;

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
