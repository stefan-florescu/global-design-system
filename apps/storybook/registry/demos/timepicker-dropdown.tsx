"use client";

import { useId, useState } from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Label,
  Timepicker,
} from "@stefan-florescu/ui";

const durations = ["30 minutes", "1 hour", "2 hours"];

export default function TimepickerDropdown() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const [duration, setDuration] = useState<string>();

  return (
    <form className="mx-auto w-full max-w-[13rem]">
      <Label htmlFor={`${id}-time`} className="mb-2">
        Select time:
      </Label>
      <div className="flex">
        <Timepicker
          id={`${id}-time`}
          icon={null}
          min="09:00"
          max="18:00"
          defaultValue="00:00"
          required
          className="min-w-auto flex-1 rounded-none rounded-s-lg"
        />
        <input type="hidden" name="duration" value={duration ?? ""} />
        <Dropdown>
          {/* The chosen duration replaces the label; the hidden prefix keeps the button named. */}
          <DropdownTrigger
            variant="secondary"
            className="border-input shrink-0 rounded-s-none border-s-0"
          >
            {duration ? (
              <>
                <span className="sr-only">Duration: </span>
                {duration}
              </>
            ) : (
              "Duration"
            )}
          </DropdownTrigger>
          <DropdownMenu className="w-40">
            {durations.map((value) => (
              <DropdownItem key={value} onClick={() => setDuration(value)}>
                {value}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </form>
  );
}
