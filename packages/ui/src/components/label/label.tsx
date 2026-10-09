import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import { labelVariants, type LabelVariantProps } from "./label.variants";

export type LabelProps = ComponentProps<"label"> &
  LabelVariantProps & {
    /** Show a required marker. Also set `required` on the control itself. */
    required?: boolean;
  };

/**
 * The visible name of a form control. Point `htmlFor` at the control's `id`. It is a block with
 * Flowbite's 10px gap below, so place it directly above the control.
 */
export function Label({ variant, disabled, required, className, children, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ variant, disabled }), className)}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden className="text-fg-danger-strong ms-0.5">
          *
        </span>
      ) : null}
    </label>
  );
}
