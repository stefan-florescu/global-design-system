import { useId } from "react";

import { Phone } from "@stefan-florescu/icons";
import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function PhoneInputDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-sm">
      <Label htmlFor={`${id}-phone`}>Phone number:</Label>
      <Input
        id={`${id}-phone`}
        type="tel"
        autoComplete="tel"
        startIcon={<Phone />}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
        aria-describedby={`${id}-phone-help`}
        required
      />
      <HelperText id={`${id}-phone-help`}>
        Select a phone number that matches the format.
      </HelperText>
    </form>
  );
}
