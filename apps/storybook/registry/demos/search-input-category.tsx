import { useId } from "react";

import { Label, SearchInput, Select } from "@stefan-florescu/ui";

export default function SearchInputCategory() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="flex w-full max-w-lg gap-2">
      <div className="w-40 shrink-0">
        <Label htmlFor={`${id}-search-category`} className="sr-only">
          Category
        </Label>
        <Select id={`${id}-search-category`} defaultValue="all">
          <option value="all">All categories</option>
          <option value="components">Components</option>
          <option value="tokens">Tokens</option>
          <option value="forms">Forms</option>
        </Select>
      </div>
      <Label htmlFor={`${id}-search-with-category`} className="sr-only">
        Search
      </Label>
      <SearchInput id={`${id}-search-with-category`} placeholder="Search" submitLabel="Search" />
    </form>
  );
}
