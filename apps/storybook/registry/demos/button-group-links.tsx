import { ButtonGroup, buttonVariants } from "@stefan-florescu/ui";

export default function ButtonGroupLinks() {
  return (
    <ButtonGroup aria-label="Docs sections">
      <a href="/components/button" className={buttonVariants({ variant: "outline" })}>
        Button
      </a>
      <a href="/components/badge" className={buttonVariants({ variant: "outline" })}>
        Badge
      </a>
      <a href="/components/card" className={buttonVariants({ variant: "outline" })}>
        Card
      </a>
    </ButtonGroup>
  );
}
