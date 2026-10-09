import { useId } from "react";

import { Radio } from "@stefan-florescu/ui";

export default function RadioDisabled() {
  const name = useId();

  return (
    <div>
      <Radio name={name} label="Disabled radio" disabled className="mb-4" />
      <Radio name={name} label="Disabled checked" disabled defaultChecked />
    </div>
  );
}
