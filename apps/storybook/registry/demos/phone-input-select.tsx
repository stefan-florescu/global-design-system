"use client";

import { useId, useState } from "react";

import {
  Clipboard,
  HelperText,
  Label,
  Select,
  cn,
  fieldGroupClassName,
  fieldGroupItemClassName,
} from "@stefan-florescu/ui";

const numbers = ["+1 234 456 7890", "+1 456 234 7890", "+1 432 621 3163"];

export default function PhoneInputSelect() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const [number, setNumber] = useState(numbers[0] ?? "");

  return (
    <form className="mx-auto w-full max-w-sm">
      <div className="mb-2.5 flex items-center justify-between">
        <Label htmlFor={`${id}-numbers`} className="mb-0">
          Primary phone number:
        </Label>
        <a href="#numbers" className="text-fg-brand text-xs font-medium hover:underline">
          Manage numbers
        </a>
      </div>
      <div className={cn(fieldGroupClassName, "items-stretch")}>
        <Select
          id={`${id}-numbers`}
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          aria-describedby={`${id}-numbers-help`}
          className={cn(fieldGroupItemClassName, "rounded-e-none")}
        >
          {numbers.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Clipboard
          value={number}
          label="Copy number"
          iconOnly
          variant="secondary"
          className="border-input h-auto w-auto shrink-0 rounded-s-none px-4 shadow-none [&_svg]:size-4"
        />
      </div>
      <HelperText id={`${id}-numbers-help`}>Please set your primary phone number.</HelperText>
    </form>
  );
}
