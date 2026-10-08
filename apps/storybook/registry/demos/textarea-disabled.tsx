import { Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaDisabled() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" disabled placeholder="Notes are closed for this project." />
      </div>
    </div>
  );
}
