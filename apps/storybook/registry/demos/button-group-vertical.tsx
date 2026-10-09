import {
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
} from "@stefan-florescu/icons";
import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupVertical() {
  return (
    <div className="flex items-start justify-center gap-4">
      <ButtonGroup orientation="vertical" aria-label="Account" className="w-56">
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
      <ButtonGroup orientation="vertical" aria-label="Text alignment">
        <Button variant="tertiary" size="sm" iconOnly aria-label="Align left">
          <TextAlignStart aria-hidden />
        </Button>
        <Button variant="tertiary" size="sm" iconOnly aria-label="Align center">
          <TextAlignCenter aria-hidden />
        </Button>
        <Button variant="tertiary" size="sm" iconOnly aria-label="Align justify">
          <TextAlignJustify aria-hidden />
        </Button>
        <Button variant="tertiary" size="sm" iconOnly aria-label="Align right">
          <TextAlignEnd aria-hidden />
        </Button>
      </ButtonGroup>
    </div>
  );
}
