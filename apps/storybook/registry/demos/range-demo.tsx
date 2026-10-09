import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={id}>Default range</Label>
      <Range id={id} defaultValue={50} />
    </div>
  );
}
