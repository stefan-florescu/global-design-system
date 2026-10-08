import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-volume`}>Volume</Label>
        <Range id={`${id}-volume`} defaultValue={50} />
      </div>
    </div>
  );
}
