import { useId } from "react";

import { Radio } from "@stefan-florescu/ui";

const items = ["Driver License", "State ID", "US Military", "US Passport"];

export default function RadioList() {
  const id = useId();

  return (
    <div role="radiogroup" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`} data-toc-skip className="text-heading mb-4 font-semibold">
        Identification
      </h3>
      <ul className="rounded-base border-default bg-neutral-primary-soft w-48 border">
        {items.map((item) => (
          <li key={item} className="border-default w-full border-b">
            <Radio variant="list" name={`${id}-list`} value={item} label={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
