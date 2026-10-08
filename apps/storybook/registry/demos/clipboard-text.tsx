import { Clipboard, Input, Label } from "@stefan-florescu/ui";

export default function ClipboardText() {
  return (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="invite-link">Invite link</Label>
      <div className="relative">
        <Input
          id="invite-link"
          readOnly
          value="https://design.example.com/invite/7f3k"
          className="pe-28 font-mono"
          size="lg"
        />
        <Clipboard
          value="https://design.example.com/invite/7f3k"
          variant="outline"
          size="xs"
          label="Copy link"
          copiedLabel="Copied!"
          className="absolute end-2 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
