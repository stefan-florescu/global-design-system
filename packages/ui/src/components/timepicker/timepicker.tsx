import { Clock } from "@stefan-florescu/icons";

import { cn } from "../../lib/cn";
import { Input, type InputProps } from "../input";

import { timepickerClassName } from "./timepicker.variants";

export type TimepickerProps = Omit<InputProps, "type" | "endIcon">;

/**
 * A native `type="time"` field with a clock icon. Use `min`, `max` and `step` (seconds) to limit
 * the times; the browser formats them for the user's locale.
 */
export function Timepicker({ className, ...props }: TimepickerProps) {
  return (
    <Input
      type="time"
      endIcon={<Clock />}
      className={cn(timepickerClassName, className)}
      {...props}
    />
  );
}
