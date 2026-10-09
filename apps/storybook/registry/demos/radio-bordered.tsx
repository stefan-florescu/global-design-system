import { useId } from "react";

import { Radio } from "@stefan-florescu/ui";

export default function RadioBordered() {
  const name = useId();

  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <Radio variant="bordered" name={name} label="Default radio" />
      <Radio variant="bordered" name={name} label="Checked state" defaultChecked />
    </div>
  );
}
