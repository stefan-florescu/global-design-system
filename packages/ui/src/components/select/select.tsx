import { ChevronDown } from "@stefan-florescu/icons";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";
import { fieldVariants, type FieldVariantProps } from "../input/input.variants";

import { selectChevronClassName, selectVariants, type SelectVariantProps } from "./select.variants";

export type SelectProps = Omit<ComponentProps<"select">, "size"> &
  FieldVariantProps &
  SelectVariantProps & {
    /** Native `size`: show this many options as a list instead of a dropdown. */
    htmlSize?: number;
    /** Marks the choice as wrong: red border and `aria-invalid`. */
    invalid?: boolean;
    /** Marks the choice as accepted: green border. */
    valid?: boolean;
  };

/** A native `<select>` styled as a field. Give it a `Label` and `<option>` children. */
export function Select({
  size,
  variant,
  htmlSize,
  invalid,
  valid,
  multiple,
  className,
  ...props
}: SelectProps) {
  const list = Boolean(multiple || (htmlSize && htmlSize > 1));
  return (
    <div className="relative w-full">
      <select
        data-slot="select"
        size={htmlSize}
        multiple={multiple}
        aria-invalid={invalid || undefined}
        data-valid={valid || undefined}
        className={cn(fieldVariants({ size }), selectVariants({ variant, list }), className)}
        {...props}
      />
      {list ? null : (
        <ChevronDown
          aria-hidden
          className={cn(selectChevronClassName, variant === "underline" && "end-0")}
        />
      )}
    </div>
  );
}
