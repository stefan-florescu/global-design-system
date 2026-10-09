"use client";

import { useId, useState } from "react";

import { ChevronDown } from "@stefan-florescu/icons";
import { Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerToggle() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[16rem]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-time-range`}
        onClick={() => setOpen((value) => !value)}
        className="text-fg-brand focus-visible:outline-ring mb-2 inline-flex cursor-pointer items-center rounded-xs p-0 text-base font-medium outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
      >
        Select time
        <ChevronDown aria-hidden className="ms-1.5 size-5" />
      </button>
      <div
        id={`${id}-time-range`}
        hidden={!open}
        className="mx-auto mb-2 grid max-w-[16rem] grid-cols-2 gap-4"
      >
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
          <Timepicker id={`${id}-end-time`} min="09:00" max="18:00" defaultValue="00:00" required />
        </div>
      </div>
    </div>
  );
}
