import { Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone number</Label>
        <PhoneInput id="phone" placeholder="123-456-7890" />
      </div>
    </div>
  );
}
