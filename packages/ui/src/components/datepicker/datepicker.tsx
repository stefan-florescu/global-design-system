"use client";

import { useState, type ReactNode } from "react";

import { Button } from "../button";

import { Calendar, type CalendarProps } from "./calendar";
import { DatepickerField, type DatepickerFieldOptions } from "./datepicker-field";
import { startOfDay } from "./date-utils";
import { calendarFooterButtonClassName, calendarFooterClassName } from "./datepicker.variants";

export type SharedCalendarProps = Pick<
  CalendarProps,
  "min" | "max" | "isDateDisabled" | "weekStartsOn" | "title"
>;

export type DatepickerActionsProps = {
  /** Close the calendar as soon as a day is picked. */
  autoHide?: boolean;
  /** Show "Today" and "Clear" buttons under the calendar. */
  showButtons?: boolean;
  todayLabel?: string;
  clearLabel?: string;
};

export type DatepickerProps = DatepickerFieldOptions &
  SharedCalendarProps &
  DatepickerActionsProps & {
    /** The selected day (controlled). */
    value?: Date | null;
    /** The day selected on first render (uncontrolled). */
    defaultValue?: Date | null;
    /** Called with the new day, or `null` when cleared. */
    onChange?: (date: Date | null) => void;
    /** What the date is for, such as "Departure". Names the field and the calendar. */
    label?: string;
    /** Text shown when no day is selected. */
    placeholder?: string;
    /** Submit the day with a form as yyyy-mm-dd under this name. */
    name?: string;
    /** The field's id, for a `<Label htmlFor>`. */
    id?: string;
    /** Classes for the field's wrapper, such as a width. */
    className?: string;
  };

/** The Today / Clear footer shared by Datepicker and DateRangePicker. */
export function renderDatepickerButtons(
  { showButtons, todayLabel = "Today", clearLabel = "Clear" }: DatepickerActionsProps,
  onToday: () => void,
  onClear: () => void,
): ReactNode {
  if (!showButtons) return null;
  return (
    <div className={calendarFooterClassName}>
      <Button size="sm" className={calendarFooterButtonClassName} onClick={onToday}>
        {todayLabel}
      </Button>
      <Button
        size="sm"
        variant="secondary"
        className={calendarFooterButtonClassName}
        onClick={onClear}
      >
        {clearLabel}
      </Button>
    </div>
  );
}

/**
 * A datepicker: a text field with a calendar icon. Type a date in `format`, or press the
 * field (or Arrow Down) to pick one from the calendar. Escape or a click outside closes it.
 */
export function Datepicker({
  value,
  defaultValue = null,
  onChange,
  label = "Date",
  placeholder = "Select date",
  name,
  id,
  format,
  locale,
  orientation,
  disabled,
  autoHide = false,
  showButtons = false,
  todayLabel,
  clearLabel,
  min,
  max,
  isDateDisabled,
  weekStartsOn,
  title,
  className,
}: DatepickerProps) {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : internal;
  // Remount the calendar on its month when a date is typed into the field.
  const [typed, setTyped] = useState(0);

  const commit = (date: Date | null) => {
    if (value === undefined) setInternal(date);
    onChange?.(date);
  };

  return (
    <DatepickerField
      id={id}
      date={selected}
      onCommit={(date) => {
        commit(date);
        setTyped((count) => count + 1);
      }}
      label={label}
      placeholder={placeholder}
      name={name}
      format={format}
      locale={locale}
      orientation={orientation}
      disabled={disabled}
      rootClassName={className}
    >
      {(close) => (
        <Calendar
          key={typed}
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
        >
          {renderDatepickerButtons(
            { showButtons, todayLabel, clearLabel },
            () => {
              commit(startOfDay(new Date()));
              close(true);
            },
            () => {
              commit(null);
              close(true);
            },
          )}
        </Calendar>
      )}
    </DatepickerField>
  );
}
