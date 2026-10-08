import { useId } from "react";

import { SendHorizontal } from "@stefan-florescu/icons";
import { Button, Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaChat() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="bg-muted flex w-full max-w-lg items-end gap-2 rounded-lg p-2">
      <Label htmlFor={`${id}-chat`} className="sr-only">
        Message
      </Label>
      <Textarea id={`${id}-chat`} rows={1} placeholder="Your message…" className="min-h-10" />
      <Button type="submit" iconOnly aria-label="Send message">
        <SendHorizontal aria-hidden />
      </Button>
    </form>
  );
}
