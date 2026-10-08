import { Download, Settings, User } from "@stefan-florescu/icons";
import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupIcons() {
  return (
    <ButtonGroup aria-label="Account">
      <Button variant="outline">
        <User aria-hidden />
        Profile
      </Button>
      <Button variant="outline">
        <Settings aria-hidden />
        Settings
      </Button>
      <Button variant="outline">
        <Download aria-hidden />
        Downloads
      </Button>
    </ButtonGroup>
  );
}
