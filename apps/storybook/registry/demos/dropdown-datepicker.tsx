"use client";

import { ChevronDown } from "@stefan-florescu/icons";
import {
  DateRangePicker,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  formatDate,
  type DateRange,
} from "@stefan-florescu/ui";
import { useState } from "react";

export default function DropdownDatepicker() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(2026, 10, 1),
    to: new Date(2026, 11, 31),
  });
  const show = (date: Date | null) => (date ? formatDate(date, "d M", "en-GB") : "…");

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          className="text-fg-brand focus-visible:outline-ring inline-flex cursor-pointer items-center rounded-xs font-medium outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          {show(range.from)} - {show(range.to)}
          <ChevronDown aria-hidden className="ms-1.5 size-4" />
        </button>
      </DropdownTrigger>
      <DropdownContent
        role="dialog"
        aria-label="Date range"
        className="border-default bg-neutral-primary-soft w-96 p-3 font-normal shadow-sm"
      >
        <DateRangePicker value={range} onChange={setRange} />
      </DropdownContent>
    </Dropdown>
  );
}
