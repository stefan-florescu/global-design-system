"use client";

import { Calendar } from "@stefan-florescu/ui";

export default function DatepickerDisabledDays() {
  // Weekends can't be booked.
  return <Calendar isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6} />;
}
