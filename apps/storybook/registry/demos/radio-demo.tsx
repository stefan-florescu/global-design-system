import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioDemo() {
  return (
    <Fieldset legend="Plan">
      <Radio name="plan" value="free" label="Free" defaultChecked />
      <Radio name="plan" value="pro" label="Pro" />
    </Fieldset>
  );
}
