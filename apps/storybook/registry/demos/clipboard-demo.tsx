import { Clipboard } from "@stefan-florescu/ui";

export default function ClipboardDemo() {
  return (
    <div className="flex w-full max-w-md items-center gap-2">
      <span
        id="install-command"
        className="border-border bg-muted min-w-0 flex-1 truncate rounded-lg border px-3 py-2 font-mono text-sm"
      >
        npm install @stefan-florescu/ui
      </span>
      <Clipboard value="npm install @stefan-florescu/ui" aria-describedby="install-command" />
    </div>
  );
}
