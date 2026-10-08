import { Paperclip } from "@stefan-florescu/icons";
import { Button, Label, Textarea } from "@stefan-florescu/ui";

export default function TextareaComment() {
  return (
    <form className="border-input has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-ring w-full max-w-lg overflow-hidden rounded-lg border has-[textarea:focus-visible]:ring-1">
      <Label htmlFor="comment" className="sr-only">
        Your comment
      </Label>
      <Textarea
        id="comment"
        placeholder="Write a comment…"
        required
        className="rounded-none border-0 focus-visible:ring-0"
      />
      <div className="border-input bg-muted flex items-center justify-between border-t px-3 py-2">
        <Button type="submit" size="sm">
          Post comment
        </Button>
        <Button type="button" variant="ghost" size="sm" iconOnly aria-label="Attach file">
          <Paperclip aria-hidden />
        </Button>
      </div>
    </form>
  );
}
