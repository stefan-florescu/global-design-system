import { useId } from "react";

import { Checkbox } from "@stefan-florescu/ui";

const items = ["Vue JS", "React", "Angular", "Laravel"];

export default function CheckboxListHorizontal() {
  const id = useId();

  return (
    <div role="group" aria-labelledby={`${id}-heading`} className="w-full">
      <h3 id={`${id}-heading`} data-toc-skip className="text-heading mb-4 font-semibold">
        Identification
      </h3>
      <ul className="rounded-base border-default bg-neutral-primary-soft w-full items-center border sm:flex">
        {items.map((item, index) => (
          <li
            key={item}
            className={
              index < items.length - 1
                ? "border-default w-full border-b sm:border-r sm:border-b-0"
                : "w-full"
            }
          >
            <Checkbox variant="list" name="identification" value={item} label={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
