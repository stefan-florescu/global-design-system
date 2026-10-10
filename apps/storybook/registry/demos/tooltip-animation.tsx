import { Button, Tooltip } from "@stefan-florescu/ui";

export default function TooltipAnimation() {
  return (
    <Tooltip content="Tooltip content" animation="duration-1000">
      <Button>Animated tooltip</Button>
    </Tooltip>
  );
}
