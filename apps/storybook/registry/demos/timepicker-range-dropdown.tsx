"use client";

import { useId } from "react";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  Label,
  Timepicker,
} from "@stefan-florescu/ui";

export default function TimepickerRangeDropdown() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <Dropdown>
      <DropdownTrigger>Choose time</DropdownTrigger>
      {/* A small form, so a dialog: focus moves to the start time when it opens. */}
      <DropdownContent
        role="dialog"
        aria-label="Time range"
        className="bg-neutral-primary-soft w-auto border-0 p-3 shadow-sm"
      >
        <div className="mx-auto mb-2 grid max-w-[16rem] grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${id}-start-time`} className="mb-2">
              Start time:
            </Label>
            <Timepicker
              id={`${id}-start-time`}
              min="09:00"
              max="18:00"
              defaultValue="00:00"
              required
            />
          </div>
          <div>
            <Label htmlFor={`${id}-end-time`} className="mb-2">
              End time:
            </Label>
            <Timepicker
              id={`${id}-end-time`}
              min="09:00"
              max="18:00"
              defaultValue="00:00"
              required
            />
          </div>
        </div>
        {/* Save your times here; choosing the item closes the dropdown and returns focus. */}
        <DropdownItem className="text-fg-brand hover:text-fg-brand focus-visible:text-fg-brand w-auto p-0 font-normal hover:bg-transparent hover:underline focus-visible:bg-transparent">
          Save time
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
