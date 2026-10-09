import { Kbd } from "@stefan-florescu/ui";

export default function KbdHint() {
  return (
    <p className="text-body text-sm">
      Press <Kbd size="sm">Ctrl</Kbd> <Kbd size="sm">K</Kbd> to search the docs, or{" "}
      <Kbd size="sm">/</Kbd> anywhere on the page.
    </p>
  );
}
