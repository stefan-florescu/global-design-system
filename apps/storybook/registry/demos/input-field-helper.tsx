import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldHelper() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="helper-email">Email address</Label>
        <Input
          id="helper-email"
          type="email"
          aria-describedby="helper-email-help"
          placeholder="ana@example.com"
        />
        <HelperText id="helper-email-help">
          We&apos;ll never share your email with anyone else.
        </HelperText>
      </div>
    </div>
  );
}
