import { Bell, Trash2 } from "@stefan-florescu/icons";
import { Button, Tooltip } from "@stefan-florescu/ui";

export default function TooltipIconButton() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* The tooltip is the button's name: screen readers say "Notifications, button". */}
      <Tooltip content="Notifications" mode="label">
        <Button variant="secondary" iconOnly>
          <Bell aria-hidden />
        </Button>
      </Tooltip>
      {/* The button has its own name; the tooltip adds a description after it. */}
      <Tooltip content="Moves the file to the bin for 30 days">
        <Button variant="danger">
          <Trash2 aria-hidden />
          Delete
        </Button>
      </Tooltip>
    </div>
  );
}
