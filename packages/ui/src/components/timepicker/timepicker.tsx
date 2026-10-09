import { Clock } from "@stefan-florescu/icons";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { fieldVariants } from "../input/input.variants";

import { timepickerClassName, timepickerIconClassName } from "./timepicker.variants";

export type TimepickerProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  /** Marks the time as wrong: red border and `aria-invalid`. */
  invalid?: boolean;
  /** Marks the time as accepted: green border. */
  valid?: boolean;
  /**
   * Decorative icon at the end of the field. Defaults to a clock; pass `null` to render the bare
   * field, for example when attaching a button or select to its end.
   */
  icon?: ReactNode;
};

/**
 * A native `type="time"` field with a clock icon. Use `min`, `max` and `step` (seconds) to limit
 * the times; the browser formats them for the user's locale.
 */
export function Timepicker({
  invalid,
  valid,
  icon = <Clock />,
  className,
  ...props
}: TimepickerProps) {
  const input = (
    <input
      type="time"
      data-slot="timepicker"
      aria-invalid={invalid || undefined}
      data-valid={valid || undefined}
      className={cn(fieldVariants(), timepickerClassName, className)}
      {...props}
    />
  );

  if (icon === null || icon === false) return input;

  return (
    <div className="relative">
      <span aria-hidden className={timepickerIconClassName}>
        {icon}
      </span>
      {input}
    </div>
  );
}
