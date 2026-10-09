import { Datepicker } from "@stefan-florescu/ui";

export default function DatepickerFormat() {
  return (
    // Leaves room for the calendar to open inside the preview.
    <div className="h-96">
      <Datepicker format="mm-dd-yyyy" />
    </div>
  );
}
