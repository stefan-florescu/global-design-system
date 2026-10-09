import { Toggle } from "@stefan-florescu/ui";

export default function ToggleDisabled() {
  return (
    <div className="flex flex-col flex-wrap items-center">
      <Toggle label="Disabled toggle" disabled className="mb-5" />
      <Toggle label="Disabled checked" disabled defaultChecked />
    </div>
  );
}
