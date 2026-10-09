import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeSteps() {
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={id}>Range steps</Label>
      <Range id={id} min={0} max={5} step={0.5} defaultValue={2.5} />
    </div>
  );
}
