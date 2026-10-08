import { useId } from "react";

import { FileInput, HelperText, Label } from "@stefan-florescu/ui";

export default function FileInputHelper() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-avatar`}>Profile picture</Label>
        <FileInput id={`${id}-avatar`} accept="image/*" aria-describedby={`${id}-avatar-help`} />
        <HelperText id={`${id}-avatar-help`}>SVG, PNG, JPG or GIF (max. 800×400px).</HelperText>
      </div>
    </div>
  );
}
