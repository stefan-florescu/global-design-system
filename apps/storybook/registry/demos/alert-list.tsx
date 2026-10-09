import { Info } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";

export default function AlertList() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Alert variant="brand" bordered icon={<Info />}>
        <span className="sr-only">Info: </span>
        <span className="font-medium">Ensure that these requirements are met:</span>
        <ul className="mt-2 list-outside list-disc space-y-1 ps-2.5">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </Alert>
      <Alert variant="danger" bordered icon={<Info />}>
        <span className="sr-only">Danger: </span>
        <span className="font-medium">Ensure that these requirements are met:</span>
        <ul className="mt-2 list-outside list-disc space-y-1 ps-2.5">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </Alert>
      <Alert variant="success" bordered icon={<Info />}>
        <span className="sr-only">Success: </span>
        <span className="font-medium">Ensure that these requirements are met:</span>
        <ul className="mt-2 list-outside list-disc space-y-1 ps-2.5">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </Alert>
      <Alert variant="warning" bordered icon={<Info />}>
        <span className="sr-only">Warning: </span>
        <span className="font-medium">Ensure that these requirements are met:</span>
        <ul className="mt-2 list-outside list-disc space-y-1 ps-2.5">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </Alert>
      <Alert variant="dark" bordered icon={<Info />}>
        <span className="sr-only">Dark: </span>
        <span className="font-medium">Ensure that these requirements are met:</span>
        <ul className="mt-2 list-outside list-disc space-y-1 ps-2.5">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </Alert>
    </div>
  );
}
