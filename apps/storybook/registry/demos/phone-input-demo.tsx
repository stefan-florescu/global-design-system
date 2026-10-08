import { useId } from "react";

import { Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-phone`}>Phone number</Label>
        <PhoneInput id={`${id}-phone`} placeholder="123-456-7890" />
      </div>
    </div>
  );
}
