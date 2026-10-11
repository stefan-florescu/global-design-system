import { Datepicker } from "@stefan-florescu/ui";

export default function DatepickerTitle() {
  return (
    // Leaves room for the calendar to open inside the preview.
    <div className="h-112">
      <Datepicker title="Stefan DS datepicker" />
    </div>
  );
}
