import { Navigation2 } from "@stefan-florescu/icons";
import { Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastSimple() {
  return (
    <Toast className="max-w-sm">
      <Navigation2 aria-hidden className="text-fg-brand size-5 shrink-0" />
      <div className="border-default ms-2.5 border-s ps-3.5 text-sm">
        Message sent successfully.
      </div>
      <ToastToggle />
    </Toast>
  );
}
