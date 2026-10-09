import { Atom, Layers, Shield } from "@stefan-florescu/icons";
import { useId } from "react";

import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxAdvanced() {
  const id = useId();

  return (
    <div role="group" aria-labelledby={`${id}-heading`} className="w-full">
      <h3 id={`${id}-heading`} data-toc-skip className="text-heading mb-4 text-lg font-medium">
        Choose technology:
      </h3>
      <ul className="grid w-full gap-4 select-none md:grid-cols-3">
        <li>
          <Checkbox
            variant="card"
            value="react"
            icon={<Atom className="text-fg-brand" />}
            label="React Js"
            description="A JavaScript library for building user interfaces."
          />
        </li>
        <li>
          <Checkbox
            variant="card"
            value="vue"
            icon={<Layers className="text-fg-success" />}
            label="Vue Js"
            description="An model–view front end JavaScript framework."
          />
        </li>
        <li>
          <Checkbox
            variant="card"
            value="angular"
            icon={<Shield className="text-fg-danger" />}
            label="Angular"
            description="A TypeScript-based web application framework."
          />
        </li>
      </ul>
    </div>
  );
}
