import { Label, Range } from "@stefan-florescu/ui";

export default function RangeDisabled() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="range-disabled">Disabled</Label>
        <Range id="range-disabled" defaultValue={30} disabled />
      </div>
    </div>
  );
}
