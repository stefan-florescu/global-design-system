import { useId } from "react";

import { Label, SearchInput } from "@stefan-florescu/ui";

export default function InputFieldSearch() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="w-full">
      <Label htmlFor={`${id}-search`} className="sr-only">
        Search
      </Label>
      <SearchInput id={`${id}-search`} placeholder="Search" submitLabel="Search" required />
    </form>
  );
}
