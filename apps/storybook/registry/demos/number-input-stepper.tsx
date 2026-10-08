import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputStepper() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="guests">Guests</Label>
        <NumberInput id="guests" stepper defaultValue={2} min={1} max={10} />
      </div>
    </div>
  );
}
