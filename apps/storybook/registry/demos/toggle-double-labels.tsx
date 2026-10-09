import { useId } from "react";

import { Label, Toggle } from "@stefan-florescu/ui";

export default function ToggleDoubleLabels() {
  const id = useId();

  return (
    <div className="inline-flex items-center">
      <Label htmlFor={id} className="mb-0 cursor-pointer select-none">
        Monthly
      </Label>
      <Toggle id={id} aria-label="Bill yearly" className="mx-3" />
      <Label htmlFor={id} className="mb-0 cursor-pointer select-none">
        Yearly
      </Label>
    </div>
  );
}
