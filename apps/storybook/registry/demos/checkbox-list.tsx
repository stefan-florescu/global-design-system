import { useId } from "react";

import { Checkbox } from "@stefan-florescu/ui";

const items = ["Vue JS", "React", "Angular", "Laravel"];

export default function CheckboxList() {
  const id = useId();

  return (
    <div role="group" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`} data-toc-skip className="text-heading mb-4 font-semibold">
        Technology
      </h3>
      <ul className="rounded-base border-default bg-neutral-primary-soft w-48 border">
        {items.map((item, index) => (
          <li
            key={item}
            className={index < items.length - 1 ? "border-default w-full border-b" : "w-full"}
          >
            <Checkbox variant="list" name="technology" value={item} label={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
