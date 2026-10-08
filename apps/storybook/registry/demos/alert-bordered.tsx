import { Alert } from "@stefan-florescu/ui";

export default function AlertBordered() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Alert variant="info" bordered>
        <span className="font-medium">Info alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="destructive" bordered>
        <span className="font-medium">Danger alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="success" bordered>
        <span className="font-medium">Success alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="warning" bordered>
        <span className="font-medium">Warning alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="neutral" bordered>
        <span className="font-medium">Neutral alert!</span> Change a few things up and try
        submitting again.
      </Alert>
    </div>
  );
}
