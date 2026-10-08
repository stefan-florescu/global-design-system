import { FileInput, HelperText, Label } from "@stefan-florescu/ui";

export default function FileInputHelper() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="avatar">Profile picture</Label>
        <FileInput id="avatar" accept="image/*" aria-describedby="avatar-help" />
        <HelperText id="avatar-help">SVG, PNG, JPG or GIF (max. 800×400px).</HelperText>
      </div>
    </div>
  );
}
