import { useId } from "react";

import { Label, PhoneInput } from "@stefan-florescu/ui";

export default function NumberInputPhone() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-sm">
      <Label htmlFor={`${id}-phone`} className="sr-only">
        Phone number:
      </Label>
      <PhoneInput
        id={`${id}-phone`}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
        required
      />
    </form>
  );
}
