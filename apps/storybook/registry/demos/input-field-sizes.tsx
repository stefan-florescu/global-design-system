import { useId } from "react";

import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full space-y-6">
      <div>
        <Label htmlFor={`${id}-sm`}>Small Input</Label>
        <Input id={`${id}-sm`} size="sm" />
      </div>
      <div>
        <Label htmlFor={`${id}-md`}>Base Input</Label>
        <Input id={`${id}-md`} />
      </div>
      <div>
        <Label htmlFor={`${id}-lg`}>Large Input</Label>
        <Input id={`${id}-lg`} size="lg" />
      </div>
      <div>
        <Label htmlFor={`${id}-xl`}>Extra Large Input</Label>
        <Input id={`${id}-xl`} size="xl" />
      </div>
    </div>
  );
}
