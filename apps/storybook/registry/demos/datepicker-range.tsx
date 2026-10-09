import { DateRangePicker } from "@stefan-florescu/ui";

export default function DatepickerRange() {
  return (
    // Leaves room for the calendar to open inside the preview.
    <div className="h-96">
      <DateRangePicker startName="start" endName="end" />
    </div>
  );
}
