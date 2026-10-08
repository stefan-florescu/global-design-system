import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxDemo() {
  return (
    <div className="grid gap-3">
      <Checkbox label="Default checkbox" />
      <Checkbox label="Checked state" defaultChecked />
    </div>
  );
}
