import { useId } from "react";

import { Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-92 grid-cols-8 gap-2">
      <Label htmlFor={`${id}-npm-install`} className="sr-only">
        Install command
      </Label>
      <Input
        id={`${id}-npm-install`}
        readOnly
        value="npm i @stefan-florescu/ui"
        className="text-body col-span-6"
      />
      <Clipboard value="npm i @stefan-florescu/ui" className="col-span-2" />
    </div>
  );
}
