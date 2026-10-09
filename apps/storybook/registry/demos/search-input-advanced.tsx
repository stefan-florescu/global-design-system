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

export default function SearchInputAdvanced() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form role="search" className="mx-auto w-full max-w-2xl">
      <div className={fieldGroupClassName}>
        <div className="shrink-0">
          <Label htmlFor={`${id}-protocol`} className="sr-only">
            Protocol
          </Label>
          <Select
            id={`${id}-protocol`}
            defaultValue="both"
            className={cn(fieldSelectAddonClassName, "rounded-e-none")}
          >
            <option value="http">http</option>
            <option value="https">https</option>
            <option value="both">http + https</option>
          </Select>
        </div>
        <Label htmlFor={`${id}-domain`} className="sr-only">
          Search for domain or URL
        </Label>
        <Input
          id={`${id}-domain`}
          type="search"
          placeholder="Search for domain or URL"
          required
          className={cn(fieldGroupItemClassName, "rounded-none")}
        />
        <div className="shrink-0">
          <Label htmlFor={`${id}-scope`} className="sr-only">
            Domain level
          </Label>
          <Select id={`${id}-scope`} className={cn(fieldSelectAddonClassName, "rounded-none")}>
            <option>Subdomain</option>
            <option>Domain</option>
            <option>Top-Level Domain</option>
            <option>Root Domain</option>
          </Select>
        </div>
        <Button type="submit" className="rounded-s-none">
          <Search aria-hidden />
          Search
        </Button>
      </div>
    </form>
  );
}
