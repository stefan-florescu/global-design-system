import { useId } from "react";

import { HelperText, Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputHelper() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-phone-helper`}>Phone number</Label>
        <PhoneInput
          id={`${id}-phone-helper`}
          defaultCountry="RO"
          placeholder="712 345 678"
          aria-describedby={`${id}-phone-helper-help`}
        />
        <HelperText id={`${id}-phone-helper-help`}>
          We&apos;ll text you a verification code.
        </HelperText>
      </div>
    </div>
  );
}
