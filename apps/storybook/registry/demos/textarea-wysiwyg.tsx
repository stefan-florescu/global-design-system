import { useId } from "react";

import {
  Calendar,
  Download,
  FileCode,
  Image,
  ListOrdered,
  MapPin,
  Maximize,
  Paperclip,
  Settings,
  Smile,
} from "@stefan-florescu/icons";
import { Button, Label, Textarea, Tooltip } from "@stefan-florescu/ui";

// Toolbar buttons: 36px, `body` icon, `neutral-tertiary-medium` on hover.
const tool = "rounded-sm text-body hover:bg-neutral-tertiary-medium hover:text-heading";

export default function TextareaWysiwyg() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="w-full">
      {/* The editor's border shows the field's focus, since the textarea inside has none. */}
      <div className="border-input bg-neutral-secondary-medium has-[textarea:focus]:border-brand has-[textarea:focus]:ring-brand rounded-base mb-4 w-full border shadow-xs has-[textarea:focus]:ring-1">
        <div className="border-default-medium flex items-center justify-between border-b px-3 py-2">
          <div
            role="toolbar"
            aria-label="Formatting"
            className="divide-default-medium flex flex-wrap items-center sm:divide-x sm:rtl:divide-x-reverse"
          >
            <div className="flex items-center gap-1 sm:pe-4">
              <Button variant="ghost" size="sm" iconOnly aria-label="Attach file" className={tool}>
                <Paperclip aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Embed map" className={tool}>
                <MapPin aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Upload image" className={tool}>
                <Image aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Format code" className={tool}>
                <FileCode aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Add emoji" className={tool}>
                <Smile aria-hidden />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-1 sm:ps-4">
              <Button variant="ghost" size="sm" iconOnly aria-label="Add list" className={tool}>
                <ListOrdered aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Settings" className={tool}>
                <Settings aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Timeline" className={tool}>
                <Calendar aria-hidden />
              </Button>
              <Button variant="ghost" size="sm" iconOnly aria-label="Download" className={tool}>
                <Download aria-hidden />
              </Button>
            </div>
          </div>
          <Tooltip content="Show full screen" mode="label">
            <Button variant="ghost" size="sm" iconOnly className={`${tool} sm:ms-auto`}>
              <Maximize aria-hidden />
            </Button>
          </Tooltip>
        </div>
        <div className="bg-neutral-secondary-medium rounded-b-base px-4 py-2">
          <Label htmlFor={`${id}-editor`} className="sr-only">
            Publish post
          </Label>
          <Textarea
            id={`${id}-editor`}
            rows={8}
            placeholder="Write an article..."
            required
            className="rounded-none border-0 px-0 py-2 shadow-none focus:ring-0"
          />
        </div>
      </div>
      <Button type="submit">Publish post</Button>
    </form>
  );
}
