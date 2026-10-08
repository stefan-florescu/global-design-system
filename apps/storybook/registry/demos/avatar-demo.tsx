import { Avatar } from "@stefan-florescu/ui";

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar src="/avatars/1.svg" alt="Ana Popescu" />
      <Avatar src="/avatars/2.svg" alt="Mihai Ionescu" shape="square" />
    </div>
  );
}
