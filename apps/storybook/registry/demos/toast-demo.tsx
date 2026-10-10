import { Flame } from "@stefan-florescu/icons";
import { Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastDemo() {
  return (
    <Toast>
      <Flame aria-hidden className="text-fg-brand size-6 shrink-0" />
      <div className="border-default ms-2.5 border-s ps-3.5 text-sm">Set yourself free.</div>
      <ToastToggle />
    </Toast>
  );
}
