import { Label, Range } from "@stefan-florescu/ui";

export default function RangeSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="range-sm">Small</Label>
        <Range id="range-sm" size="sm" defaultValue={50} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="range-md">Medium</Label>
        <Range id="range-md" size="md" defaultValue={50} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="range-lg">Large</Label>
        <Range id="range-lg" size="lg" defaultValue={50} />
      </div>
    </div>
  );
}
