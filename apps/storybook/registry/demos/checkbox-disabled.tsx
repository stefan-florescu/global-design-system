import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxDisabled() {
  return (
    <div className="grid gap-3">
      <Checkbox label="Disabled checkbox" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  );
}
