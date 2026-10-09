import { Info } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";

export default function AlertBordered() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Alert variant="brand" bordered icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Info alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="danger" bordered icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Danger alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="success" bordered icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Success alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="warning" bordered icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Warning alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
      <Alert variant="dark" bordered icon={<Info />}>
        <p>
          <span className="me-1 font-medium">Dark alert!</span> Change a few things up and try
          submitting again.
        </p>
      </Alert>
    </div>
  );
}
