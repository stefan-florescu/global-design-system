import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldDisabled() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="disabled-input">Disabled</Label>
        <Input id="disabled-input" disabled placeholder="You can't type here" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="readonly-input">Read-only</Label>
        <Input id="readonly-input" readOnly defaultValue="ana@example.com" />
      </div>
    </div>
  );
}
