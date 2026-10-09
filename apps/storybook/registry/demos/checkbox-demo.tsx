import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxDemo() {
  return (
    <div>
      <Checkbox label="Default checkbox" className="mb-4" />
      <Checkbox label="Checked state" defaultChecked />
    </div>
  );
}
