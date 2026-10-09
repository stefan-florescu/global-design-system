import { useId } from "react";

import { Label, Timepicker } from "@stefan-florescu/ui";

export default function DatepickerTimepicker() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-32">
      <Label htmlFor={`${id}-time`} className="mb-2">
        Select time:
      </Label>
      <Timepicker id={`${id}-time`} min="09:00" max="18:00" defaultValue="00:00" required />
    </form>
  );
}
