import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import { helperTextVariants, type HelperTextVariantProps } from "./helper-text.variants";

export type HelperTextProps = ComponentProps<"p"> & HelperTextVariantProps;

/**
 * Supporting text for a control. Give it an `id` and reference it from the control's
 * `aria-describedby` so screen readers read it with the control.
 */
export function HelperText({ variant, className, ...props }: HelperTextProps) {
  return (
    <p
      data-slot="helper-text"
      className={cn(helperTextVariants({ variant }), className)}
      {...props}
    />
  );
}
