import { CloudUpload, Download } from "@stefan-florescu/icons";
import { Button, Toast, ToastIcon, ToastToggle } from "@stefan-florescu/ui";

export default function ToastInteractive() {
  return (
    <Toast className="block p-3">
      <div className="flex">
        <ToastIcon size="md">
          <CloudUpload />
        </ToastIcon>
        <div className="text-body ms-3 text-sm font-normal">
          <span className="text-heading mb-1 text-base font-medium">Update available</span>
          <div className="mb-3">A new software version is available for download.</div>
          <div className="grid grid-cols-2 gap-3">
            <ToastToggle asChild>
              <Button variant="secondary" size="xs" fullWidth>
                Not now
              </Button>
            </ToastToggle>
            <Button size="xs" fullWidth>
              <Download aria-hidden className="-ms-0.5" />
              Update
            </Button>
          </div>
        </div>
      </div>
    </Toast>
  );
}
