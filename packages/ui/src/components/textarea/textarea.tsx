import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";
import { fieldVariants } from "../input/input.variants";

import { textareaClassName } from "./textarea.variants";

export type TextareaProps = ComponentProps<"textarea"> & {
  /** Marks the value as wrong: red border and `aria-invalid`. */
  invalid?: boolean;
  /** Marks the value as accepted: green border. */
  valid?: boolean;
};

/** A multi-line text field. Give it a `Label`; it can be resized vertically. */
export function Textarea({ invalid, valid, rows = 4, className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      aria-invalid={invalid || undefined}
      data-valid={valid || undefined}
      className={cn(fieldVariants(), textareaClassName, className)}
      {...props}
    />
  );
}
