import { HelperText, Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerMinMax() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="meeting">Meeting time</Label>
        <Timepicker
          id="meeting"
          min="09:00"
          max="18:00"
          step={1800}
          defaultValue="10:00"
          aria-describedby="meeting-help"
        />
        <HelperText id="meeting-help">
          Office hours are 9:00 to 18:00, in 30-minute slots.
        </HelperText>
      </div>
    </div>
  );
}
