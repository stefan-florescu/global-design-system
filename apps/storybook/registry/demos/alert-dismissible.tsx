import { Alert } from "@stefan-florescu/ui";

export default function AlertDismissible() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <Alert variant="info" dismissible>
        A simple info alert with an{" "}
        <a href="/foundation/color" className="font-semibold underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="destructive" dismissible>
        A simple destructive alert with an{" "}
        <a href="/foundation/color" className="font-semibold underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="success" dismissible>
        A simple success alert with an{" "}
        <a href="/foundation/color" className="font-semibold underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="warning" dismissible>
        A simple warning alert with an{" "}
        <a href="/foundation/color" className="font-semibold underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
      <Alert variant="neutral" dismissible>
        A simple neutral alert with an{" "}
        <a href="/foundation/color" className="font-semibold underline hover:no-underline">
          example link
        </a>
        . Give it a click if you like.
      </Alert>
    </div>
  );
}
