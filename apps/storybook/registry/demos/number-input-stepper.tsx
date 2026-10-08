import { useId } from "react";

import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputStepper() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-guests`}>Guests</Label>
        <NumberInput id={`${id}-guests`} stepper defaultValue={2} min={1} max={10} />
      </div>
    </div>
  );
}
