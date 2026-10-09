import { useId } from "react";

import { Button, HelperText, Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputVerification() {
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
        aria-describedby={`${id}-phone-help`}
        required
      />
      <HelperText id={`${id}-phone-help`} className="mb-4">
        We will send you an SMS with a verification code.
      </HelperText>
      <Button type="submit" fullWidth>
        Send verification code
      </Button>
    </form>
  );
}
