import { useId } from "react";

import { HelperText, Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaValidation() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-bio`}>Bio</Label>
        <Textarea id={`${id}-bio`} invalid aria-describedby={`${id}-bio-help`} defaultValue="Hi" />
        <HelperText id={`${id}-bio-help`} variant="error">
          Tell us a bit more: at least 20 characters.
        </HelperText>
      </div>
    </div>
  );
}
