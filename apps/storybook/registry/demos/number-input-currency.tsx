import { useId } from "react";

import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputCurrency() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-price`}>Price</Label>
        <NumberInput id={`${id}-price`} addon="$" min={0} step={0.01} placeholder="0.00" />
      </div>
    </div>
  );
}
