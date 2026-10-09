import { Datepicker } from "@stefan-florescu/ui";

export default function DatepickerButtons() {
  return (
    // Leaves room for the calendar to open inside the preview.
    <div className="h-112">
      <Datepicker showButtons />
    </div>
  );
}
