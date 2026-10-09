import { useId } from "react";

import { FileInput, HelperText, Label } from "@stefan-florescu/ui";

export default function FileInputHelper() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={`${id}-file-input`}>Upload file</Label>
      <FileInput id={`${id}-file-input`} aria-describedby={`${id}-file-input-help`} />
      <HelperText id={`${id}-file-input-help`} className="mt-1">
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </HelperText>
    </div>
  );
}
