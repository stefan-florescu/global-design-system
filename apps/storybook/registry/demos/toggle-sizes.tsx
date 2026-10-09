import { Toggle } from "@stefan-florescu/ui";

export default function ToggleSizes() {
  return (
    <div className="flex flex-col flex-wrap items-center">
      <Toggle size="md" label="Base toggle" className="mb-5" />
      <Toggle size="lg" label="Large toggle" className="mb-5" />
    </div>
  );
}
