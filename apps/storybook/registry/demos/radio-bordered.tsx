import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioBordered() {
  return (
    <Fieldset legend="Billing" className="w-full max-w-sm">
      <Radio name="billing" value="monthly" label="Monthly" bordered defaultChecked />
      <Radio name="billing" value="yearly" label="Yearly (save 20%)" bordered />
    </Fieldset>
  );
}
