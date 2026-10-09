import { Kbd } from "@stefan-florescu/ui";

export default function KbdText() {
  return (
    <p className="text-body">
      Please press <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>R</Kbd> to re-render an MDN page.
    </p>
  );
}
