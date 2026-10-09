import { Checkbox } from "@stefan-florescu/ui";

export default function CheckboxInline() {
  return (
    <div className="flex">
      <Checkbox label="Inline 1" className="me-4" />
      <Checkbox label="Inline 2" className="me-4" />
      <Checkbox label="Inline checked" defaultChecked className="me-4" />
      <Checkbox label="Inline disabled" disabled />
    </div>
  );
}
