import { useId } from "react";

import { Mail } from "@stefan-florescu/icons";
import { HelperText, Input, Label } from "@stefan-florescu/ui";

export default function InputFieldHelper() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={`${id}-email`}>Your Email</Label>
      <Input
        id={`${id}-email`}
        type="email"
        startIcon={<Mail />}
        placeholder="name@flowbite.com"
        aria-describedby={`${id}-email-help`}
      />
      <HelperText id={`${id}-email-help`}>
        We’ll never share your details. Read our{" "}
        <a href="#privacy" className="text-fg-brand font-medium hover:underline">
          Privacy Policy
        </a>
        .
      </HelperText>
    </div>
  );
}
