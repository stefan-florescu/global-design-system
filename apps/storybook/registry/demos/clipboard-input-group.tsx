import { useId } from "react";

import {
  Clipboard,
  fieldGroupClassName,
  fieldGroupItemClassName,
  HelperText,
  Input,
  Label,
} from "@stefan-florescu/ui";

export default function ClipboardInputGroup() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full max-w-sm">
      <Label htmlFor={`${id}-website-url`}>Verify your website:</Label>
      <div className={fieldGroupClassName}>
        <Input
          id={`${id}-website-url`}
          readOnly
          value="https://example.com"
          addon="URL"
          aria-describedby={`${id}-website-url-help`}
          className={`${fieldGroupItemClassName} text-body rounded-e-none`}
        />
        <Clipboard
          value="https://example.com"
          iconOnly
          showTooltip
          label="Copy link"
          className="border-brand focus:z-raised rounded-s-none shadow-none"
        />
      </div>
      <HelperText id={`${id}-website-url-help`}>
        Security certificate is required for approval
      </HelperText>
    </div>
  );
}
