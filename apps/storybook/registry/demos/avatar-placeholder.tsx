import { Avatar } from "@stefan-florescu/ui";

export default function AvatarPlaceholder() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar alt="Unknown user" />
      <Avatar alt="Unknown user" shape="square" />
    </div>
  );
}
