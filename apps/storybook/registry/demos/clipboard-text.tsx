import { useId } from "react";

import { Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardText() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full max-w-72">
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
          variant="tertiary"
          copiedLabel="Copied"
          className="absolute end-1.5 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
