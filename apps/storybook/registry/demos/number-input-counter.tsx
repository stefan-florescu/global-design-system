import { useId } from "react";

import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputCounter() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid justify-items-start gap-2">
      <Label htmlFor={`${id}-counter`}>Choose quantity</Label>
      <div className="w-36">
        <NumberInput id={`${id}-counter`} stepper size="sm" defaultValue={1} min={1} max={99} />
      </div>
    </div>
  );
}
