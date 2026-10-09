import { useId } from "react";

import { Radio } from "@stefan-florescu/ui";

export default function RadioDemo() {
  // A unique group name, so the example can appear more than once on a page.
  const name = useId();

  return (
    <div>
      <Radio name={name} label="Default radio" className="mb-4" />
      <Radio name={name} label="Checked state" defaultChecked />
    </div>
  );
}
