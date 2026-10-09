import { useId } from "react";

import { GitBranch, Search } from "@stefan-florescu/icons";
import { Button, Label, SearchInput } from "@stefan-florescu/ui";

export default function SearchInputSimple() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="mx-auto flex w-full max-w-sm items-center gap-2">
      <Label htmlFor={`${id}-branch`} className="sr-only">
        Search
      </Label>
      <SearchInput
        id={`${id}-branch`}
        icon={<GitBranch />}
        placeholder="Search branch name..."
        required
      />
      <Button type="submit" iconOnly aria-label="Search">
        <Search aria-hidden />
      </Button>
    </form>
  );
}
