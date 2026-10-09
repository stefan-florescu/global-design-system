import { ButtonGroup, buttonVariants } from "@stefan-florescu/ui";

const link = buttonVariants({ variant: "tertiary", size: "sm" });

export default function ButtonGroupLinks() {
  return (
    <ButtonGroup aria-label="Account">
      <a href="/components/button-group" aria-current="page" className={link}>
        Profile
      </a>
      <a href="/components/button" className={link}>
        Settings
      </a>
      <a href="/components/badge" className={link}>
        Messages
      </a>
    </ButtonGroup>
  );
}
