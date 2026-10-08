import { useId } from "react";

import { Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-start-time`}>Start time</Label>
        <Timepicker id={`${id}-start-time`} defaultValue="09:00" />
      </div>
    </div>
  );
}
