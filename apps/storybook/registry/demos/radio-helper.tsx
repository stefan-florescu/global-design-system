import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioHelper() {
  return (
    <Fieldset legend="Shipping">
      <Radio
        name="shipping"
        value="free"
        label="Free shipping"
        description="Arrives in 5–7 business days."
        defaultChecked
      />
      <Radio
        name="shipping"
        value="express"
        label="Express"
        description="Arrives tomorrow, $9.99."
      />
    </Fieldset>
  );
}
