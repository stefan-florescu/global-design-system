import { useId } from "react";

import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldValidation() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <div className="mb-6">
        <Label htmlFor={`${id}-success`} variant="success">
          Your name
        </Label>
        <Input
          id={`${id}-success`}
          valid
          placeholder="Success input"
          aria-describedby={`${id}-success-help`}
        />
        <HelperText id={`${id}-success-help`} variant="success">
          <span className="font-medium">Well done!</span> Some success message.
        </HelperText>
      </div>
      <div className="mb-6">
        <Label htmlFor={`${id}-danger`} variant="danger">
          Your name
        </Label>
        <Input
          id={`${id}-danger`}
          invalid
          placeholder="Error input"
          aria-describedby={`${id}-danger-help`}
        />
        <HelperText id={`${id}-danger-help`} variant="danger">
          <span className="font-medium">Oh, snapp!</span> Some error message.
        </HelperText>
      </div>
    </div>
  );
}
