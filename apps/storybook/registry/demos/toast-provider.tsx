"use client";

import { Check } from "@stefan-florescu/icons";
import {
  Button,
  Toast,
  ToastIcon,
  ToastProvider,
  ToastToggle,
  useToast,
} from "@stefan-florescu/ui";

function Actions() {
  const { toast, dismiss } = useToast();

  const archive = () => {
    const id = toast(
      <Toast>
        <div className="text-sm font-normal">Conversation archived.</div>
        <div className="ms-auto flex items-center gap-2">
          <Button variant="ghost" size="xs" className="text-fg-brand" onClick={() => dismiss(id)}>
            Undo
          </Button>
          <ToastToggle />
        </div>
      </Toast>,
    );
  };

  const save = () => {
    toast(
      <Toast>
        <ToastIcon variant="success">
          <Check />
        </ToastIcon>
        <div className="ms-3 text-sm font-normal">Settings saved.</div>
        <ToastToggle />
      </Toast>,
      { duration: 6000 },
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button onClick={archive}>Archive conversation</Button>
      <Button variant="secondary" onClick={save}>
        Save settings (closes after 6s)
      </Button>
    </div>
  );
}

// `contained` keeps the toasts in this frame; in an app, leave it out to stack them on the screen.
export default function ToastProviderDemo() {
  return (
    <div className="rounded-base border-default bg-neutral-secondary-soft relative h-80 w-full overflow-hidden border p-5">
      <ToastProvider contained position="bottom-end">
        <Actions />
      </ToastProvider>
    </div>
  );
}
