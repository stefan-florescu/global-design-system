import { Check, CircleAlert, X } from "@stefan-florescu/icons";
import { Toast, ToastIcon, ToastToggle } from "@stefan-florescu/ui";

export default function ToastColors() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Toast className="max-w-sm">
        <ToastIcon variant="success" label="Success:">
          <Check />
        </ToastIcon>
        <div className="ms-3 text-sm font-normal">Item moved successfully.</div>
        <ToastToggle />
      </Toast>
      <Toast className="max-w-sm">
        <ToastIcon variant="danger" label="Error:">
          <X />
        </ToastIcon>
        <div className="ms-3 text-sm font-normal">Item has been deleted.</div>
        <ToastToggle />
      </Toast>
      <Toast className="max-w-sm">
        <ToastIcon variant="warning" label="Warning:">
          <CircleAlert />
        </ToastIcon>
        <div className="ms-3 text-sm font-normal">Improve password difficulty.</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}
