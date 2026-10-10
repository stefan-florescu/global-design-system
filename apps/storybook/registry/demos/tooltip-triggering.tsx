import { Button, Tooltip } from "@stefan-florescu/ui";

export default function TooltipTriggering() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Tooltip content="Tooltip content" trigger="hover">
        <Button>Tooltip hover</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" trigger="click">
        <Button>Tooltip click</Button>
      </Tooltip>
    </div>
  );
}
