import { Label, SearchInput } from "@stefan-florescu/ui";

export default function SearchInputSimple() {
  return (
    <form role="search" className="w-full max-w-md">
      <Label htmlFor="search-simple" className="sr-only">
        Search
      </Label>
      <SearchInput id="search-simple" placeholder="Search" />
    </form>
  );
}
