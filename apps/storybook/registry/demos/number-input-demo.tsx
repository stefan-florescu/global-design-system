import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="quantity">Quantity</Label>
        <NumberInput id="quantity" min={0} placeholder="0" />
      </div>
    </div>
  );
}
