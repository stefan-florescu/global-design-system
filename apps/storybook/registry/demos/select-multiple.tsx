import { useId } from "react";

import { Label, Select } from "@stefan-florescu/ui";

export default function SelectMultiple() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full max-w-sm">
      <Label htmlFor={`${id}-countries-multiple`}>Select an option</Label>
      <Select id={`${id}-countries-multiple`} multiple defaultValue={[""]}>
        <option value="">Choose countries</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </Select>
    </form>
  );
}
