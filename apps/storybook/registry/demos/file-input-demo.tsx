import { useId } from "react";

import { FileInput, Label } from "@stefan-florescu/ui";

export default function FileInputDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={`${id}-file-input`}>Upload file</Label>
      <FileInput id={`${id}-file-input`} />
    </div>
  );
}
