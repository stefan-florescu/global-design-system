import { useId } from "react";

import { MapPin } from "@stefan-florescu/icons";
import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function NumberInputZip() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-zip`}>ZIP code</Label>
        <Input
          id={`${id}-zip`}
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          startIcon={<MapPin />}
          placeholder="12345"
          aria-describedby={`${id}-zip-help`}
        />
        <HelperText id={`${id}-zip-help`}>Five digits.</HelperText>
      </div>
    </div>
  );
}
