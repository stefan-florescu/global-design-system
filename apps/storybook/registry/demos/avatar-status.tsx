import { Avatar } from "@stefan-florescu/ui";

export default function AvatarStatus() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Avatar
        src="/design-system/avatars/1.svg"
        alt="Jese Leos"
        status="online"
        statusPosition="top-right"
      />
      <Avatar
        src="/design-system/avatars/1.svg"
        alt="Jese Leos"
        shape="square"
        status="busy"
        statusPosition="top-right"
      />
      <Avatar src="/design-system/avatars/1.svg" alt="Jese Leos" status="online" />
      <Avatar src="/design-system/avatars/1.svg" alt="Jese Leos" shape="square" status="online" />
    </div>
  );
}
