"use client";

import { Minus, Plus } from "@stefan-florescu/icons";
import { useId, useState } from "react";

import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Input, type InputProps } from "../input";

import {
  numberInputButtonClassName,
  numberInputStepperFieldClassName,
} from "./number-input.variants";

export type NumberInputProps = Omit<
  InputProps,
  "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
> & {
  /** The number (controlled). `null` when empty. */
  value?: number | null;
  /** The number on first render (uncontrolled). */
  defaultValue?: number | null;
  /** Called with the new number, or `null` when the field is emptied. */
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Show − and + buttons on either side. */
  stepper?: boolean;
  decrementLabel?: string;
  incrementLabel?: string;
};

const decimals = (step: number) => (String(step).split(".")[1] ?? "").length;

/** A number field. Arrow keys change the value by `step`; `stepper` adds − and + buttons. */
export function NumberInput({
  value,
  defaultValue = null,
  onValueChange,
  min,
  max,
  step = 1,
  stepper = false,
  decrementLabel = "Decrease",
  incrementLabel = "Increase",
  size,
  id,
  className,
  disabled,
  ...props
}: NumberInputProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const [text, setText] = useState(defaultValue === null ? "" : String(defaultValue));
  const shown = value !== undefined ? (value === null ? "" : String(value)) : text;
  const current = shown === "" ? null : Number(shown);

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
      onChange={(event) => {
        if (value === undefined) setText(event.target.value);
        onValueChange?.(event.target.value === "" ? null : Number(event.target.value));
      }}
      className={cn(stepper && numberInputStepperFieldClassName, className)}
      {...props}
    />
  );

  if (!stepper) return field;

  const buttonSize = size === "lg" ? "lg" : size === "sm" ? "sm" : "md";
  return (
    <div data-slot="number-input" className="flex w-full">
      <Button
        variant="outline"
        size={buttonSize}
        iconOnly
        aria-label={decrementLabel}
        aria-controls={inputId}
        disabled={disabled || (min !== undefined && current !== null && current <= min)}
        className={cn(numberInputButtonClassName, "rounded-s-lg border-e-0")}
        onClick={() => nudge(-1)}
      >
        <Minus aria-hidden />
      </Button>
      {field}
      <Button
        variant="outline"
        size={buttonSize}
        iconOnly
        aria-label={incrementLabel}
        aria-controls={inputId}
        disabled={disabled || (max !== undefined && current !== null && current >= max)}
        className={cn(numberInputButtonClassName, "rounded-e-lg border-s-0")}
        onClick={() => nudge(1)}
      >
        <Plus aria-hidden />
      </Button>
    </div>
  );
}
