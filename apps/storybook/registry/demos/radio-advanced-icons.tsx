import { useId } from "react";

import { Atom, Layers, Shield } from "@stefan-florescu/icons";
import { Radio } from "@stefan-florescu/ui";

export default function RadioAdvancedIcons() {
  const id = useId();
  const name = `${id}-technologies`;

  return (
    <div role="radiogroup" aria-labelledby={`${id}-heading`} className="w-full">
      <h3 id={`${id}-heading`} data-toc-skip className="text-heading mb-4 text-lg font-medium">
        Choose technology:
      </h3>
      <ul className="grid w-full gap-4 select-none md:grid-cols-3">
        <li>
          <Radio
            variant="card"
            name={name}
            value="react-option"
            icon={<Atom className="text-fg-brand" />}
            label="React Js"
            description="A JavaScript library for building user interfaces."
            defaultChecked
          />
        </li>
        <li>
          <Radio
            variant="card"
            name={name}
            value="vue-option"
            icon={<Layers className="text-fg-success" />}
            label="Vue Js"
            description="An model–view front end JavaScript framework."
          />
        </li>
        <li>
          <Radio
            variant="card"
            name={name}
            value="angular-option"
            icon={<Shield className="text-fg-danger" />}
            label="Angular"
            description="A TypeScript-based web application framework."
          />
        </li>
      </ul>
    </div>
  );
}
