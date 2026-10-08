import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxBordered() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Checkbox label="Email notifications" bordered />
      <Checkbox label="Push notifications" bordered defaultChecked />
    </div>
  );
}
