import { Label, Range } from "@stefan-florescu/ui";

export default function RangeDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="volume">Volume</Label>
        <Range id="volume" defaultValue={50} />
      </div>
    </div>
  );
}
