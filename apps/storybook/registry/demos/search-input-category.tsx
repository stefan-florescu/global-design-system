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

export default function SearchInputCategory() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="mx-auto w-full max-w-2xl">
      <div className={fieldGroupClassName}>
        <div className="shrink-0">
          <Label htmlFor={`${id}-category`} className="sr-only">
            Category
          </Label>
          <Select id={`${id}-category`} className={cn(fieldSelectAddonClassName, "rounded-e-none")}>
            <option>All categories</option>
            <option>Shopping</option>
            <option>Images</option>
            <option>News</option>
            <option>Finance</option>
          </Select>
        </div>
        <Label htmlFor={`${id}-search`} className="sr-only">
          Search for products
        </Label>
        <Input
          id={`${id}-search`}
          type="search"
          placeholder="Search for products"
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
