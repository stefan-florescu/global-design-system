import { useId } from "react";

import { Label, Select } from "@stefan-florescu/ui";

export default function SelectUnderline() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full max-w-sm">
      <Label htmlFor={`${id}-underline-select`} className="sr-only">
        Underline select
      </Label>
      <Select id={`${id}-underline-select`} variant="underline" defaultValue="">
        <option value="">Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </Select>
    </form>
  );
}
