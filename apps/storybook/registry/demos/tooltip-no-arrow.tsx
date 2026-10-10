import { Button, Tooltip } from "@stefan-florescu/ui";

export default function TooltipNoArrow() {
  return (
    <Tooltip content="Tooltip content" arrow={false}>
      <Button>Default tooltip</Button>
    </Tooltip>
  );
}
