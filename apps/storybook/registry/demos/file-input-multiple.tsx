import { useId } from "react";

import { FileInput, Label } from "@stefan-florescu/ui";

export default function FileInputMultiple() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-attachments`}>Attachments</Label>
        <FileInput id={`${id}-attachments`} multiple />
      </div>
    </div>
  );
}
