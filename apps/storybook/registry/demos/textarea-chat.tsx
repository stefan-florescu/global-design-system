import { SendHorizontal } from "@stefan-florescu/icons";
import { Button, Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaChat() {
  return (
    <form className="bg-muted flex w-full max-w-lg items-end gap-2 rounded-lg p-2">
      <Label htmlFor="chat" className="sr-only">
        Message
      </Label>
      <Textarea id="chat" rows={1} placeholder="Your message…" className="min-h-10" />
      <Button type="submit" iconOnly aria-label="Send message">
        <SendHorizontal aria-hidden />
      </Button>
    </form>
  );
}
