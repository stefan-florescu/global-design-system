import { useId } from "react";

import { Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaDemo() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <Label htmlFor={`${id}-message`}>Your message</Label>
      <Textarea id={`${id}-message`} rows={4} placeholder="Write your thoughts here..." />
    </div>
  );
}
