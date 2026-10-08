import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeSteps() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-rating`}>Rating</Label>
        <Range id={`${id}-rating`} min={0} max={5} step={0.5} defaultValue={2.5} />
      </div>
    </div>
  );
}
