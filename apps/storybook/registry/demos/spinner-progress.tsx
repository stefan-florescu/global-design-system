import { CircleCheck } from "@stefan-florescu/icons";
import { Spinner } from "@stefan-florescu/ui";

export default function SpinnerProgress() {
  return (
    <div>
      <h2 className="text-heading mb-4 text-lg font-medium">Converting your image:</h2>
      <ul className="text-body max-w-md list-inside space-y-3">
        <li className="flex items-center">
          <CircleCheck aria-hidden className="text-fg-success me-2 size-5 shrink-0" />
          Upload your file to our website
          <span className="sr-only">, completed</span>
        </li>
        <li className="flex items-center">
          <CircleCheck aria-hidden className="text-fg-success me-2 size-5 shrink-0" />
          Choose your file format
          <span className="sr-only">, completed</span>
        </li>
        <li className="flex items-center">
          <Spinner size="xs" className="me-2" />
          Preparing your file
        </li>
      </ul>
    </div>
  );
}
