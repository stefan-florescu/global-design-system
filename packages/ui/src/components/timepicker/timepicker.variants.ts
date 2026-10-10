/*
 * Timepicker: the shared field styles (see input.variants.ts) with even `p-2.5` padding. Where
 * the browser draws its own picker button (Chromium, Safari) it is hidden but still clickable
 * under the clock icon, so the icon opens the native picker.
 */
export const timepickerClassName = "p-2.5 [&::-webkit-calendar-picker-indicator]:opacity-0";

/** The clock: 16px, `body`, 14px from the end edge (`pe-3.5`). */
export const timepickerIconClassName =
  "pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5 text-body [&_svg]:size-4";
