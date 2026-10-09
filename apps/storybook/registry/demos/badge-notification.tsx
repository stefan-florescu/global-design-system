import { Mail } from "@stefan-florescu/icons";
import { Badge, Button } from "@stefan-florescu/ui";

export default function BadgeNotification() {
  return (
    <Button iconOnly className="relative size-auto p-3" aria-label="Notifications, 20 unread">
      <Mail aria-hidden />
      <Badge
        aria-hidden
        variant="danger"
        iconOnly
        size="lg"
        className="border-buffer bg-danger text-danger-foreground absolute -end-2 -top-2 border-2 font-bold"
      >
        20
      </Badge>
    </Button>
  );
}
