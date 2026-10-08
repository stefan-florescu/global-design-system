import { Search } from "@stefan-florescu/icons";

import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Input, type InputProps } from "../input";

import {
  searchInputButtonClassName,
  searchInputWithButtonClassName,
} from "./search-input.variants";

export type SearchInputProps = Omit<InputProps, "type" | "startIcon"> & {
  /** Show a submit button inside the field with this text. Wrap the field in a `<form>`. */
  submitLabel?: string;
};

/**
 * A `type="search"` field with a search icon. Name it with a `Label` (visually hidden is fine)
 * and put it in a `<form role="search">`.
 */
export function SearchInput({ submitLabel, size, className, ...props }: SearchInputProps) {
  const input = (
    <Input
      type="search"
      size={size}
      startIcon={<Search />}
      className={cn(submitLabel && searchInputWithButtonClassName, className)}
      {...props}
    />
  );
  if (!submitLabel) return input;
  return (
    <div className="relative w-full">
      {input}
      <Button
        type="submit"
        size={size === "lg" ? "sm" : "xs"}
        className={searchInputButtonClassName}
        disabled={props.disabled}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
