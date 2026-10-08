import { Info } from "@stefan-florescu/icons";
import { Alert, AlertDescription, AlertTitle, Button } from "@stefan-florescu/ui";

export default function AlertAdditionalContent() {
  return (
    <Alert variant="info" bordered dismissible icon={<Info />} className="w-full max-w-2xl">
      <AlertTitle className="text-base">This is an info alert</AlertTitle>
      <AlertDescription>
        <p>
          More info about this info alert goes here. This example text is going to run a bit longer
          so that you can see how spacing within an alert works with this kind of content.
        </p>
        <div className="mt-4 flex gap-2">
          <Button size="xs" variant="info">
            View more
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
