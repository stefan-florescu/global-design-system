import { Avatar } from "@stefan-florescu/ui";

export default function AvatarSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Avatar src="/avatars/1.svg" alt="Jese Leos" shape="square" size="2xs" />
      <Avatar src="/avatars/1.svg" alt="Jese Leos" shape="square" size="xs" />
      <Avatar src="/avatars/1.svg" alt="Jese Leos" shape="square" size="sm" />
      <Avatar src="/avatars/1.svg" alt="Jese Leos" shape="square" size="lg" />
      <Avatar src="/avatars/1.svg" alt="Jese Leos" shape="square" size="xl" />
      <Avatar src="/avatars/1.svg" alt="Jese Leos" shape="square" size="2xl" />
    </div>
  );
}
