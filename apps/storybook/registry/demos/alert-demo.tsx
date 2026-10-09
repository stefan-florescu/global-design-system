import { Alert } from "@stefan-florescu/ui";

export default function AlertDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Alert variant="brand">
        <span className="font-medium">Info alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="danger">
        <span className="font-medium">Danger alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="success">
        <span className="font-medium">Success alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="warning">
        <span className="font-medium">Warning alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="dark">
        <span className="font-medium">Dark alert!</span> Change a few things up and try submitting
        again.
      </Alert>
    </div>
  );
}
