import { Datepicker } from "@stefan-florescu/ui";

export default function DatepickerTitle() {
  return (
    <div className="h-96">
      {/* Leaves room for the calendar to open inside the preview. */}
      <Datepicker label="Delivery date" title="When should we deliver?" />
    </div>
  );
}
