import { Datepicker } from "@stefan-florescu/ui";

export default function DatepickerMinMax() {
  return (
    // Leaves room for the calendar to open inside the preview.
    <div className="h-96">
      <Datepicker min={new Date(2024, 5, 4)} max={new Date(2025, 4, 5)} />
    </div>
  );
}
