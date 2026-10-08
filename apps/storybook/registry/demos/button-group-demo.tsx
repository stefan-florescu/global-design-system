import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="Account">
      <Button variant="outline">Profile</Button>
      <Button variant="outline">Settings</Button>
      <Button variant="outline">Downloads</Button>
    </ButtonGroup>
  );
}
