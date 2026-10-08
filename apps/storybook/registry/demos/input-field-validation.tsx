import { useId } from "react";

import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldValidation() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-valid-username`}>Username</Label>
        <Input
          id={`${id}-valid-username`}
          valid
          defaultValue="ana.popescu"
          aria-describedby={`${id}-valid-username-help`}
        />
        <HelperText id={`${id}-valid-username-help`} variant="success">
          Well done! That username is available.
        </HelperText>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-invalid-username`}>Username</Label>
        <Input
          id={`${id}-invalid-username`}
          invalid
          defaultValue="ana"
          aria-describedby={`${id}-invalid-username-help`}
        />
        <HelperText id={`${id}-invalid-username-help`} variant="error">
          Usernames need at least 6 characters.
        </HelperText>
      </div>
    </div>
  );
}
