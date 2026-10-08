import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputCurrency() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <NumberInput id="price" addon="$" min={0} step={0.01} placeholder="0.00" />
      </div>
    </div>
  );
}
