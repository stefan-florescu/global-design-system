import { useId } from "react";

import { FileInput, Label } from "@stefan-florescu/ui";

export default function FileInputSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full space-y-6">
      <Label htmlFor={`${id}-base-size`}>Base file input</Label>
      <FileInput id={`${id}-base-size`} />
      <Label htmlFor={`${id}-large-size`}>Large file input</Label>
      <FileInput id={`${id}-large-size`} size="lg" />
    </div>
  );
}
