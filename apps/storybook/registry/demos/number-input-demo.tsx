import { useId } from "react";

import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-quantity`}>Quantity</Label>
        <NumberInput id={`${id}-quantity`} min={0} placeholder="0" />
      </div>
    </div>
  );
}
