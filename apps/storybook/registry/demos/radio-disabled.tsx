import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioDisabled() {
  return (
    <Fieldset legend="Delivery">
      <Radio name="delivery" value="standard" label="Standard" disabled />
      <Radio name="delivery" value="express" label="Express" disabled defaultChecked />
    </Fieldset>
  );
}
