/** Small, dependency-free date helpers. All dates are local and compared by day. */

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Adds months, keeping the day where possible (Jan 31 + 1 month = Feb 28/29). */
export function addMonths(date: Date, months: number) {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function startOfWeek(date: Date, weekStartsOn: WeekDay) {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined) {
  return Boolean(
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate(),
  );
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Compares by day: negative when a is before b. */
export function compareDays(a: Date, b: Date) {
  return startOfDay(a).getTime() - startOfDay(b).getTime();
}

export function clampDate(date: Date, min?: Date, max?: Date) {
  if (min && compareDays(date, min) < 0) return startOfDay(min);
  if (max && compareDays(date, max) > 0) return startOfDay(max);
  return date;
}

/** yyyy-mm-dd in local time. */
export function toISODate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** The six weeks shown for a month, starting on `weekStartsOn`. */
export function monthGrid(month: Date, weekStartsOn: WeekDay) {
  const first = startOfWeek(startOfMonth(month), weekStartsOn);
  return Array.from({ length: 6 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => addDays(first, week * 7 + day)),
  );
}

const FORMAT_TOKENS = /yyyy|yy|y|mm|m|MM|M|dd|d|DD|D/g;

function names(locale: string | undefined, style: "long" | "short", kind: "month" | "weekday") {
  const format = new Intl.DateTimeFormat(locale, { [kind]: style });
  return kind === "month"
    ? Array.from({ length: 12 }, (_, month) => format.format(new Date(2024, month, 1)))
    : Array.from({ length: 7 }, (_, day) => format.format(new Date(2024, 0, 7 + day)));
}

/**
 * Formats a date with format tokens: `d`/`dd` day, `D`/`DD` short/long weekday,
 * `m`/`mm` month, `M`/`MM` short/long month name, `yy`/`yyyy` year. Default `mm/dd/yyyy`.
 */
export function formatDate(date: Date, pattern = "mm/dd/yyyy", locale?: string) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const values: Record<string, () => string> = {
    d: () => String(date.getDate()),
    dd: () => pad(date.getDate()),
    D: () => names(locale, "short", "weekday")[date.getDay()]!,
    DD: () => names(locale, "long", "weekday")[date.getDay()]!,
    m: () => String(date.getMonth() + 1),
    mm: () => pad(date.getMonth() + 1),
    M: () => names(locale, "short", "month")[date.getMonth()]!,
    MM: () => names(locale, "long", "month")[date.getMonth()]!,
    y: () => String(date.getFullYear()),
    yy: () => pad(date.getFullYear() % 100),
    yyyy: () => String(date.getFullYear()),
  };
  return pattern.replace(FORMAT_TOKENS, (token) => values[token]!());
}

/** Reads a date typed in `pattern` (see formatDate). Returns `null` when it isn't a real date. */
export function parseDate(text: string, pattern = "mm/dd/yyyy", locale?: string) {
  const order: string[] = [];
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const source = escaped.replace(FORMAT_TOKENS, (token) => {
    order.push(token);
    return /^[dmy]+$/.test(token) ? "(\\d{1,4})" : "([^\\d\\s,./-]+)";
  });
  const match = new RegExp(`^\\s*${source}\\s*$`, "i").exec(text);
  if (!match) return null;
  let year = NaN;
  let month = NaN;
  let day = NaN;
  order.forEach((token, index) => {
    const raw = match[index + 1]!;
    if (token.startsWith("y")) year = Number(raw) < 100 ? 2000 + Number(raw) : Number(raw);
    else if (token === "m" || token === "mm") month = Number(raw) - 1;
    else if (token === "d" || token === "dd") day = Number(raw);
    else if (token === "M" || token === "MM") {
      const list = names(locale, token === "M" ? "short" : "long", "month");
      month = list.findIndex((name) => name.toLowerCase() === raw.toLowerCase());
    }
  });
  if ([year, month, day].some((n) => Number.isNaN(n) || n < 0)) return null;
  const date = new Date(year, month, day);
  return date.getMonth() === month && date.getDate() === day ? date : null;
}
