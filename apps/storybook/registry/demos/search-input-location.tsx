import { useId } from "react";

import { Search } from "@stefan-florescu/icons";
import {
  Button,
  Input,
  Label,
  Select,
  cn,
  fieldGroupClassName,
  fieldGroupItemClassName,
  fieldSelectAddonClassName,
} from "@stefan-florescu/ui";

export default function SearchInputLocation() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="mx-auto w-full max-w-lg">
      <div className={fieldGroupClassName}>
        <div className="shrink-0">
          <Label htmlFor={`${id}-country`} className="sr-only">
            Country
          </Label>
          <Select
            id={`${id}-country`}
            defaultValue="USA"
            className={cn(fieldSelectAddonClassName, "rounded-e-none")}
          >
            <option value="USA">USA</option>
            <option value="AU">Australia</option>
            <option value="UK">United Kingdom</option>
            <option value="FR">France</option>
            <option value="CA">Canada</option>
          </Select>
        </div>
        <Label htmlFor={`${id}-city`} className="sr-only">
          Choose city
        </Label>
        <Input
          id={`${id}-city`}
          type="search"
          placeholder="Search for city or address"
          required
          className={cn(fieldGroupItemClassName, "rounded-none")}
        />
        <Button type="submit" className="rounded-s-none">
          <Search aria-hidden />
          Search
        </Button>
      </div>
    </form>
  );
}
