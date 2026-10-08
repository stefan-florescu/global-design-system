import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import { buttonGroupVariants, type ButtonGroupVariantProps } from "./button-group.variants";

export type ButtonGroupProps = ComponentProps<"div"> & ButtonGroupVariantProps;

/**
 * Joins related `Button`s (or links styled with `buttonVariants()`) into one control.
 * Renders `role="group"`; give it an `aria-label` that names the set.
 */
export function ButtonGroup({ pill, className, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      className={cn(buttonGroupVariants({ pill }), className)}
      {...props}
    />
  );
}
