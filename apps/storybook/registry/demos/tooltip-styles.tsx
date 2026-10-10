import { Button, Tooltip } from "@stefan-florescu/ui";

export default function TooltipStyles() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Tooltip content="Tooltip content" variant="light">
        <Button>Light tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" variant="dark">
        <Button>Dark tooltip</Button>
      </Tooltip>
    </div>
  );
}
