import { Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardDemo() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="install-command">Install command</Label>
      <div className="flex items-center gap-2">
        <Input
          id="install-command"
          readOnly
          value="npm install @stefan-florescu/ui"
          className="font-mono"
        />
        <Clipboard value="npm install @stefan-florescu/ui" label="Copy" copiedLabel="Copied!" />
      </div>
    </div>
  );
}
