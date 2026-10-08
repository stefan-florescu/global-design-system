import { useId } from "react";

import { Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-phone-sm`}>Small</Label>
        <PhoneInput id={`${id}-phone-sm`} size="sm" placeholder="123-456-7890" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-phone-md`}>Medium</Label>
        <PhoneInput id={`${id}-phone-md`} size="md" placeholder="123-456-7890" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-phone-lg`}>Large</Label>
        <PhoneInput id={`${id}-phone-lg`} size="lg" placeholder="123-456-7890" />
      </div>
    </div>
  );
}
