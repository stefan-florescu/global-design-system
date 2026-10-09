import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  fieldsetLegendClassName,
  fieldsetVariants,
  type FieldsetVariantProps,
} from "./fieldset.variants";

export type FieldsetProps = ComponentProps<"fieldset"> &
  FieldsetVariantProps & {
    /** The group's name, read by screen readers before each control in it. */
    legend: ReactNode;
    /** Hide the legend visually but keep it for screen readers. */
    hideLegend?: boolean;
    /** Classes for the element that lays out the controls, such as a grid. */
    contentClassName?: string;
  };

/** A native `<fieldset>` with a `<legend>`: the accessible way to group radios or checkboxes. */
export function Fieldset({
  legend,
  hideLegend = false,
  orientation,
  className,
  contentClassName,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset data-slot="fieldset" className={cn("m-0 min-w-0 border-0 p-0", className)} {...props}>
      <legend className={hideLegend ? "sr-only" : fieldsetLegendClassName}>{legend}</legend>
      <div className={cn(fieldsetVariants({ orientation }), contentClassName)}>{children}</div>
    </fieldset>
  );
}
