import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupOutline() {
  return (
    <ButtonGroup aria-label="Account">
      <Button variant="primary" outline>
        Profile
      </Button>
      <Button variant="primary" outline>
        Settings
      </Button>
      <Button variant="primary" outline>
        Downloads
      </Button>
    </ButtonGroup>
  );
}
