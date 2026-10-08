/*
 * Time field: the shared field styles with a clock icon at the end. Where the browser draws its
 * own picker button (Chromium, Safari), it is made transparent and sits under our icon, so
 * clicking the icon still opens the native picker.
 */
export const timepickerClassName =
  "tabular-nums [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";
