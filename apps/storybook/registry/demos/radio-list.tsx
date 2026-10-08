import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioList() {
  return (
    <Fieldset
      legend="Identification"
      className="w-full max-w-sm"
      contentClassName="gap-0 divide-y divide-border rounded-lg border border-border"
    >
      <Radio
        name="id-type"
        value="license"
        label="Driver license"
        className="px-4 py-3"
        defaultChecked
      />
      <Radio name="id-type" value="state" label="State ID" className="px-4 py-3" />
      <Radio name="id-type" value="military" label="Military ID" className="px-4 py-3" />
      <Radio name="id-type" value="passport" label="Passport" className="px-4 py-3" />
    </Fieldset>
  );
}
