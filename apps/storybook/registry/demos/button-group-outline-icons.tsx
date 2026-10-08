import { Download, Settings, User } from "@stefan-florescu/icons";
import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupOutlineIcons() {
  return (
    <ButtonGroup aria-label="Account">
      <Button variant="primary" outline>
        <User aria-hidden />
        Profile
      </Button>
      <Button variant="primary" outline>
        <Settings aria-hidden />
        Settings
      </Button>
      <Button variant="primary" outline>
        <Download aria-hidden />
        Downloads
      </Button>
    </ButtonGroup>
  );
}
