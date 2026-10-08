import { useId } from "react";

import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldDisabled() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-disabled-input`}>Disabled</Label>
        <Input id={`${id}-disabled-input`} disabled placeholder="You can't type here" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-readonly-input`}>Read-only</Label>
        <Input id={`${id}-readonly-input`} readOnly defaultValue="ana@example.com" />
      </div>
    </div>
  );
}
