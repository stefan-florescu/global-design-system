import { useId } from "react";

import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-sm">
      <Label htmlFor={`${id}-number`}>Select a number:</Label>
      <NumberInput id={`${id}-number`} placeholder="90210" required />
    </form>
  );
}
