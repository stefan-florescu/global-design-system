import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldAddon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="addon-username">Username</Label>
        <Input id="addon-username" addon="@" placeholder="ana.popescu" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="addon-website">Website</Label>
        <Input id="addon-website" addon="https://" placeholder="example.com" />
      </div>
    </div>
  );
}
