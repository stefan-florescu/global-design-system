import { useId } from "react";

import { Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor={`${id}-install-command`}>Install command</Label>
      <div className="flex items-center gap-2">
        <Input
          id={`${id}-install-command`}
          readOnly
          value="npm install @stefan-florescu/ui"
          className="font-mono"
        />
        <Clipboard value="npm install @stefan-florescu/ui" label="Copy" copiedLabel="Copied!" />
      </div>
    </div>
  );
}
