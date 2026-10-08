import { Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea id="message" placeholder="Write your thoughts here…" />
      </div>
    </div>
  );
}
