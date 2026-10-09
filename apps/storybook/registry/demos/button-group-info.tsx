import { Download } from "@stefan-florescu/icons";
import { Button, ButtonGroup, buttonVariants, cn } from "@stefan-florescu/ui";

export default function ButtonGroupInfo() {
  return (
    <ButtonGroup aria-label="Download">
      <Button variant="tertiary" size="sm" aria-label="Download, 456k downloads">
        <Download aria-hidden />
        Download
      </Button>
      {/* A count, not an action: styled like a button, but not focusable. */}
      <span
        aria-hidden
        className={cn(buttonVariants({ variant: "tertiary", size: "sm" }), "pointer-events-none")}
      >
        456k
      </span>
    </ButtonGroup>
  );
}
