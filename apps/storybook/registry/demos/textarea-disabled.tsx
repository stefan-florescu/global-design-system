import { useId } from "react";

import { Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaDisabled() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-notes`}>Notes</Label>
        <Textarea id={`${id}-notes`} disabled placeholder="Notes are closed for this project." />
      </div>
    </div>
  );
}
