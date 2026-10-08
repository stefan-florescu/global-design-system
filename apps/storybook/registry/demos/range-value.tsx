"use client";

import { useState } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeValue() {
  const [brightness, setBrightness] = useState(70);

  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="brightness">Brightness</Label>
        <output htmlFor="brightness" className="text-sm font-medium tabular-nums">
          {brightness}%
        </output>
      </div>
      <Range
        id="brightness"
        value={brightness}
        aria-valuetext={`${brightness}%`}
        onChange={(event) => setBrightness(Number(event.target.value))}
      />
    </div>
  );
}
