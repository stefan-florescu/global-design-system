import { useId } from "react";

import { Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardInput() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full max-w-64">
      <div className="relative">
        <Label htmlFor={`${id}-npm-install`} className="sr-only">
          Install command
        </Label>
        <Input
          id={`${id}-npm-install`}
          className="text-body"
          readOnly
          value="npm i @stefan-florescu/ui"
        />
        <Clipboard
          value="npm i @stefan-florescu/ui"
          variant="ghost"
          size="sm"
          iconOnly
          label="Copy to clipboard"
          className="absolute end-2 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
