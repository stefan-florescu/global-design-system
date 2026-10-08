import { Info } from "@stefan-florescu/icons";
import { Alert, AlertDescription, AlertTitle } from "@stefan-florescu/ui";

export default function AlertList() {
  return (
    <Alert variant="destructive" icon={<Info />} className="w-full max-w-2xl">
      <AlertTitle>Ensure that these requirements are met:</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc space-y-1">
          <li>At least 10 characters (and up to 100 characters)</li>
          <li>At least one lowercase character</li>
          <li>Inclusion of at least one special character, e.g., ! @ # ?</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
