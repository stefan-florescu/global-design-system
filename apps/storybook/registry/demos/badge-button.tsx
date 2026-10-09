import { Button, Indicator } from "@stefan-florescu/ui";

export default function BadgeButton() {
  return (
    <Button aria-label="Messages, 2 unread">
      Messages
      <Indicator
        aria-hidden
        variant="danger"
        size="xs"
        count={2}
        className="ms-0.5 font-semibold"
      />
    </Button>
  );
}
