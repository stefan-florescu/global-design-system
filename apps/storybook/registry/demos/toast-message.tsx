import { Reply } from "@stefan-florescu/icons";
import { Avatar, Button, Toast, ToastToggle } from "@stefan-florescu/ui";

export default function ToastMessage() {
  return (
    <Toast className="relative">
      <div className="flex">
        <Avatar src="/avatars/1.svg" size="sm" />
        <div className="ms-3 text-sm font-normal">
          <span className="text-heading text-base font-semibold">Jese Leos</span>
          <div className="mt-1 mb-3">
            Hi Neil, thanks for sharing your thoughts regarding Stefan DS.
          </div>
          <Button size="xs">
            <Reply aria-hidden className="-ms-0.5" />
            Reply
          </Button>
        </div>
        <ToastToggle className="absolute end-2 top-2" />
      </div>
    </Toast>
  );
}
