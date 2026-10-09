import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  toggleDescriptionClassName,
  toggleIconClassName,
  toggleInputClassName,
  toggleLabelVariants,
  toggleTextVariants,
  toggleTitleClassName,
  toggleTrackVariants,
  toggleVariants,
  type ToggleVariantProps,
} from "./toggle.variants";

export type ToggleProps = Omit<ComponentProps<"input">, "type" | "size" | "role"> &
  ToggleVariantProps & {
    /** Visible label, linked to the switch. */
    label?: ReactNode;
    /** Helper text under the label, read as the switch's description. */
    description?: ReactNode;
    /** Decorative icon for the `bordered` card; the text then sits before the switch. */
    icon?: ReactNode;
  };

/**
 * An on/off switch for a setting that applies immediately. A native checkbox with
 * `role="switch"`, so it works with Space, forms and assistive technology. The whole label is
 * the click target.
 */
export function Toggle({
  size,
  bordered,
  label,
  description,
  icon,
  id,
  disabled,
  className,
  ...props
}: ToggleProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const labelId = label ? `${inputId}-label` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const isDisabled = Boolean(disabled);

  const track = <span aria-hidden className={toggleTrackVariants({ size })} />;

  // With a description the label wraps it too, so name the switch by its title only.
  const title = label ? (
    <span
      id={labelId}
      className={cn(
        toggleLabelVariants({ disabled: isDisabled }),
        description ? toggleTitleClassName : undefined,
      )}
    >
      {label}
    </span>
  ) : null;

  const descriptionText = description ? (
    <span id={descriptionId} className={toggleDescriptionClassName}>
      {description}
    </span>
  ) : null;

  const hasBlock = Boolean(description || icon);

  return (
    <label
      htmlFor={inputId}
      data-slot="toggle"
      className={cn(toggleVariants({ bordered, align: hasBlock ? "start" : "center" }), className)}
    >
      <input
        type="checkbox"
        role="switch"
        id={inputId}
        disabled={disabled}
        aria-labelledby={description ? labelId : undefined}
        aria-describedby={descriptionId}
        className={toggleInputClassName}
        {...props}
      />
      {icon ? (
        <>
          <span className={toggleTextVariants({ position: "start" })}>
            <span aria-hidden className={toggleIconClassName}>
              {icon}
            </span>
            {title}
            {descriptionText}
          </span>
          {track}
        </>
      ) : (
        <>
          {track}
          {description ? (
            <span className={toggleTextVariants({ position: "description" })}>
              {title}
              {descriptionText}
            </span>
          ) : label ? (
            <span className={toggleTextVariants({ position: "label" })}>{title}</span>
          ) : null}
        </>
      )}
    </label>
  );
}
