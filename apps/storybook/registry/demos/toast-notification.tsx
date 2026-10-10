import { Reply } from "@stefan-florescu/icons";
import { Avatar, Button, Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastNotification() {
  return (
    <Toast className="block space-y-4 p-3">
      <div className="bg-neutral-tertiary flex items-center rounded px-2.5 py-2">
        <span className="text-heading text-sm font-medium">New notification</span>
      </div>
      <div className="flex">
        <Avatar src="/avatars/3.svg" size="sm" />
        <div className="text-body ms-3 text-sm font-normal">
          <div className="text-heading text-base font-medium">Bonnie Green</div>
          <div>commented on your photo</div>
          <span className="text-fg-brand text-xs">a few seconds ago</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ToastToggle asChild>
          <Button variant="secondary" size="xs" fullWidth>
            Close
          </Button>
        </ToastToggle>
        <Button size="xs" fullWidth>
          <Reply aria-hidden className="-ms-0.5" />
          Reply
        </Button>
      </div>
    </Toast>
  );
}
