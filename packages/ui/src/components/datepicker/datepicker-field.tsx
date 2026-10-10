"use client";

import { Calendar as CalendarIcon } from "@stefan-florescu/icons";
import {
  useEffect,
  useId,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { fieldVariants } from "../input/input.variants";

import { formatDate, parseDate, toISODate } from "./date-utils";
import {
  datepickerFieldClassName,
  datepickerIconClassName,
  datepickerInputClassName,
  datepickerPopoverVariants,
  type DatepickerPopoverVariantProps,
} from "./datepicker.variants";

export type DatepickerFieldOptions = DatepickerPopoverVariantProps & {
  /** Display and typing format, with format tokens (`mm/dd/yyyy`, `dd-mm-yyyy`, `MM d, yyyy`…). */
  format?: string;
  /** BCP 47 locale for month and weekday names. Defaults to the browser's. */
  locale?: string;
  disabled?: boolean;
};

type DatepickerFieldProps = DatepickerFieldOptions &
  Omit<
    ComponentProps<"input">,
    "value" | "defaultValue" | "onChange" | "type" | "size" | "children" | "name"
  > & {
    date: Date | null;
    onCommit: (date: Date | null) => void;
    /** Accessible name of the field and its calendar dialog. */
    label?: string;
    /** Submits the day as yyyy-mm-dd under this name. */
    name?: string;
    /** The calendar, given a function that closes the popover. */
    children: (close: (returnFocus?: boolean) => void) => ReactNode;
    rootClassName?: string;
  };

/**
 * The datepicker input: a text field with a calendar icon that opens a calendar dialog.
 * Internal: used by Datepicker and DateRangePicker. Follows the WAI-ARIA date picker combobox:
 * type a date, or press the field or Arrow Down to open the calendar; Escape closes it.
 */
export function DatepickerField({
  date,
  onCommit,
  label,
  name,
  format,
  locale,
  orientation,
  disabled,
  placeholder = "Select date",
  id,
  className,
  rootClassName,
  children,
  onKeyDown,
  onClick,
  onBlur,
  ...props
}: DatepickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const autoId = useId();
  const rootId = `${autoId}-root`;
  const inputId = id ?? `${autoId}-input`;
  const popoverId = `${autoId}-popover`;

  const text = draft ?? (date ? formatDate(date, format, locale) : "");

  const focusInput = () => document.getElementById(inputId)?.focus();
  const focusDay = () =>
    document
      .getElementById(popoverId)
      ?.querySelector<HTMLButtonElement>('[data-date][tabindex="0"]')
      ?.focus();

  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(focusInput);
  };

  const commitDraft = () => {
    if (draft === null) return;
    if (draft.trim() === "") onCommit(null);
    else {
      const parsed = parseDate(draft, format, locale);
      if (parsed) onCommit(parsed);
    }
    setDraft(null);
  };

  // While open: close on a click outside, when focus leaves, or on Escape (returning focus).
  useEffect(() => {
    if (!open) return;
    const root = document.getElementById(rootId);
    if (!root) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.contains(event.target as Node)) setOpen(false);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget && !root.contains(event.relatedTarget as Node)) setOpen(false);
    };
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setOpen(false);
      requestAnimationFrame(() => document.getElementById(inputId)?.focus());
    };
    document.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("focusout", onFocusOut);
    root.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("keydown", onEscape);
    };
  }, [open, rootId, inputId]);

  return (
    <div id={rootId} className={cn(datepickerFieldClassName, rootClassName)}>
      <div aria-hidden className={datepickerIconClassName}>
        <CalendarIcon />
      </div>
      <input
        id={inputId}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        placeholder={placeholder}
        disabled={disabled}
        value={text}
        className={cn(fieldVariants(), datepickerInputClassName, className)}
        onChange={(event) => setDraft(event.target.value)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          commitDraft();
        }}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "Enter") {
            commitDraft();
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            commitDraft();
            setOpen(true);
            requestAnimationFrame(focusDay);
          }
        }}
        {...props}
      />
      {name ? <input type="hidden" name={name} value={date ? toISODate(date) : ""} /> : null}
      {open ? (
        <div
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-label={label ? `Choose ${label.toLowerCase()}` : "Choose date"}
          className={datepickerPopoverVariants({ orientation })}
        >
          {children(close)}
        </div>
      ) : null}
    </div>
  );
}
