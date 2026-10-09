import { Avatar } from "@stefan-florescu/ui";

export default function AvatarStatus() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Avatar src="/avatars/1.svg" alt="Jese Leos" status="online" statusPosition="top-right" />
      <Avatar
        src="/avatars/1.svg"
        alt="Jese Leos"
        shape="square"
        status="busy"
        statusPosition="top-right"
      />
      <Avatar src="/avatars/1.svg" alt="Jese Leos" status="online" />
      <Avatar src="/avatars/1.svg" alt="Jese Leos" shape="square" status="online" />
    </div>
  );
}
