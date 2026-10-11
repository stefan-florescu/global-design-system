"use client";

import { useState } from "react";

import { cn } from "../../lib/cn";

import { Calendar, type DateRange } from "./calendar";
import {
  renderDatepickerButtons,
  type DatepickerActionsProps,
  type SharedCalendarProps,
} from "./datepicker";
import { DatepickerField, type DatepickerFieldOptions } from "./datepicker-field";
import { startOfDay } from "./date-utils";
import { datepickerRangeClassName, datepickerRangeSeparatorClassName } from "./datepicker.variants";

export type DateRangePickerProps = DatepickerFieldOptions &
  SharedCalendarProps &
  DatepickerActionsProps & {
    /** The selected range (controlled). */
    value?: DateRange;
    /** The range selected on first render (uncontrolled). */
    defaultValue?: DateRange;
    /** Called with the new range. */
    onChange?: (range: DateRange) => void;
    /** Names of the two fields. */
    startLabel?: string;
    endLabel?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    /** Submit the days with a form as yyyy-mm-dd under these names. */
    startName?: string;
    endName?: string;
    /** Text between the two fields. */
    separator?: string;
    className?: string;
  };

const EMPTY: DateRange = { from: null, to: null };

/**
 * A date range picker: a start and an end field joined by "to". Each opens the same
 * range calendar and sets its own end of the range; the days between are highlighted.
 */
export function DateRangePicker({
  value,
  defaultValue = EMPTY,
  onChange,
  startLabel = "Start date",
  endLabel = "End date",
  startPlaceholder = "Select date start",
  endPlaceholder = "Select date end",
  startName,
  endName,
  separator = "to",
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
}: DateRangePickerProps) {
  const [internal, setInternal] = useState<DateRange>(defaultValue);
  const range = value ?? internal;
  const [typed, setTyped] = useState(0);

  const commit = (next: DateRange) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const field = (edge: "from" | "to") => (
    <DatepickerField
      date={range[edge]}
      onCommit={(date) => {
        commit({ ...range, [edge]: date });
        setTyped((count) => count + 1);
      }}
      label={edge === "from" ? startLabel : endLabel}
      placeholder={edge === "from" ? startPlaceholder : endPlaceholder}
      name={edge === "from" ? startName : endName}
      format={format}
      locale={locale}
      orientation={orientation}
      disabled={disabled}
    >
      {(close) => (
        <Calendar
          key={typed}
          mode="range"
          rangeEdge={edge}
          value={range}
          defaultMonth={range[edge] ?? range.from ?? range.to ?? undefined}
          onChange={(next) => {
            commit(next);
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
              const today = startOfDay(new Date());
              commit({ ...range, [edge]: today });
              close(true);
            },
            () => {
              commit({ ...range, [edge]: null });
              close(true);
            },
          )}
        </Calendar>
      )}
    </DatepickerField>
  );

  return (
    <div data-slot="date-range-picker" className={cn(datepickerRangeClassName, className)}>
      {field("from")}
      <span className={datepickerRangeSeparatorClassName}>{separator}</span>
      {field("to")}
    </div>
  );
}
