import { Info } from "@stefan-florescu/icons";
import { Alert } from "@stefan-florescu/ui";

export default function AlertDismissible() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Alert variant="brand" dismissible icon={<Info />}>
        <span className="sr-only">Info: </span>A simple info alert with an{" "}
        <a href="/foundation/color" className="font-medium underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="danger" dismissible icon={<Info />}>
        <span className="sr-only">Danger: </span>A simple info alert with an{" "}
        <a href="/foundation/color" className="font-medium underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="success" dismissible icon={<Info />}>
        <span className="sr-only">Success: </span>A simple info alert with an{" "}
        <a href="/foundation/color" className="font-medium underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="warning" dismissible icon={<Info />}>
        <span className="sr-only">Warning: </span>A simple info alert with an{" "}
        <a href="/foundation/color" className="font-medium underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="dark" dismissible icon={<Info />}>
        <span className="sr-only">Dark: </span>A simple dark alert with an{" "}
        <a href="/foundation/color" className="font-medium underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
    </div>
  );
}
