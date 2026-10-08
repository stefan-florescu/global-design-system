import { Datepicker } from "@stefan-florescu/ui";

export default function DatepickerButtons() {
  return (
    <div className="h-96">
      {/* Leaves room for the calendar to open inside the preview. */}
      <Datepicker showTodayButton showClearButton />
    </div>
  );
}
