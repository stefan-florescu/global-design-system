import { Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputSizes() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="phone-sm">Small</Label>
        <PhoneInput id="phone-sm" size="sm" placeholder="123-456-7890" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone-md">Medium</Label>
        <PhoneInput id="phone-md" size="md" placeholder="123-456-7890" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone-lg">Large</Label>
        <PhoneInput id="phone-lg" size="lg" placeholder="123-456-7890" />
      </div>
    </div>
  );
}
