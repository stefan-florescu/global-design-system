import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { choiceDescriptionClassName, choiceLabelVariants } from "../checkbox/checkbox.variants";

import {
  toggleInputClassName,
  toggleTrackVariants,
  type ToggleVariantProps,
} from "./toggle.variants";

export type ToggleProps = Omit<ComponentProps<"input">, "type" | "size" | "role"> &
  ToggleVariantProps & {
    /** Visible label, linked to the switch. */
    label?: ReactNode;
    /** Helper text under the label. */
    description?: ReactNode;
  };

/**
 * An on/off switch for a setting that applies immediately. A native checkbox with
 * `role="switch"`, so it works with Space, forms and assistive technology.
 */
export function Toggle({
  size,
  label,
  description,
  id,
  disabled,
  className,
  ...props
}: ToggleProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const descriptionId = description ? `${inputId}-description` : undefined;

  return (
    <div data-slot="toggle" className={cn("inline-flex items-start gap-3", className)}>
      <span className="relative inline-flex shrink-0">
        <input
          type="checkbox"
          role="switch"
          id={inputId}
          disabled={disabled}
          aria-describedby={descriptionId}
          className={toggleInputClassName}
          {...props}
        />
        <span aria-hidden className={toggleTrackVariants({ size })} />
      </span>
      {label ? (
        <div className="grid gap-0.5">
          <label htmlFor={inputId} className={choiceLabelVariants({ disabled })}>
            {label}
          </label>
          {description ? (
            <p id={descriptionId} className={choiceDescriptionClassName}>
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
