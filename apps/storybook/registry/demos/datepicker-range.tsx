"use client";

import { useState } from "react";

import { Calendar, type DateRange } from "@stefan-florescu/ui";

export default function DatepickerRange() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const format = (date: Date | null) => (date ? date.toLocaleDateString() : "…");

  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar mode="range" value={range} onChange={setRange} />
      <p className="text-muted-foreground m-0 text-sm" aria-live="polite">
        {range.from ? `${format(range.from)} – ${format(range.to)}` : "Pick a start and end day"}
      </p>
    </div>
  );
}
