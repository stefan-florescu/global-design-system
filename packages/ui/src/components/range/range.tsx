import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import { rangeVariants, type RangeVariantProps } from "./range.variants";

export type RangeProps = Omit<ComponentProps<"input">, "type" | "size"> & RangeVariantProps;

/**
 * A native slider for picking a value from a range. Give it a `Label`, and `aria-valuetext`
 * when the number alone doesn't say what it means (for example "40 %").
 */
export function Range({ size, className, ...props }: RangeProps) {
  return (
    <input
      type="range"
      data-slot="range"
      className={cn(rangeVariants({ size }), className)}
      {...props}
    />
  );
}
