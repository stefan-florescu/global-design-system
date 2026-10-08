import { HelperText, Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputHelper() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="phone-helper">Phone number</Label>
        <PhoneInput
          id="phone-helper"
          defaultCountry="RO"
          placeholder="712 345 678"
          aria-describedby="phone-helper-help"
        />
        <HelperText id="phone-helper-help">We&apos;ll text you a verification code.</HelperText>
      </div>
    </div>
  );
}
