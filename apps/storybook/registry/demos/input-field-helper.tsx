import { useId } from "react";

import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldHelper() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-helper-email`}>Email address</Label>
        <Input
          id={`${id}-helper-email`}
          type="email"
          aria-describedby={`${id}-helper-email-help`}
          placeholder="ana@example.com"
        />
        <HelperText id={`${id}-helper-email-help`}>
          We&apos;ll never share your email with anyone else.
        </HelperText>
      </div>
    </div>
  );
}
