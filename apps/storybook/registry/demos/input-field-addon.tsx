import { useId } from "react";

import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldAddon() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-addon-username`}>Username</Label>
        <Input id={`${id}-addon-username`} addon="@" placeholder="ana.popescu" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-addon-website`}>Website</Label>
        <Input id={`${id}-addon-website`} addon="https://" placeholder="example.com" />
      </div>
    </div>
  );
}
