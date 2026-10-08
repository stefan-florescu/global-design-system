import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-range-sm`}>Small</Label>
        <Range id={`${id}-range-sm`} size="sm" defaultValue={50} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-range-md`}>Medium</Label>
        <Range id={`${id}-range-md`} size="md" defaultValue={50} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-range-lg`}>Large</Label>
        <Range id={`${id}-range-lg`} size="lg" defaultValue={50} />
      </div>
    </div>
  );
}
