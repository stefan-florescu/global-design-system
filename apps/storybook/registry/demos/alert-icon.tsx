import { Info } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";

export default function AlertIcon() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Alert variant="brand" icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Info alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="danger" icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Danger alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="success" icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Success alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="warning" icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Warning alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="dark" icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Dark alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
    </div>
  );
}
