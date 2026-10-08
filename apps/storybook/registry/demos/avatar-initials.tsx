import { Avatar } from "@stefan-florescu/ui";

export default function AvatarInitials() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar initials="AP" alt="Ana Popescu" />
      <Avatar initials="MI" alt="Mihai Ionescu" shape="square" />
    </div>
  );
}
