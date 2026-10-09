import { useId } from "react";

import { Label, Range } from "@stefan-florescu/ui";

export default function RangeLabels() {
  const id = useId();

  return (
    <div className="relative mb-6 w-full">
      <Label htmlFor={id} className="sr-only">
        Labels range
      </Label>
      <Range id={id} min={100} max={1500} defaultValue={1000} />
      <span aria-hidden className="text-body absolute start-0 -bottom-6 text-sm">
        Min ($100)
      </span>
      <span
        aria-hidden
        className="text-body absolute start-1/3 -bottom-6 -translate-x-1/2 text-sm rtl:translate-x-1/2"
      >
        $500
      </span>
      <span
        aria-hidden
        className="text-body absolute start-2/3 -bottom-6 -translate-x-1/2 text-sm rtl:translate-x-1/2"
      >
        $1000
      </span>
      <span aria-hidden className="text-body absolute end-0 -bottom-6 text-sm">
        Max ($1500)
      </span>
    </div>
  );
}
