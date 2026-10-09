import { useId } from "react";

import { Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerRange() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto grid w-full max-w-[16rem] grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`${id}-start-time`} className="mb-2">
          Start time:
        </Label>
        <Timepicker id={`${id}-start-time`} min="09:00" max="18:00" defaultValue="00:00" required />
      </div>
      <div>
        <Label htmlFor={`${id}-end-time`} className="mb-2">
          End time:
        </Label>
        <Timepicker id={`${id}-end-time`} min="09:00" max="18:00" defaultValue="00:00" required />
      </div>
    </form>
  );
}
