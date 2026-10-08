import { Avatar } from "@stefan-florescu/ui";

export default function AvatarSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar src="/avatars/1.svg" alt="Ana Popescu" size="xs" />
      <Avatar src="/avatars/1.svg" alt="Ana Popescu" size="sm" />
      <Avatar src="/avatars/1.svg" alt="Ana Popescu" size="md" />
      <Avatar src="/avatars/1.svg" alt="Ana Popescu" size="lg" />
      <Avatar src="/avatars/1.svg" alt="Ana Popescu" size="xl" />
    </div>
  );
}
