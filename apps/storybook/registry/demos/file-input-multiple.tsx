import { useId } from "react";

import { FileInput, Label } from "@stefan-florescu/ui";

export default function FileInputMultiple() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={`${id}-multiple-files`}>Upload multiple files</Label>
      <FileInput id={`${id}-multiple-files`} multiple />
    </div>
  );
}
