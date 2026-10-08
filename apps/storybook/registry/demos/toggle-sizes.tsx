import { Toggle } from "@stefan-florescu/ui";

export default function ToggleSizes() {
  return (
    <div className="grid gap-4">
      <Toggle size="sm" label="Small toggle" />
      <Toggle size="md" label="Default toggle" defaultChecked />
      <Toggle size="lg" label="Large toggle" />
    </div>
  );
}
