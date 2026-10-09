import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeMinMax() {
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={id}>Min-max range</Label>
      <Range id={id} min={0} max={10} defaultValue={5} />
    </div>
  );
}
