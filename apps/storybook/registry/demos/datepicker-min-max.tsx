import { Calendar } from "@stefan-florescu/ui";

export default function DatepickerMinMax() {
  return (
    <Calendar
      defaultMonth={new Date(2026, 9, 1)}
      min={new Date(2026, 9, 5)}
      max={new Date(2026, 10, 20)}
    />
  );
}
