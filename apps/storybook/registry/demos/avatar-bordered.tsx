import { Avatar } from "@stefan-florescu/ui";

export default function AvatarBordered() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar src="/avatars/3.svg" alt="Elena Dumitru" bordered />
      <Avatar src="/avatars/4.svg" alt="Radu Marin" shape="square" bordered />
    </div>
  );
}
