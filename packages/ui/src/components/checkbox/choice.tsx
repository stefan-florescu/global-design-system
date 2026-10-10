import { useId, type ComponentProps, type ReactNode } from "react";

import { Check, Minus } from "@stefan-florescu/icons";

import { cn } from "../../lib/cn";

import {
  choiceCardDescriptionVariants,
  choiceCardEndIconClassName,
  choiceCardIconClassName,
  choiceCardTitleVariants,
  choiceCardVariants,
  choiceControlVariants,
  choiceControlWrapperVariants,
  choiceDescriptionVariants,
  choiceIconClassName,
  choiceIndeterminateClassName,
  choiceIndicatorVariants,
  choiceLabelVariants,
  choiceTextVariants,
  choiceTitleVariants,
  choiceVariants,
  type ChoiceVariantProps,
} from "./checkbox.variants";

export type ChoiceProps = Omit<ComponentProps<"input">, "type" | "size"> &
  ChoiceVariantProps & {
    /** Visible label, linked to the control. */
    label?: ReactNode;
    /** Helper text under the label, read as the control's description. */
    description?: ReactNode;
    /** Decorative icon for the `bordered` (with a description) and `card` layouts. */
    icon?: ReactNode;
    /** Decorative icon at the end of a `card`, such as an arrow. */
    endIcon?: ReactNode;
    /** Marks the control as wrong: red border and `aria-invalid`. */
    invalid?: boolean;
    /**
     * Checkbox only: the "mixed" state, such as a select-all with some rows selected. Shows a dash
     * and is announced as mixed (sets the input's `indeterminate` property, so it needs a client
     * component).
     */
    indeterminate?: boolean;
  };

type Layout = "plain" | "helper" | "bordered" | "list" | "borderedDescription" | "borderedIcon";

/** Shared markup for Checkbox and Radio. */
export function Choice({
  type,
  variant = "default",
  label,
  description,
  icon,
  endIcon,
  invalid,
  indeterminate,
  id,
  className,
  disabled,
  ref,
  ...props
}: ChoiceProps & { type: "checkbox" | "radio" }) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const labelId = `${inputId}-label`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isDisabled = Boolean(disabled);

  // Layouts where the whole card is the <label>: name the input by its title only, so the
  // description is announced as a description and not as part of the name.
  const cardLabel =
    Boolean(label) && (variant === "card" || (variant === "bordered" && (description || icon)));

  const input = (
    <input
      type={type}
      id={inputId}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-labelledby={cardLabel ? labelId : undefined}
      aria-describedby={descriptionId}
      data-slot={type}
      className={choiceControlVariants({ type, variant })}
      {...props}
      ref={
        indeterminate === undefined
          ? ref
          : (element: HTMLInputElement | null) => {
              if (element) element.indeterminate = indeterminate;
              if (typeof ref === "function") return ref(element);
              if (ref) ref.current = element;
            }
      }
    />
  );

  if (variant === "card" && label) {
    return (
      <div data-slot={`${type}-card`} className={cn("relative", className)}>
        {input}
        <label htmlFor={inputId} className={choiceCardVariants()}>
          <span className="block">
            {icon ? (
              <span aria-hidden className={choiceCardIconClassName}>
                {icon}
              </span>
            ) : null}
            <span id={labelId} className={choiceCardTitleVariants({ withIcon: Boolean(icon) })}>
              {label}
            </span>
            {description ? (
              <span
                id={descriptionId}
                className={choiceCardDescriptionVariants({ withIcon: Boolean(icon) })}
              >
                {description}
              </span>
            ) : null}
          </span>
          {endIcon ? (
            <span aria-hidden className={choiceCardEndIconClassName}>
              {endIcon}
            </span>
          ) : null}
        </label>
      </div>
    );
  }

  const layout: Layout =
    variant === "bordered"
      ? icon
        ? "borderedIcon"
        : description
          ? "borderedDescription"
          : "bordered"
      : description
        ? "helper"
        : variant === "list"
          ? "list"
          : "plain";

  const control = (
    <span
      data-slot={`${type}-control`}
      className={cn(choiceControlWrapperVariants({ layout }), !label && className)}
    >
      {input}
      {type === "checkbox" ? (
        <>
          <Check aria-hidden className={choiceIndicatorVariants({ type })} />
          <Minus aria-hidden className={choiceIndeterminateClassName} />
        </>
      ) : (
        <span aria-hidden className={choiceIndicatorVariants({ type })} />
      )}
    </span>
  );

  if (!label) return control;

  if (layout === "borderedDescription" || layout === "borderedIcon") {
    const text = (
      <span className={choiceTextVariants({ layout })}>
        {icon ? (
          <span aria-hidden className={choiceIconClassName}>
            {icon}
          </span>
        ) : null}
        <span id={labelId} className={choiceTitleVariants({ disabled: isDisabled })}>
          {label}
        </span>
        {description ? (
          <span id={descriptionId} className={choiceDescriptionVariants({ layout: "bordered" })}>
            {description}
          </span>
        ) : null}
      </span>
    );
    return (
      <label htmlFor={inputId} className={cn(choiceVariants({ layout, type }), className)}>
        {layout === "borderedIcon" ? (
          <>
            {text}
            {control}
          </>
        ) : (
          <>
            {control}
            {text}
          </>
        )}
      </label>
    );
  }

  if (layout === "helper") {
    return (
      <div className={cn(choiceVariants({ layout, type }), className)}>
        {control}
        <div className={choiceTextVariants({ layout })}>
          <label
            htmlFor={inputId}
            className={choiceLabelVariants({ layout, disabled: isDisabled })}
          >
            {label}
          </label>
          <span id={descriptionId} className={choiceDescriptionVariants({ layout })}>
            {description}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(choiceVariants({ layout, type }), className)}>
      {control}
      <label htmlFor={inputId} className={choiceLabelVariants({ layout, disabled: isDisabled })}>
        {label}
      </label>
    </div>
  );
}
