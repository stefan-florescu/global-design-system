import { useId } from "react";

import { Mic, Palette, Search } from "@stefan-florescu/icons";
import { Button, Label, SearchInput } from "@stefan-florescu/ui";

export default function SearchInputVoice() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="mx-auto flex w-full max-w-lg items-center gap-2">
      <Label htmlFor={`${id}-voice`} className="sr-only">
        Search
      </Label>
      <div className="relative w-full">
        <SearchInput
          id={`${id}-voice`}
          icon={<Palette />}
          placeholder="Search Mockups, Logos, Templates..."
          className="pe-10"
          required
        />
        <Button
          variant="ghost"
          size="xs"
          iconOnly
          aria-label="Search by voice"
          className="text-body hover:text-heading absolute end-1.5 top-1/2 size-7 -translate-y-1/2 hover:bg-transparent"
        >
          <Mic aria-hidden />
        </Button>
      </div>
      <Button type="submit">
        <Search aria-hidden />
        Search
      </Button>
    </form>
  );
}
