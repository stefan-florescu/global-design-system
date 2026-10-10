import { Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastUndo() {
  return (
    <Toast>
      <div className="text-sm font-normal">Conversation archived.</div>
      <div className="ms-auto flex items-center gap-2">
        <a
          href="#undo-button"
          className="text-fg-brand focus-visible:outline-ring rounded-xs text-sm font-medium outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          Undo
        </a>
        <ToastToggle />
      </div>
    </Toast>
  );
}
