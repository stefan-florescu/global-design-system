import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline, focusOutlineInset } from "../../lib/focus";

/*
 * Flowbite v4's datepicker (https://flowbite.com/docs/components/datepicker/), class for class
 * from the flowbite-datepicker templates: a `neutral-primary-medium` panel with a `default-medium`
 * border, arrow buttons and the month in the header, a 256px day grid of `body` days with a
 * `neutral-tertiary-medium` hover, and the selected day filled with `brand`.
 * Accessibility deviations:
 * - days outside the month use `body-subtle` instead of `fg-disabled`, which is under 4.5:1 while
 *   those days can still be picked (`fg-disabled` stays for days that can't);
 * - days are buttons with a solid `ring` outline for keyboard focus (Flowbite shows none);
 * - the "today" and "clear" buttons also draw the solid outline.
 */
export const calendarClassName =
  "inline-block rounded-base border border-default-medium bg-neutral-primary-medium p-4";

export const calendarTitleClassName =
  "bg-neutral-primary-medium px-2 py-3 text-center font-medium text-heading";

export const calendarHeaderClassName = "mb-2 flex items-center justify-between";

export const calendarNavButtonClassName = [
  "inline-flex cursor-pointer items-center rounded-base bg-neutral-primary-medium p-2.5 text-lg text-body",
  "hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-2 focus:ring-neutral-tertiary",
  focusOutline,
  "disabled:cursor-not-allowed disabled:text-fg-disabled disabled:hover:bg-neutral-primary-medium",
  "[&_svg]:size-4 [&_svg]:rtl:rotate-180",
].join(" ");

/** Flowbite's month switch; here a label (the month and year). */
export const calendarMonthLabelClassName =
  "rounded-base bg-neutral-primary-medium px-5 py-2.5 text-sm font-medium text-heading";

export const calendarMainClassName = "p-1";

export const calendarWeekdaysClassName = "mb-1 grid grid-cols-7";

export const calendarWeekdayClassName = "h-6 text-center text-sm leading-6 font-medium text-body";

export const calendarGridClassName = "w-64";

export const calendarRowClassName = "grid grid-cols-7";

export const calendarDayVariants = cva(
  [
    "block flex-1 cursor-pointer rounded-base border-0 text-center text-sm leading-9 font-medium",
    focusOutlineInset,
  ],
  {
    variants: {
      state: {
        default: "text-body hover:bg-neutral-tertiary-medium",
        outside: "text-body-subtle hover:bg-neutral-tertiary-medium",
        selected: "bg-brand text-brand-foreground",
        rangeStart: "rounded-e-none bg-brand text-brand-foreground",
        rangeEnd: "rounded-s-none bg-brand text-brand-foreground",
        inRange: "rounded-none bg-neutral-tertiary-medium text-body",
        disabled: "cursor-not-allowed text-fg-disabled",
      },
    },
    defaultVariants: { state: "default" },
  },
);

export const calendarFooterClassName = "mt-2 flex gap-2";

/** Today and Clear: Flowbite's half-width `px-5 py-2` buttons. */
export const calendarFooterButtonClassName = "w-1/2 px-5 shadow-none";

/** The datepicker field: Flowbite's input with the calendar icon at the start. */
export const datepickerFieldClassName = "relative";

export const datepickerIconClassName =
  "pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-body [&_svg]:size-4";

export const datepickerInputClassName = "ps-9 pe-3";

export const datepickerRangeClassName = "flex items-center";

export const datepickerRangeSeparatorClassName = "mx-4 text-body";

export const datepickerPopoverVariants = cva("absolute z-popover w-max", {
  variants: {
    orientation: {
      "bottom left": "start-0 top-full pt-2",
      "bottom right": "end-0 top-full pt-2",
      "top left": "start-0 bottom-full pb-2",
      "top right": "end-0 bottom-full pb-2",
    },
  },
  defaultVariants: { orientation: "bottom left" },
});

export type DatepickerPopoverVariantProps = VariantProps<typeof datepickerPopoverVariants>;
