import { Button } from "@stefan-florescu/ui";

export default function ButtonWithLabel() {
  return (
    <Button aria-label="Messages, 2 unread">
      Messages
      <span
        aria-hidden
        className="bg-brand-soft text-fg-brand-strong dark:text-fg-brand-subtle ms-0.5 inline-flex size-4.5 items-center justify-center rounded-full text-xs font-medium"
      >
        2
      </span>
    </Button>
  );
}
