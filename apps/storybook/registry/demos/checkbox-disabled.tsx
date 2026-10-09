import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxDisabled() {
  return (
    <div>
      <Checkbox label="Disabled checkbox" disabled className="mb-4" />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  );
}
