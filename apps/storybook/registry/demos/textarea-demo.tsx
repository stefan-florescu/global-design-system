import { useId } from "react";

import { Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-message`}>Your message</Label>
        <Textarea id={`${id}-message`} placeholder="Write your thoughts here…" />
      </div>
    </div>
  );
}
