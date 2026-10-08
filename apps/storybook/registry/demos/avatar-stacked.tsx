import { Avatar, AvatarGroup, AvatarGroupCounter } from "@stefan-florescu/ui";

export default function AvatarStacked() {
  return (
    <div className="flex flex-col items-center gap-6">
      <AvatarGroup>
        <Avatar src="/avatars/1.svg" alt="Ana Popescu" stacked />
        <Avatar src="/avatars/2.svg" alt="Mihai Ionescu" stacked />
        <Avatar src="/avatars/3.svg" alt="Elena Dumitru" stacked />
        <Avatar src="/avatars/4.svg" alt="Radu Marin" stacked />
      </AvatarGroup>
      <AvatarGroup>
        <Avatar src="/avatars/1.svg" alt="Ana Popescu" stacked />
        <Avatar src="/avatars/2.svg" alt="Mihai Ionescu" stacked />
        <Avatar src="/avatars/3.svg" alt="Elena Dumitru" stacked />
        <Avatar src="/avatars/4.svg" alt="Radu Marin" stacked />
        <AvatarGroupCounter href="/components/avatar" aria-label="99 more people">
          +99
        </AvatarGroupCounter>
      </AvatarGroup>
    </div>
  );
}
