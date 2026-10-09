import { useId } from "react";

import { Radio } from "@stefan-florescu/ui";

export default function RadioInline() {
  const name = useId();

  return (
    <div className="flex">
      <Radio name={name} label="Inline 1" className="me-4" />
      <Radio name={name} label="Inline 2" className="me-4" />
      <Radio name={name} label="Inline checked" defaultChecked className="me-4" />
      <Radio name={name} label="Inline disabled" disabled />
    </div>
  );
}
