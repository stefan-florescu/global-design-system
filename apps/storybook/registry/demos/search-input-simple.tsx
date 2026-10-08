import { useId } from "react";

import { Label, SearchInput } from "@stefan-florescu/ui";

export default function SearchInputSimple() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="w-full max-w-md">
      <Label htmlFor={`${id}-search-simple`} className="sr-only">
        Search
      </Label>
      <SearchInput id={`${id}-search-simple`} placeholder="Search" />
    </form>
  );
}
