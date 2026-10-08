import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  choiceControlClassName,
  choiceDescriptionClassName,
  choiceLabelVariants,
  choiceVariants,
  type ChoiceVariantProps,
} from "./checkbox.variants";

export type ChoiceProps = Omit<ComponentProps<"input">, "type" | "size"> &
  ChoiceVariantProps & {
    /** Visible label, linked to the control. */
    label?: ReactNode;
    /** Helper text under the label, read as the control's description. */
    description?: ReactNode;
    /** Marks the control as wrong: red outline and `aria-invalid`. */
    invalid?: boolean;
  };

/** Shared markup for Checkbox and Radio. */
export function Choice({
  type,
  label,
  description,
  bordered,
  invalid,
  id,
  className,
  disabled,
  ...props
}: ChoiceProps & { type: "checkbox" | "radio" }) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const control = (
    <input
      type={type}
      id={inputId}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-describedby={descriptionId}
      data-slot={type}
      className={cn(choiceControlClassName, !label && className)}
      {...props}
    />
  );

  if (!label) return control;

  return (
    <div className={cn(choiceVariants({ bordered }), className)}>
      {control}
      <div className="grid gap-0.5">
        <label htmlFor={inputId} className={choiceLabelVariants({ bordered, disabled })}>
          {label}
        </label>
        {description ? (
          <p id={descriptionId} className={choiceDescriptionClassName}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
