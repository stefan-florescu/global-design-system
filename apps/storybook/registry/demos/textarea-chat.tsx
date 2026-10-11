import { useId } from "react";

import { Image, Navigation2, Paperclip } from "@stefan-florescu/icons";
import { Button, Label, Textarea } from "@stefan-florescu/ui";

// Toolbar buttons: 36px, `body` icon, `neutral-tertiary-medium` on hover.
const tool = "rounded-sm text-body hover:bg-neutral-tertiary-medium hover:text-heading";

export default function TextareaChat() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full">
      <Label htmlFor={`${id}-chat`} className="sr-only">
        Your message
      </Label>
      <div className="bg-neutral-secondary-soft rounded-base flex items-center px-3 py-2">
        <Button variant="ghost" size="sm" iconOnly aria-label="Attach file" className={tool}>
          <Paperclip aria-hidden />
        </Button>
        <Button variant="ghost" size="sm" iconOnly aria-label="Upload image" className={tool}>
          <Image aria-hidden />
        </Button>
        <Textarea
          id={`${id}-chat`}
          rows={1}
          placeholder="Your message..."
          className="bg-neutral-primary-medium mx-4 px-3 py-2.5 shadow-none"
        />
        <Button
          type="submit"
          variant="ghost"
          iconOnly
          pill
          aria-label="Send message"
          className="text-fg-brand hover:bg-brand-softer [&_svg]:size-6"
        >
          <Navigation2 aria-hidden className="rotate-90 rtl:-rotate-90" />
        </Button>
      </div>
    </form>
  );
}
