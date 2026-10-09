import { useId } from "react";

import { Clock } from "@stefan-florescu/icons";
import { Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerIcon() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-[8.5rem]">
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
        <span className="border-input bg-neutral-secondary-medium text-heading inline-flex items-center rounded-e-md border border-s-0 px-3 text-sm">
          <Clock aria-hidden className="text-body size-4" />
        </span>
      </div>
    </form>
  );
}
