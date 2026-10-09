import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeDisabled() {
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={id}>Default range</Label>
      <Range id={id} defaultValue={50} disabled />
    </div>
  );
}
