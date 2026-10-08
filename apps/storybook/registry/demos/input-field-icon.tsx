import { Mail, MapPin } from "@stefan-florescu/icons";
import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldIcon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="icon-email">Email address</Label>
        <Input id="icon-email" type="email" startIcon={<Mail />} placeholder="ana@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="icon-location">Location</Label>
        <Input id="icon-location" endIcon={<MapPin />} placeholder="Bucharest" />
      </div>
    </div>
  );
}
