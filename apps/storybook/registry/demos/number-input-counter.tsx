import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputCounter() {
  return (
    <div className="grid justify-items-start gap-2">
      <Label htmlFor="counter">Choose quantity</Label>
      <div className="w-36">
        <NumberInput id="counter" stepper size="sm" defaultValue={1} min={1} max={99} />
      </div>
    </div>
  );
}
