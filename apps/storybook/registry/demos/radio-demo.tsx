import { useId } from "react";

import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioDemo() {
  // A unique group name, so the example can appear more than once on a page.
  const name = useId();

  return (
    <Fieldset legend="Plan">
      <Radio name={name} value="free" label="Free" defaultChecked />
      <Radio name={name} value="pro" label="Pro" />
    </Fieldset>
  );
}
