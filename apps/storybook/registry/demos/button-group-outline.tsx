import { CircleUser, Inbox, SlidersVertical } from "@stefan-florescu/icons";
import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupOutline() {
  return (
    <div className="flex flex-col items-center gap-8">
      <ButtonGroup outline aria-label="Account">
        <Button variant="tertiary" size="sm">
          Profile
        </Button>
        <Button variant="tertiary" size="sm">
          Settings
        </Button>
        <Button variant="tertiary" size="sm">
          Downloads
        </Button>
      </ButtonGroup>
      <ButtonGroup outline aria-label="Account with icons">
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
    </div>
  );
}
