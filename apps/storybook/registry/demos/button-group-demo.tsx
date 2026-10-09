import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="Account">
      <Button variant="tertiary" size="sm">
        Profile
      </Button>
      <Button variant="tertiary" size="sm">
        Settings
      </Button>
      <Button variant="tertiary" size="sm">
        Messages
      </Button>
    </ButtonGroup>
  );
}
