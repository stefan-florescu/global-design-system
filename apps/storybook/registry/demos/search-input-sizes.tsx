import { Label, SearchInput } from "@stefan-florescu/ui";

export default function SearchInputSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <form role="search">
        <Label htmlFor="search-sm" className="sr-only">
          Search (Small)
        </Label>
        <SearchInput id="search-sm" size="sm" placeholder="Small" submitLabel="Search" />
      </form>
      <form role="search">
        <Label htmlFor="search-md" className="sr-only">
          Search (Medium)
        </Label>
        <SearchInput id="search-md" size="md" placeholder="Medium" submitLabel="Search" />
      </form>
      <form role="search">
        <Label htmlFor="search-lg" className="sr-only">
          Search (Large)
        </Label>
        <SearchInput id="search-lg" size="lg" placeholder="Large" submitLabel="Search" />
      </form>
    </div>
  );
}
