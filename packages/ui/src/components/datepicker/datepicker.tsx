"use client";

import { Calendar as CalendarIcon } from "@stefan-florescu/icons";
import { useEffect, useId, useState, type ComponentProps } from "react";

import { cn } from "../../lib/cn";
import { Button } from "../button";

import { Calendar, type CalendarProps } from "./calendar";
import { startOfDay, toISODate } from "./date-utils";
import { datepickerFooterClassName, datepickerPopoverClassName } from "./datepicker.variants";

type SharedCalendarProps = Pick<
  CalendarProps,
  "min" | "max" | "isDateDisabled" | "weekStartsOn" | "locale" | "title"
>;

export type DatepickerProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue" | "title"> &
  SharedCalendarProps & {
    /** The selected day (controlled). */
    value?: Date | null;
    /** The day selected on first render (uncontrolled). */
    defaultValue?: Date | null;
    /** Called with the new day, or `null` when cleared. */
    onChange?: (date: Date | null) => void;
    /** What the date is for, such as "Departure". Names the button and the calendar. */
    label?: string;
    /** Text shown when no day is selected. */
    placeholder?: string;
    /** Close the calendar as soon as a day is picked. */
    autoHide?: boolean;
    /** Show a "Today" button under the calendar. */
    showTodayButton?: boolean;
    /** Show a "Clear" button under the calendar. */
    showClearButton?: boolean;
    todayLabel?: string;
    clearLabel?: string;
    /** Submit the day with a form as yyyy-mm-dd under this name. */
    name?: string;
    disabled?: boolean;
  };

/**
 * A button that opens a calendar in a popover to pick a day. Escape or a click outside closes
 * it and returns focus to the button.
 */
export function Datepicker({
  value,
  defaultValue = null,
  onChange,
  label = "Date",
  placeholder = "Select date",
  autoHide = true,
  showTodayButton = false,
  showClearButton = false,
  todayLabel = "Today",
  clearLabel = "Clear",
  name,
  disabled,
  min,
  max,
  isDateDisabled,
  weekStartsOn,
  locale,
  title,
  className,
  ...props
}: DatepickerProps) {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : internal;
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootId = `${id}-root`;
  const triggerId = `${id}-trigger`;
  const popoverId = `${id}-popover`;

  const display = selected
    ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(selected)
    : placeholder;

  const focusTrigger = () => document.getElementById(triggerId)?.focus();

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(focusTrigger);
  };

  const commit = (date: Date | null) => {
    if (value === undefined) setInternal(date);
    onChange?.(date);
  };

  // While open: close on a click outside, when focus leaves, or on Escape (returning focus).
  // Native listeners, because the wrapper and the dialog are not interactive elements.
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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setOpen(false);
      requestAnimationFrame(() => document.getElementById(triggerId)?.focus());
    };
    document.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("focusout", onFocusOut);
    root.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("keydown", onKeyDown);
    };
  }, [open, rootId, triggerId]);

  return (
    <div
      id={rootId}
      data-slot="datepicker"
      className={cn("relative inline-block", className)}
      {...props}
    >
      <Button
        id={triggerId}
        variant="outline"
        disabled={disabled}
        aria-label={`${label}, ${display}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        className="justify-start font-normal"
        onClick={() => {
          setOpen((current) => !current);
          if (!open) {
            requestAnimationFrame(() =>
              document
                .getElementById(popoverId)
                ?.querySelector<HTMLButtonElement>('[data-date][tabindex="0"]')
                ?.focus(),
            );
          }
        }}
      >
        <CalendarIcon aria-hidden />
        <span className={selected ? undefined : "text-muted-foreground"}>{display}</span>
      </Button>
      {name ? (
        <input type="hidden" name={name} value={selected ? toISODate(selected) : ""} />
      ) : null}
      {open ? (
        <div
          id={popoverId}
          role="dialog"
          aria-modal="false"
          aria-label={`Choose ${label.toLowerCase()}`}
          className={datepickerPopoverClassName}
        >
          <Calendar
            value={selected}
            onChange={(date) => {
              commit(date);
              if (autoHide) close(true);
            }}
            min={min}
            max={max}
            isDateDisabled={isDateDisabled}
            weekStartsOn={weekStartsOn}
            locale={locale}
            title={title}
            className="shadow-lg"
          >
            {showTodayButton || showClearButton ? (
              <div className={datepickerFooterClassName}>
                {showTodayButton ? (
                  <Button
                    size="sm"
                    fullWidth
                    onClick={() => {
                      commit(startOfDay(new Date()));
                      close(true);
                    }}
                  >
                    {todayLabel}
                  </Button>
                ) : null}
                {showClearButton ? (
                  <Button
                    size="sm"
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      commit(null);
                      close(true);
                    }}
                  >
                    {clearLabel}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </Calendar>
        </div>
      ) : null}
    </div>
  );
}
