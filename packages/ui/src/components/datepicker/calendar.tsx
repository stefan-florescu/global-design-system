"use client";

import { ArrowLeft, ArrowRight } from "@stefan-florescu/icons";
import {
  useId,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

import {
  addDays,
  addMonths,
  clampDate,
  compareDays,
  isSameDay,
  isSameMonth,
  monthGrid,
  startOfMonth,
  startOfWeek,
  toISODate,
  type WeekDay,
} from "./date-utils";
import {
  calendarClassName,
  calendarDayVariants,
  calendarGridClassName,
  calendarHeaderClassName,
  calendarMainClassName,
  calendarMonthLabelClassName,
  calendarNavButtonClassName,
  calendarRowClassName,
  calendarTitleClassName,
  calendarWeekdayClassName,
  calendarWeekdaysClassName,
} from "./datepicker.variants";

export type DateRange = { from: Date | null; to: Date | null };

const EMPTY_RANGE: DateRange = { from: null, to: null };

type CalendarBaseProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue" | "title"> & {
  /** Earliest selectable day. */
  min?: Date;
  /** Latest selectable day. */
  max?: Date;
  /** Return `true` to disable a day, for example weekends. */
  isDateDisabled?: (date: Date) => boolean;
  /** First day of the week: 0 = Sunday, 1 = Monday… */
  weekStartsOn?: WeekDay;
  /** BCP 47 locale for month and weekday names, such as "en-GB". Defaults to the browser's. */
  locale?: string;
  /** Month shown first when there is no selection. */
  defaultMonth?: Date;
  /** Heading shown above the month navigation. */
  title?: ReactNode;
};

type SingleProps = {
  /** Pick one day (`single`) or a start and end day (`range`). */
  mode?: "single";
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
};

type RangeProps = {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  /**
   * Which end a click sets. Without it, the first click sets the start and the second the end;
   * `DateRangePicker` sets it to the field that opened the calendar.
   */
  rangeEdge?: "from" | "to";
};

export type CalendarProps = CalendarBaseProps & (SingleProps | RangeProps);

const noopSubscribe = () => () => {};

/**
 * Today's date on the client, `null` during server rendering. Statically rendered pages would
 * otherwise bake in the build date and mismatch on hydration.
 */
function useToday() {
  const key = useSyncExternalStore(
    noopSubscribe,
    () => toISODate(new Date()),
    () => null,
  );
  if (!key) return null;
  const [year, month, day] = key.split("-").map(Number) as [number, number, number];
  return new Date(year, month - 1, day);
}

/** A week starting on Sunday, 4 January 1970: only used to name the weekday columns. */
const REFERENCE_SUNDAY = new Date(1970, 0, 4);

const NAV_KEYS = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "PageUp",
  "PageDown",
];

/**
 * A month grid for choosing a day or a range of days. Follows the WAI-ARIA date picker grid:
 * arrow keys move by day and week, Home/End to the start/end of the week, Page Up/Down by month
 * (with Shift, by year), Enter or Space selects.
 */
export function Calendar(props: CalendarProps) {
  const {
    mode = "single",
    value,
    defaultValue,
    onChange,
    min,
    max,
    isDateDisabled,
    weekStartsOn = 0,
    locale,
    defaultMonth,
    title,
    className,
    children,
    ...restProps
  } = props;
  const { rangeEdge, ...rest } = restProps as typeof restProps & { rangeEdge?: "from" | "to" };

  const isRange = mode === "range";
  const [singleState, setSingleState] = useState<Date | null>(
    isRange ? null : ((defaultValue as Date | null | undefined) ?? null),
  );
  const [rangeState, setRangeState] = useState<DateRange>(
    isRange ? ((defaultValue as DateRange | undefined) ?? EMPTY_RANGE) : EMPTY_RANGE,
  );
  const single = isRange ? null : value !== undefined ? (value as Date | null) : singleState;
  const range = isRange ? ((value as DateRange | undefined) ?? rangeState) : EMPTY_RANGE;

  const today = useToday();
  const anchor = single ?? range.from ?? defaultMonth ?? null;
  const [focusedState, setFocused] = useState<Date | null>(() =>
    anchor ? clampDate(anchor, min, max) : null,
  );
  const [monthState, setMonth] = useState<Date | null>(() =>
    anchor ? startOfMonth(clampDate(anchor, min, max)) : null,
  );
  // Without a selection or defaultMonth, start from today once it is known on the client.
  const focused = focusedState ?? (today ? clampDate(today, min, max) : null);
  const month = monthState ?? (focused ? startOfMonth(focused) : null);
  const labelId = useId();

  const monthFormat = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const weekdayShort = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: "long" });
  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: "full" });

  const weeks = month ? monthGrid(month, weekStartsOn) : [];
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    addDays(REFERENCE_SUNDAY, (weekStartsOn + i) % 7),
  );

  const isDisabled = (date: Date) =>
    Boolean(
      (min && compareDays(date, min) < 0) ||
      (max && compareDays(date, max) > 0) ||
      isDateDisabled?.(date),
    );

  const canGoBack = Boolean(month) && (!min || compareDays(month!, startOfMonth(min)) > 0);
  const canGoForward = Boolean(month) && (!max || compareDays(month!, startOfMonth(max)) < 0);

  /** Show the previous (-1) or next (1) month and keep the focus target inside it. */
  const showMonth = (delta: number) => {
    if (!month || !focused) return;
    setMonth(addMonths(month, delta));
    setFocused(clampDate(addMonths(focused, delta), min, max));
  };

  const select = (date: Date) => {
    if (isDisabled(date)) return;
    setFocused(date);
    if (!month || !isSameMonth(date, month)) setMonth(startOfMonth(date));
    if (isRange) {
      const { from, to } = range;
      let next: DateRange;
      if (rangeEdge === "from") {
        next = { from: date, to: to && compareDays(date, to) > 0 ? null : to };
      } else if (rangeEdge === "to") {
        next = from && compareDays(date, from) < 0 ? { from: date, to: from } : { from, to: date };
      } else {
        next =
          !from || to
            ? { from: date, to: null }
            : compareDays(date, from) < 0
              ? { from: date, to: from }
              : { from, to: date };
      }
      if (value === undefined) setRangeState(next);
      (onChange as ((next: DateRange) => void) | undefined)?.(next);
    } else {
      if (value === undefined) setSingleState(date);
      (onChange as ((next: Date) => void) | undefined)?.(date);
    }
  };

  const onDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    if (!NAV_KEYS.includes(event.key)) return;
    event.preventDefault();
    const months = event.shiftKey ? 12 : 1;
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(date, -1),
      ArrowRight: () => addDays(date, 1),
      ArrowUp: () => addDays(date, -7),
      ArrowDown: () => addDays(date, 7),
      Home: () => startOfWeek(date, weekStartsOn),
      End: () => addDays(startOfWeek(date, weekStartsOn), 6),
      PageUp: () => addMonths(date, -months),
      PageDown: () => addMonths(date, months),
    };
    const next = clampDate(moves[event.key]!(), min, max);
    setFocused(next);
    if (!month || !isSameMonth(next, month)) setMonth(startOfMonth(next));
    const root = event.currentTarget.closest('[data-slot="calendar"]');
    requestAnimationFrame(() =>
      root?.querySelector<HTMLButtonElement>(`[data-date="${toISODate(next)}"]`)?.focus(),
    );
  };

  const stateOf = (date: Date) => {
    if (isDisabled(date)) return "disabled" as const;
    if (isRange) {
      const { from, to } = range;
      const both = Boolean(from && to && !isSameDay(from, to));
      if (both && isSameDay(date, from)) return "rangeStart" as const;
      if (both && isSameDay(date, to)) return "rangeEnd" as const;
      if (isSameDay(date, from) || isSameDay(date, to)) return "selected" as const;
      if (
        range.from &&
        range.to &&
        compareDays(date, range.from) > 0 &&
        compareDays(date, range.to) < 0
      )
        return "inRange" as const;
    } else if (isSameDay(date, single)) {
      return "selected" as const;
    }
    return month && isSameMonth(date, month) ? ("default" as const) : ("outside" as const);
  };

  const isSelected = (state: ReturnType<typeof stateOf>) =>
    state === "selected" || state === "rangeStart" || state === "rangeEnd" || state === "inRange";

  return (
    <div data-slot="calendar" className={cn(calendarClassName, className)} {...rest}>
      {title ? <div className={calendarTitleClassName}>{title}</div> : null}
      <div className={calendarHeaderClassName}>
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canGoBack}
          className={calendarNavButtonClassName}
          onClick={() => showMonth(-1)}
        >
          <ArrowLeft aria-hidden />
        </button>
        <div id={labelId} aria-live="polite" className={calendarMonthLabelClassName}>
          {month ? monthFormat.format(month) : null}
        </div>
        <button
          type="button"
          aria-label="Next month"
          disabled={!canGoForward}
          className={calendarNavButtonClassName}
          onClick={() => showMonth(1)}
        >
          <ArrowRight aria-hidden />
        </button>
      </div>
      <div
        role="grid"
        aria-labelledby={labelId}
        aria-multiselectable={isRange || undefined}
        className={calendarMainClassName}
      >
        <div role="row" className={calendarWeekdaysClassName}>
          {weekdays.map((day) => (
            <div key={day.getDay()} role="columnheader" className={calendarWeekdayClassName}>
              <abbr title={weekdayLong.format(day)} className="no-underline">
                {weekdayShort.format(day).slice(0, 2)}
              </abbr>
            </div>
          ))}
        </div>
        <div role="rowgroup" className={calendarGridClassName}>
          {weeks.map((week) => (
            <div key={toISODate(week[0]!)} role="row" className={calendarRowClassName}>
              {week.map((date) => {
                const state = stateOf(date);
                const isFocusTarget = isSameDay(date, focused);
                return (
                  <div
                    key={toISODate(date)}
                    role="gridcell"
                    aria-selected={isSelected(state)}
                    className="flex"
                  >
                    <button
                      type="button"
                      data-date={toISODate(date)}
                      tabIndex={isFocusTarget ? 0 : -1}
                      aria-label={dayLabel.format(date)}
                      aria-current={isSameDay(date, today) ? "date" : undefined}
                      aria-disabled={state === "disabled" || undefined}
                      className={calendarDayVariants({ state })}
                      onClick={() => select(date)}
                      onKeyDown={(event) => onDayKeyDown(event, date)}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
