import { Eye, Info } from "@stefan-florescu/icons";
import { Button, Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastWarning() {
  return (
    <Toast variant="warning" className="block max-w-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Info aria-hidden className="me-2 size-4 shrink-0" />
          <span className="sr-only">Warning:</span>
          <h4 className="font-semibold">Upload your invoice</h4>
        </div>
        <ToastToggle className="text-fg-warning hover:bg-warning-medium hover:text-fg-warning focus:ring-warning-medium -mx-1.5 -my-1.5 p-1.5 focus:ring-2 [&_svg]:size-4" />
      </div>
      <div className="mt-2 mb-4">
        Upload your invoice in one of the supported formats{" "}
        <span className="font-medium">(PDF, JPG, PNG)</span> with a maximum file size of{" "}
        <span className="font-medium">5MB</span>. Ensure that all relevant details are visible for
        verification.
      </div>
      <div className="flex items-center gap-3">
        <Button variant="warning" size="xs">
          <Eye aria-hidden />
          Upload invoice
        </Button>
        <ToastToggle asChild>
          <Button variant="warning" outline size="xs" className="bg-transparent">
            Remind me later
          </Button>
        </ToastToggle>
      </div>
    </Toast>
  );
}
