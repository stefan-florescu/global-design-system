import { useId } from "react";

import { Label, Select } from "@stefan-florescu/ui";

export default function SelectDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full max-w-sm">
      <Label htmlFor={`${id}-countries`}>Select an option</Label>
      <Select id={`${id}-countries`} defaultValue="">
        <option value="">Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </Select>
    </form>
  );
}
