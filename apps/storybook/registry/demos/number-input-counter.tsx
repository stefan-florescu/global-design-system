import { useId } from "react";

import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputCounter() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-xs">
      <Label htmlFor={`${id}-counter`} className="mb-1.5">
        Choose quantity:
      </Label>
      <NumberInput id={`${id}-counter`} variant="counter" defaultValue={12} min={0} required />
    </form>
  );
}
