import { Toast } from "@stefan-florescu/ui";

// The frame stands in for the screen: in an app, use `fixed` instead of `absolute`, or show the
// toasts with `ToastProvider`. `w-auto` fits the toasts to their text so the corners don't overlap
// in this small frame.
export default function ToastPositioning() {
  return (
    <div className="rounded-base border-default bg-neutral-secondary-soft relative h-56 w-full overflow-hidden border">
      <Toast className="absolute start-5 top-5 w-auto">
        <div className="text-sm font-normal">Top left positioning.</div>
      </Toast>
      <Toast className="absolute end-5 top-5 w-auto">
        <div className="text-sm font-normal">Top right positioning.</div>
      </Toast>
      <Toast className="absolute end-5 bottom-5 w-auto">
        <div className="text-sm font-normal">Bottom right positioning.</div>
      </Toast>
      <Toast className="absolute start-5 bottom-5 w-auto">
        <div className="text-sm font-normal">Bottom left positioning.</div>
      </Toast>
    </div>
  );
}
