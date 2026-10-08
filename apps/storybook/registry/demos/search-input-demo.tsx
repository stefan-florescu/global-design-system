import { Label, SearchInput } from "@stefan-florescu/ui";

export default function SearchInputDemo() {
  return (
    <form role="search" className="w-full max-w-md">
      <Label htmlFor="search-demo" className="sr-only">
        Search
      </Label>
      <SearchInput id="search-demo" placeholder="Search components, tokens…" submitLabel="Search" />
    </form>
  );
}
