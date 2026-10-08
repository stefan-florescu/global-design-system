import { HelperText, Label, PhoneInput } from "@stefan-florescu/ui";

export default function PhoneInputValidation() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="phone-invalid">Phone number</Label>
        <PhoneInput
          id="phone-invalid"
          invalid
          defaultValue="12"
          aria-describedby="phone-invalid-help"
        />
        <HelperText id="phone-invalid-help" variant="error">
          Enter a full phone number.
        </HelperText>
      </div>
    </div>
  );
}
