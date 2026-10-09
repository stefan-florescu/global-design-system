import {
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
} from "@stefan-florescu/icons";
import { Button, ButtonGroup } from "@stefan-florescu/ui";

export default function ButtonGroupIcons() {
  return (
    <ButtonGroup aria-label="Text alignment">
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
  );
}
