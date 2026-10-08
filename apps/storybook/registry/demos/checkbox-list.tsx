import { Checkbox, Fieldset } from "@stefan-florescu/ui";

export default function CheckboxList() {
  return (
    <Fieldset
      legend="Technology"
      className="w-full max-w-sm"
      contentClassName="gap-0 divide-y divide-border rounded-lg border border-border"
    >
      <Checkbox name="tech" value="svelte" label="Svelte" className="px-4 py-3" />
      <Checkbox name="tech" value="react" label="React" className="px-4 py-3" />
      <Checkbox name="tech" value="vue-js" label="Vue JS" className="px-4 py-3" />
      <Checkbox name="tech" value="angular" label="Angular" className="px-4 py-3" />
    </Fieldset>
  );
}
