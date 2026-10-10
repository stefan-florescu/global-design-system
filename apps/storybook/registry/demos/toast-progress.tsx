import { CloudUpload } from "@stefan-florescu/icons";
import { Button, Progress, Toast, ToastIcon } from "@stefan-florescu/ui";

export default function ToastProgress() {
  return (
    <Toast className="block space-y-4">
      <ToastIcon size="md">
        <CloudUpload />
      </ToastIcon>
      <div className="text-body text-sm font-normal">
        <span className="text-heading mb-1 text-base font-medium">Uploading in progress</span>
        <div className="mt-1 mb-4">
          Please wait while your file is being uploaded. This may take a moment.
        </div>
        <div className="mb-4 flex items-center gap-2">
          <Progress value={75} size="sm" aria-label="Upload progress" />
          {/* The bar announces its own value; this is the visible copy. */}
          <div aria-hidden className="text-heading text-xs font-medium">
            75%
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="xs" fullWidth>
            Cancel upload
          </Button>
          <Button size="xs" fullWidth>
            Go to uploads
          </Button>
        </div>
      </div>
    </Toast>
  );
}
