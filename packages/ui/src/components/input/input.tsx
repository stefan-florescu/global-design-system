import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  fieldAddonClassName,
  fieldIconClassName,
  fieldVariants,
  type FieldVariantProps,
} from "./input.variants";

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  FieldVariantProps & {
    /** Marks the value as wrong: red border and `aria-invalid`. Pair it with an error HelperText. */
    invalid?: boolean;
    /** Marks the value as accepted: green border. Pair it with a success HelperText. */
    valid?: boolean;
    /** Decorative icon inside the field, before the text. */
    startIcon?: ReactNode;
    /** Decorative icon inside the field, after the text. */
    endIcon?: ReactNode;
    /** Text or icon attached before the field, such as "@" or "https://". */
    addon?: ReactNode;
  };

/**
 * A single-line text field. Give it a visible `Label` (`htmlFor` = `id`) and reference any
 * `HelperText` from `aria-describedby`.
 */
export function Input({
  size,
  invalid,
  valid,
  startIcon,
  endIcon,
  addon,
  className,
  type = "text",
  ...props
}: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      aria-invalid={invalid || undefined}
      data-valid={valid || undefined}
      className={cn(
        fieldVariants({ size }),
        startIcon && "ps-9",
        endIcon && "pe-9",
        addon && "rounded-s-none shadow-none",
        className,
      )}
      {...props}
    />
  );

  if (!startIcon && !endIcon && !addon) return input;

  return (
    <div className={cn("relative flex w-full", addon && "rounded-base shadow-xs")}>
      {addon ? (
        <span className={cn(fieldAddonClassName, "rounded-s-base border-e-0")}>{addon}</span>
      ) : null}
      <div className="relative w-full">
        {input}
        {/* After the field, so they paint above it even while a focused field is raised. */}
        {startIcon ? (
          <span aria-hidden className={cn(fieldIconClassName, "start-0 ps-3")}>
            {startIcon}
          </span>
        ) : null}
        {endIcon ? (
          <span aria-hidden className={cn(fieldIconClassName, "end-0 pe-3")}>
            {endIcon}
          </span>
        ) : null}
      </div>
    </div>
  );
}
