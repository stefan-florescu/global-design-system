import { useId } from "react";

import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-size-sm`}>Small</Label>
        <Input id={`${id}-size-sm`} size="sm" placeholder="Small input" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-size-md`}>Medium</Label>
        <Input id={`${id}-size-md`} size="md" placeholder="Medium input" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-size-lg`}>Large</Label>
        <Input id={`${id}-size-lg`} size="lg" placeholder="Large input" />
      </div>
    </div>
  );
}
