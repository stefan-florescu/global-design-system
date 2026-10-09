import { Mail } from "@stefan-florescu/icons";
import { Button, Indicator } from "@stefan-florescu/ui";

export default function BadgeNotification() {
  return (
    <Button iconOnly className="size-auto p-3" aria-label="Notifications, 20 unread">
      <Mail aria-hidden />
      <Indicator
        aria-hidden
        variant="danger"
        bordered
        count={20}
        className="absolute -end-2 -top-2"
      />
    </Button>
  );
}
