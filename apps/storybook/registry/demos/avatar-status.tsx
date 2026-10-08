import { Avatar } from "@stefan-florescu/ui";

export default function AvatarStatus() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar src="/avatars/1.svg" alt="Ana Popescu" status="online" statusPosition="top-right" />
      <Avatar src="/avatars/2.svg" alt="Mihai Ionescu" status="busy" />
      <Avatar src="/avatars/3.svg" alt="Elena Dumitru" shape="square" status="away" />
      <Avatar src="/avatars/4.svg" alt="Radu Marin" shape="square" status="offline" />
    </div>
  );
}
