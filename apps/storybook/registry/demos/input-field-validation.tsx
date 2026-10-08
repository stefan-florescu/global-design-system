import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldValidation() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="valid-username">Username</Label>
        <Input
          id="valid-username"
          valid
          defaultValue="ana.popescu"
          aria-describedby="valid-username-help"
        />
        <HelperText id="valid-username-help" variant="success">
          Well done! That username is available.
        </HelperText>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="invalid-username">Username</Label>
        <Input
          id="invalid-username"
          invalid
          defaultValue="ana"
          aria-describedby="invalid-username-help"
        />
        <HelperText id="invalid-username-help" variant="error">
          Usernames need at least 6 characters.
        </HelperText>
      </div>
    </div>
  );
}
