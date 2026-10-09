import { Badge, Button } from "@stefan-florescu/ui";

export default function BadgeButton() {
  return (
    <Button aria-label="Messages, 2 unread">
      Messages
      <Badge
        aria-hidden
        variant="danger"
        iconOnly
        className="bg-danger text-danger-foreground ms-0.5 size-4 font-semibold"
      >
        2
      </Badge>
    </Button>
  );
}
