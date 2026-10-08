import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function RadioCards() {
  return (
    <Fieldset
      legend="Job type"
      className="w-full max-w-xl"
      contentClassName="grid gap-3 sm:grid-cols-2"
    >
      <Radio
        name="job"
        value="frontend"
        label="Front-end developer"
        description="React, Tailwind CSS and accessibility."
        bordered
        defaultChecked
      />
      <Radio
        name="job"
        value="designer"
        label="Product designer"
        description="Design systems, research and prototyping."
        bordered
      />
    </Fieldset>
  );
}
