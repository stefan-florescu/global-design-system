import { useId } from "react";

import { Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerRange() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-range-start`}>Start</Label>
        <Timepicker id={`${id}-range-start`} defaultValue="09:00" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-range-end`}>End</Label>
        <Timepicker id={`${id}-range-end`} defaultValue="17:30" />
      </div>
    </div>
  );
}
