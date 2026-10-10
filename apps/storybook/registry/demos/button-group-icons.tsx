import {
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
} from "@stefan-florescu/icons";
import { Button, ButtonGroup, Tooltip } from "@stefan-florescu/ui";

export default function ButtonGroupIcons() {
  return (
    <ButtonGroup aria-label="Text alignment">
      <Tooltip content="Align left" mode="label" className="leading-4">
        <Button variant="tertiary" size="sm" iconOnly>
          <TextAlignStart aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Align center" mode="label" className="leading-4">
        <Button variant="tertiary" size="sm" iconOnly>
          <TextAlignCenter aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Align justify" mode="label" className="leading-4">
        <Button variant="tertiary" size="sm" iconOnly>
          <TextAlignJustify aria-hidden />
        </Button>
      </Tooltip>
      <Tooltip content="Align right" mode="label" className="leading-4">
        <Button variant="tertiary" size="sm" iconOnly>
          <TextAlignEnd aria-hidden />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}
