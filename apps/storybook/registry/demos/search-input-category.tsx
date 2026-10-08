import { Label, SearchInput, Select } from "@stefan-florescu/ui";

export default function SearchInputCategory() {
  return (
    <form role="search" className="flex w-full max-w-lg gap-2">
      <div className="w-40 shrink-0">
        <Label htmlFor="search-category" className="sr-only">
          Category
        </Label>
        <Select id="search-category" defaultValue="all">
          <option value="all">All categories</option>
          <option value="components">Components</option>
          <option value="tokens">Tokens</option>
          <option value="forms">Forms</option>
        </Select>
      </div>
      <Label htmlFor="search-with-category" className="sr-only">
        Search
      </Label>
      <SearchInput id="search-with-category" placeholder="Search" submitLabel="Search" />
    </form>
  );
}
