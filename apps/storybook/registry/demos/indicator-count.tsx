import { Inbox } from "@stefan-florescu/icons";
import { Button, Indicator } from "@stefan-florescu/ui";

export default function IndicatorCount() {
  return (
    <Button>
      <Inbox aria-hidden className="-ms-0.5" />
      Messages
      <Indicator variant="danger" bordered count={8} label="8 unread" placement="top-end" />
    </Button>
  );
}
