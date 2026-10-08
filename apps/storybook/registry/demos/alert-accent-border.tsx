import { Alert } from "@stefan-florescu/ui";

export default function AlertAccentBorder() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Alert variant="info" accentBorder>
        <span className="font-medium">Info alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="destructive" accentBorder>
        <span className="font-medium">Danger alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="success" accentBorder>
        <span className="font-medium">Success alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="warning" accentBorder>
        <span className="font-medium">Warning alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="neutral" accentBorder>
        <span className="font-medium">Neutral alert!</span> Change a few things up and try
        submitting again.
      </Alert>
    </div>
  );
}
