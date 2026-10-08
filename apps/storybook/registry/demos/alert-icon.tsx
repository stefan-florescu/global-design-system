import { CircleCheck, CircleX, Info, TriangleAlert } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";

export default function AlertIcon() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Alert variant="info" icon={<Info />}>
        <span className="font-medium">Info alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="destructive" icon={<CircleX />}>
        <span className="font-medium">Danger alert!</span> Change a few things up and try submitting
        again.
      </Alert>
      <Alert variant="success" icon={<CircleCheck />}>
        <span className="font-medium">Success alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="warning" icon={<TriangleAlert />}>
        <span className="font-medium">Warning alert!</span> Change a few things up and try
        submitting again.
      </Alert>
      <Alert variant="neutral" icon={<Info />}>
        <span className="font-medium">Neutral alert!</span> Change a few things up and try
        submitting again.
      </Alert>
    </div>
  );
}
