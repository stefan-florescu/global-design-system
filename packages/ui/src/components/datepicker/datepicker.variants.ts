import { cva } from "class-variance-authority";

/*
 * Flowbite's datepicker on semantic tokens: the calendar sits on the `popover` surface; days are
 * `foreground` with an `accent` hover; the selected day is a `brand` fill with
 * `brand-foreground`; days inside a range use `brand-subtle`; today is outlined in `brand`.
 */
export const calendarClassName =
  "inline-block rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-sm";

export const calendarHeaderClassName = "mb-2 flex items-center justify-between gap-2";

export const calendarMonthLabelClassName = "text-sm font-semibold";

export const calendarWeekdayClassName =
  "flex h-8 items-center justify-center text-xs font-medium text-muted-foreground no-underline";

export const calendarDayVariants = cva(
  [
    "inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold",
    "transition-colors motion-reduce:transition-none",
    "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
  ],
  {
    variants: {
      state: {
        default: "text-foreground hover:bg-accent hover:text-accent-foreground",
        outside: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        selected: "bg-brand text-brand-foreground",
        inRange: "rounded-none bg-brand-subtle text-brand-subtle-foreground",
        disabled: "cursor-not-allowed text-muted-foreground line-through opacity-50",
      },
      today: {
        true: "border border-brand",
        false: "",
      },
    },
    defaultVariants: { state: "default", today: false },
  },
);

export const datepickerPopoverClassName = "absolute top-full left-0 z-popover mt-2 w-max";

export const datepickerFooterClassName = "mt-3 flex gap-2";
