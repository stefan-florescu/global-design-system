import { Search } from "@stefan-florescu/icons";
import type { ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Button } from "../button";
import { Input, type InputProps } from "../input";

import { searchInputButtonVariants, searchInputFieldVariants } from "./search-input.variants";

export type SearchInputProps = Omit<InputProps, "type" | "startIcon"> & {
  /** Decorative icon at the start of the field. Defaults to a magnifying glass. */
  icon?: ReactNode;
  /** Show a submit button inside the field with this text. Wrap the field in a `<form>`. */
  submitLabel?: string;
};

/**
 * A `type="search"` field with a search icon. Name it with a `Label` (visually hidden is fine)
 * and put it in a `<form role="search">`.
 */
export function SearchInput({
  icon = <Search />,
  submitLabel,
  size,
  className,
  ...props
}: SearchInputProps) {
  const input = (
    <Input
      type="search"
      size={size}
      startIcon={icon}
      className={cn(submitLabel && searchInputFieldVariants({ size }), className)}
      {...props}
    />
  );
  if (!submitLabel) return input;
  return (
    <div className="relative w-full">
      {input}
      <Button
        type="submit"
        size={size === "lg" || size === "xl" ? "sm" : "xs"}
        className={searchInputButtonVariants({ size })}
        disabled={props.disabled}
      >
        {submitLabel}
      </Button>
    </div>
  );
}
