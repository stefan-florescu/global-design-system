import { QrCode } from "@stefan-florescu/icons";
import { Button, ButtonGroup, buttonVariants, cn } from "@stefan-florescu/ui";

export default function ButtonGroupQrCode() {
  return (
    <ButtonGroup aria-label="Sign in">
      {/* A decorative QR mark, not an action. */}
      <span
        aria-hidden
        className={cn(
          buttonVariants({ variant: "tertiary", size: "sm", iconOnly: true }),
          "pointer-events-none",
        )}
      >
        <QrCode />
      </span>
      <Button variant="tertiary" size="sm">
        Sign In
      </Button>
    </ButtonGroup>
  );
}
