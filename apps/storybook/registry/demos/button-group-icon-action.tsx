import { Bookmark } from "@stefan-florescu/icons";
import { Button, ButtonGroup, buttonVariants, cn } from "@stefan-florescu/ui";

export default function ButtonGroupIconAction() {
  return (
    <ButtonGroup aria-label="Save book">
      {/* The label is text, not a second action: only the icon button is focusable. */}
      <span
        aria-hidden
        className={cn(buttonVariants({ variant: "tertiary", size: "sm" }), "pointer-events-none")}
      >
        Save book
      </span>
      <Button variant="tertiary" size="sm" iconOnly aria-label="Save book">
        <Bookmark aria-hidden />
      </Button>
    </ButtonGroup>
  );
}
