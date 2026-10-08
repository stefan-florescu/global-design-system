import { Label, Range } from "@stefan-florescu/ui";

export default function RangeMinMax() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="budget">Budget</Label>
      <Range id="budget" min={100} max={1500} step={100} defaultValue={600} />
      <div aria-hidden className="text-muted-foreground flex justify-between text-xs">
        <span>$100</span>
        <span>$1,500</span>
      </div>
    </div>
  );
}
