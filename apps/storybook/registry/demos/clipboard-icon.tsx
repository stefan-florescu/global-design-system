import { Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardIcon() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="install-icon">Install command</Label>
      <div className="relative">
        <Input
          id="install-icon"
          readOnly
          value="npm install @stefan-florescu/ui"
          className="pe-12 font-mono"
        />
        <Clipboard
          value="npm install @stefan-florescu/ui"
          iconOnly
          variant="ghost"
          size="sm"
          label="Copy install command"
          copiedLabel="Install command copied"
          className="absolute end-0.5 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
