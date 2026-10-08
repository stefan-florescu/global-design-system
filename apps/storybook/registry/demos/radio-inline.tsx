import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioInline() {
  return (
    <Fieldset legend="Size" orientation="horizontal">
      <Radio name="size" value="s" label="S" />
      <Radio name="size" value="m" label="M" defaultChecked />
      <Radio name="size" value="l" label="L" />
      <Radio name="size" value="xl" label="XL" />
    </Fieldset>
  );
}
