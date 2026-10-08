import { Mail } from "@stefan-florescu/icons";
import { Badge, Button } from "@stefan-florescu/ui";

export default function BadgeNotification() {
  return (
    <Button className="relative" aria-label="Messages, 20 unread">
      <Mail aria-hidden />
      Messages
      <Badge
        aria-hidden
        variant="destructive"
        pill
        iconOnly
        className="border-background bg-destructive text-destructive-foreground absolute -top-2 -right-2 border-2"
      >
        20
      </Badge>
    </Button>
  );
}
