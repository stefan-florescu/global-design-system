import { useId } from "react";

import { HelperText, Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputValidation() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-phone-invalid`}>Phone number</Label>
        <PhoneInput
          id={`${id}-phone-invalid`}
          invalid
          defaultValue="12"
          aria-describedby={`${id}-phone-invalid-help`}
        />
        <HelperText id={`${id}-phone-invalid-help`} variant="error">
          Enter a full phone number.
        </HelperText>
      </div>
    </div>
  );
}
