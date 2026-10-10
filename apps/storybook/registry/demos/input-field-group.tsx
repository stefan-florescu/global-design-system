import { useId } from "react";

import { CircleUser, Mail } from "@stefan-florescu/icons";
import { Input, Label } from "@stefan-florescu/ui";

export default function InputFieldGroup() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full space-y-6">
      <Label htmlFor={`${id}-email`}>Your Email</Label>
      <Input id={`${id}-email`} type="email" startIcon={<Mail />} placeholder="name@example.com" />
      <Label htmlFor={`${id}-username`}>Username</Label>
      <Input id={`${id}-username`} addon={<CircleUser aria-hidden />} placeholder="elonmusk" />
      <Label htmlFor={`${id}-website`}>Website</Label>
      <Input id={`${id}-website`} addon="https://" placeholder="example.com" />
    </div>
  );
}
