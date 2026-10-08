import { useId } from "react";

import { Mail, MapPin } from "@stefan-florescu/icons";
import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldIcon() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-icon-email`}>Email address</Label>
        <Input
          id={`${id}-icon-email`}
          type="email"
          startIcon={<Mail />}
          placeholder="ana@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-icon-location`}>Location</Label>
        <Input id={`${id}-icon-location`} endIcon={<MapPin />} placeholder="Bucharest" />
      </div>
    </div>
  );
}
