import { Upload } from "@stefan-florescu/icons";
import { Button, Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastDanger() {
  return (
    <Toast variant="danger" className="block">
      <h4 className="font-semibold">Whoops! Something went wrong</h4>
      <div className="mt-2 mb-4">
        The file format is not supported. Please upload a valid file type{" "}
        <span className="font-medium">(PDF, JPG, PNG)</span>.
      </div>
      <div className="flex items-center gap-3">
        <Button variant="danger" size="xs">
          <Upload aria-hidden />
          Try again
        </Button>
        <ToastToggle asChild>
          <Button variant="danger" outline size="xs" className="bg-transparent">
            Close
          </Button>
        </ToastToggle>
      </div>
    </Toast>
  );
}
