import { Eye, Info } from "@stefan-florescu/icons";
import { Alert, AlertDescription, AlertTitle, Button } from "@stefan-florescu/ui";

export default function AlertAdditionalContent() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Alert variant="brand" bordered dismissible>
        <AlertTitle className="flex items-center gap-2">
          <Info aria-hidden className="size-4 shrink-0" />
          This is a info alert
        </AlertTitle>
        <AlertDescription className="mb-4">
          More info about this info alert goes here. This example text is going to run a bit longer
          so that you can see how spacing within an alert works with this kind of content.
        </AlertDescription>
        <Button size="xs" variant="brand">
          <Eye aria-hidden />
          View more
        </Button>
      </Alert>
      <Alert variant="danger" bordered dismissible>
        <AlertTitle className="flex items-center gap-2">
          <Info aria-hidden className="size-4 shrink-0" />
          This is a danger alert
        </AlertTitle>
        <AlertDescription className="mb-4">
          More info about this info alert goes here. This example text is going to run a bit longer
          so that you can see how spacing within an alert works with this kind of content.
        </AlertDescription>
        <Button size="xs" variant="danger">
          <Eye aria-hidden />
          View more
        </Button>
      </Alert>
      <Alert variant="success" bordered dismissible>
        <AlertTitle className="flex items-center gap-2">
          <Info aria-hidden className="size-4 shrink-0" />
          This is a success alert
        </AlertTitle>
        <AlertDescription className="mb-4">
          More info about this info alert goes here. This example text is going to run a bit longer
          so that you can see how spacing within an alert works with this kind of content.
        </AlertDescription>
        <Button size="xs" variant="success">
          <Eye aria-hidden />
          View more
        </Button>
      </Alert>
      <Alert variant="warning" bordered dismissible>
        <AlertTitle className="flex items-center gap-2">
          <Info aria-hidden className="size-4 shrink-0" />
          This is a warning alert
        </AlertTitle>
        <AlertDescription className="mb-4">
          More info about this info alert goes here. This example text is going to run a bit longer
          so that you can see how spacing within an alert works with this kind of content.
        </AlertDescription>
        <Button size="xs" variant="warning">
          <Eye aria-hidden />
          View more
        </Button>
      </Alert>
      <Alert variant="dark" bordered dismissible>
        <AlertTitle className="flex items-center gap-2">
          <Info aria-hidden className="size-4 shrink-0" />
          This is a default alert
        </AlertTitle>
        <AlertDescription className="mb-4">
          More info about this info alert goes here. This example text is going to run a bit longer
          so that you can see how spacing within an alert works with this kind of content.
        </AlertDescription>
        <Button size="xs" variant="dark">
          <Eye aria-hidden />
          View more
        </Button>
      </Alert>
    </div>
  );
}
