import { Toggle } from "@stefan-florescu/ui";

export default function ToggleDisabled() {
  return (
    <div className="grid gap-4">
      <Toggle label="Disabled toggle" disabled />
      <Toggle label="Disabled checked toggle" disabled defaultChecked />
    </div>
  );
}
