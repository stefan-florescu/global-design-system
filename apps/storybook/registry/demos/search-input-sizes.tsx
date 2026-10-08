import { useId } from "react";

import { Label, SearchInput } from "@stefan-florescu/ui";

export default function SearchInputSizes() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <form role="search">
        <Label htmlFor={`${id}-search-sm`} className="sr-only">
          Search (Small)
        </Label>
        <SearchInput id={`${id}-search-sm`} size="sm" placeholder="Small" submitLabel="Search" />
      </form>
      <form role="search">
        <Label htmlFor={`${id}-search-md`} className="sr-only">
          Search (Medium)
        </Label>
        <SearchInput id={`${id}-search-md`} size="md" placeholder="Medium" submitLabel="Search" />
      </form>
      <form role="search">
        <Label htmlFor={`${id}-search-lg`} className="sr-only">
          Search (Large)
        </Label>
        <SearchInput id={`${id}-search-lg`} size="lg" placeholder="Large" submitLabel="Search" />
      </form>
    </div>
  );
}
