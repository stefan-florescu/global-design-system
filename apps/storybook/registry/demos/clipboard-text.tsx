import { Clipboard } from "@stefan-florescu/ui";

export default function ClipboardText() {
  return (
    <div className="relative w-full max-w-md">
      <span className="border-border bg-muted block truncate rounded-lg border py-3 ps-3 pe-28 font-mono text-sm">
        https://design.example.com/invite/7f3k
      </span>
      <Clipboard
        value="https://design.example.com/invite/7f3k"
        variant="outline"
        size="xs"
        label="Copy link"
        copiedLabel="Copied!"
        className="absolute end-2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
