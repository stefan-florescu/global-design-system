import { useId } from "react";

import { FileInput, Label } from "@stefan-florescu/ui";

export default function FileInputSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-file-sm`}>Small</Label>
        <FileInput id={`${id}-file-sm`} size="sm" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-file-md`}>Medium</Label>
        <FileInput id={`${id}-file-md`} size="md" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-file-lg`}>Large</Label>
        <FileInput id={`${id}-file-lg`} size="lg" />
      </div>
    </div>
  );
}
