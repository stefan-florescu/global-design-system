import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeSizes() {
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={`${id}-sm`}>Small range</Label>
      <Range id={`${id}-sm`} size="sm" defaultValue={50} className="mb-6" />
      <Label htmlFor={`${id}-md`}>Default range</Label>
      <Range id={`${id}-md`} size="md" defaultValue={50} className="mb-6" />
      <Label htmlFor={`${id}-lg`}>Large range</Label>
      <Range id={`${id}-lg`} size="lg" defaultValue={50} />
    </div>
  );
}
