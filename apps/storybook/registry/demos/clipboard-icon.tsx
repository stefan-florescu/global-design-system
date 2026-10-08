import { Clipboard } from "@stefan-florescu/ui";

export default function ClipboardIcon() {
  return (
    <div className="relative w-full max-w-md">
      <span className="border-border bg-muted block truncate rounded-lg border py-2.5 ps-3 pe-12 font-mono text-sm">
        npm install @stefan-florescu/ui
      </span>
      <Clipboard
        value="npm install @stefan-florescu/ui"
        iconOnly
        variant="ghost"
        size="sm"
        label="Copy install command"
        copiedLabel="Install command copied"
        className="absolute end-1 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
