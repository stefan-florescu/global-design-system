"use client";

import { useId, useState } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeValue() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  const [brightness, setBrightness] = useState(70);

  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={`${id}-brightness`}>Brightness</Label>
        <output htmlFor={`${id}-brightness`} className="text-sm font-medium tabular-nums">
          {brightness}%
        </output>
      </div>
      <Range
        id={`${id}-brightness`}
        value={brightness}
        aria-valuetext={`${brightness}%`}
        onChange={(event) => setBrightness(Number(event.target.value))}
      />
    </div>
  );
}
