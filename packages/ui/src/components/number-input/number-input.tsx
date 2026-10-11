"use client";

import { Minus, Plus } from "@stefan-florescu/icons";
import { useId, useState, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Input, type InputProps } from "../input";

import {
  numberInputButtonVariants,
  numberInputCaptionClassName,
  numberInputFieldVariants,
  numberInputGroupVariants,
  type NumberInputVariantProps,
} from "./number-input.variants";

export type NumberInputProps = Omit<
  InputProps,
  "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
> &
  NumberInputVariantProps & {
    /** The number (controlled). `null` when empty. */
    value?: number | null;
    /** The number on first render (uncontrolled). */
    defaultValue?: number | null;
    /** Called with the new number, or `null` when the field is emptied. */
    onValueChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Show − and + buttons on either side. Always on for the `counter` variant. */
    stepper?: boolean;
    /** Small text under the value inside a stepper field, such as an icon and "Bedrooms". */
    caption?: ReactNode;
    decrementLabel?: string;
    incrementLabel?: string;
  };

const decimals = (step: number) => (String(step).split(".")[1] ?? "").length;

/**
 * A number field. Arrow keys change the value by `step`; `stepper` adds − and + buttons
 * (control buttons) and `variant="counter"` draws them as small round buttons.
 */
export function NumberInput({
  value,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  variant,
  stepper = false,
  caption,
  decrementLabel = "Decrease",
  incrementLabel = "Increase",
  size,
  id,
  className,
  disabled,
  "aria-describedby": describedBy,
  ...props
}: NumberInputProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const captionId = `${inputId}-caption`;
  const [text, setText] = useState(defaultValue === null ? "" : String(defaultValue));
  const shown = value !== undefined ? (value === null ? "" : String(value)) : text;
  const current = shown === "" ? null : Number(shown);
  const withButtons = stepper || variant === "counter";
  const kind = variant ?? "default";

  const commit = (next: number | null) => {
    if (value === undefined) setText(next === null ? "" : String(next));
    onValueChange?.(next);
  };

  const nudge = (direction: 1 | -1) => {
    let next = Number(((current ?? min ?? 0) + direction * step).toFixed(decimals(step)));
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    commit(next);
  };

  const showCaption = withButtons && caption != null;
  const field = (
    <Input
      type="number"
      id={inputId}
      size={size}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={shown}
      aria-describedby={
        [describedBy, showCaption && captionId].filter(Boolean).join(" ") || undefined
      }
      onChange={(event) => {
        if (value === undefined) setText(event.target.value);
        onValueChange?.(event.target.value === "" ? null : Number(event.target.value));
      }}
      className={cn(
        withButtons && numberInputFieldVariants({ variant: kind, size, caption: showCaption }),
        className,
      )}
      {...props}
    />
  );

  if (!withButtons) return field;

  return (
    <div data-slot="number-input" className={numberInputGroupVariants({ variant: kind })}>
      <Button
        variant="secondary"
        aria-label={decrementLabel}
        aria-controls={inputId}
        disabled={disabled || (min !== undefined && current !== null && current <= min)}
        className={numberInputButtonVariants({ variant: kind, side: "start" })}
        onClick={() => nudge(-1)}
      >
        <Minus aria-hidden />
      </Button>
      {field}
      {showCaption ? (
        <div id={captionId} className={numberInputCaptionClassName}>
          {caption}
        </div>
      ) : null}
      <Button
        variant="secondary"
        aria-label={incrementLabel}
        aria-controls={inputId}
        disabled={disabled || (max !== undefined && current !== null && current >= max)}
        className={numberInputButtonVariants({ variant: kind, side: "end" })}
        onClick={() => nudge(1)}
      >
        <Plus aria-hidden />
      </Button>
    </div>
  );
}
