import { HelperText, Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaValidation() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" invalid aria-describedby="bio-help" defaultValue="Hi" />
        <HelperText id="bio-help" variant="error">
          Tell us a bit more: at least 20 characters.
        </HelperText>
      </div>
    </div>
  );
}
