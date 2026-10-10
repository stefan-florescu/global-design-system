import { useId } from "react";

import { Image, MapPin, Paperclip, Smile } from "@stefan-florescu/icons";
import { Button, Label, Textarea } from "@stefan-florescu/ui";

// Toolbar buttons: 36px, `body` icon, `neutral-tertiary-medium` on hover.
const tool = "rounded-sm text-body hover:bg-neutral-tertiary-medium hover:text-heading";

export default function TextareaComment() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <div className="w-full">
      <form>
        {/* The box's border shows the field's focus, since the textarea inside has none. */}
        <div className="border-input bg-neutral-secondary-medium has-[textarea:focus]:border-brand has-[textarea:focus]:ring-brand rounded-base mb-4 w-full border shadow-xs has-[textarea:focus]:ring-1">
          <div className="bg-neutral-secondary-medium rounded-t-base px-4 py-2">
            <Label htmlFor={`${id}-comment`} className="sr-only">
              Your comment
            </Label>
            <Textarea
              id={`${id}-comment`}
              rows={4}
              placeholder="Write a comment..."
              required
              className="rounded-none border-0 px-0 py-2 shadow-none focus:ring-0"
            />
          </div>
          <div className="border-default-medium flex items-center border-t px-3 py-2">
            <Button type="submit" size="sm">
              Post comment
            </Button>
            <div className="flex gap-1 ps-0 sm:ps-2">
              <Button variant="ghost" size="sm" iconOnly aria-label="Add emoji" className={tool}>
                <Smile aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Attach file" className={tool}>
                <Paperclip aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Embed map" className={tool}>
                <MapPin aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Upload image" className={tool}>
                <Image aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </form>
      <p className="text-body ms-auto text-xs">
        Remember, contributions to this topic should follow our{" "}
        <a href="/" className="text-fg-brand hover:underline">
          Community Guidelines
        </a>
        .
      </p>
    </div>
  );
}
