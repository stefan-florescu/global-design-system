import { useId } from "react";

import { Label, Select } from "@stefan-florescu/ui";

const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

export default function SelectSize() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full max-w-sm">
      <Label htmlFor={`${id}-years`}>Select an option</Label>
      <Select id={`${id}-years`} htmlSize={5}>
        {years.map((year) => (
          <option key={year}>{year}</option>
        ))}
      </Select>
    </form>
  );
}
