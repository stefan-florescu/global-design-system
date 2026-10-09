import { CircleUser, Inbox, SlidersVertical } from "@stefan-florescu/icons";
import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupWithIcons() {
  return (
    <ButtonGroup aria-label="Account">
      <Button variant="tertiary" size="sm">
        <CircleUser aria-hidden />
        Profile
      </Button>
      <Button variant="tertiary" size="sm">
        <SlidersVertical aria-hidden />
        Settings
      </Button>
      <Button variant="tertiary" size="sm">
        <Inbox aria-hidden />
        Messages
      </Button>
    </ButtonGroup>
  );
}
