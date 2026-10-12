import { Avatar } from "@stefan-florescu/ui";

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Avatar src="/design-system/avatars/1.svg" alt="Jese Leos" />
      <Avatar src="/design-system/avatars/1.svg" alt="Jese Leos" shape="square" />
    </div>
  );
}
