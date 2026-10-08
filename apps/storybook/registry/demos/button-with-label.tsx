import { Mail } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function ButtonWithLabel() {
  return (
    <Button aria-label="Messages, 2 unread">
      <Mail aria-hidden />
      Messages
      <span
        aria-hidden
        className="bg-brand-foreground text-brand inline-flex size-5 items-center justify-center rounded-full text-xs font-semibold"
      >
        2
      </span>
    </Button>
  );
}
