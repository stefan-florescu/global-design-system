import { useId } from "react";

import { MapPin } from "@stefan-florescu/icons";
import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function NumberInputZip() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-sm">
      <Label htmlFor={`${id}-zip`}>ZIP code:</Label>
      <Input
        id={`${id}-zip`}
        inputMode="numeric"
        autoComplete="postal-code"
        pattern="^\d{5}(-\d{4})?$"
        startIcon={<MapPin />}
        placeholder="12345 or 12345-6789"
        aria-describedby={`${id}-zip-help`}
        required
      />
      <HelperText id={`${id}-zip-help`}>Please select a 5 digit number from 0 to 9.</HelperText>
    </form>
  );
}
