import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxBordered() {
  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <Checkbox variant="bordered" name="bordered-checkbox" label="Default checkbox" />
      <Checkbox variant="bordered" name="bordered-checkbox" label="Checked state" defaultChecked />
    </div>
  );
}
