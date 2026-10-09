import { useId } from "react";

import { Radio } from "@stefan-florescu/ui";

const items = ["Driver License", "State ID", "US Military", "US Passport"];

export default function RadioListHorizontal() {
  const id = useId();

  return (
    <div role="radiogroup" aria-labelledby={`${id}-heading`} className="w-full">
      <h3 id={`${id}-heading`} data-toc-skip className="text-heading mb-4 font-semibold">
        Identification
      </h3>
      <ul className="border-default bg-neutral-primary-soft text-heading w-full items-center rounded-lg border text-sm font-medium sm:flex">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              index < items.length - 1
                ? "border-default w-full border-b sm:border-r sm:border-b-0"
                : "w-full"
            }
          >
            <Radio variant="list" name={`${id}-list`} value={item} label={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
