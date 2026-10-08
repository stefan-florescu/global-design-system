import { useId } from "react";

import { HelperText, Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerMinMax() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-meeting`}>Meeting time</Label>
        <Timepicker
          id={`${id}-meeting`}
          min="09:00"
          max="18:00"
          step={1800}
          defaultValue="10:00"
          aria-describedby={`${id}-meeting-help`}
        />
        <HelperText id={`${id}-meeting-help`}>
          Office hours are 9:00 to 18:00, in 30-minute slots.
        </HelperText>
      </div>
    </div>
  );
}
