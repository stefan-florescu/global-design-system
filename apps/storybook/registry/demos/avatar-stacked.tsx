import { Avatar, AvatarGroup, AvatarGroupCounter } from "@stefan-florescu/ui";

export default function AvatarStacked() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <AvatarGroup>
        <Avatar src="/avatars/1.svg" alt="Jese Leos" stacked />
        <Avatar src="/avatars/2.svg" alt="Roberta Casas" stacked />
        <Avatar src="/avatars/3.svg" alt="Bonnie Green" stacked />
        <Avatar src="/avatars/4.svg" alt="Michael Gough" stacked />
      </AvatarGroup>
      <AvatarGroup>
        <Avatar src="/avatars/1.svg" alt="Jese Leos" stacked />
        <Avatar src="/avatars/2.svg" alt="Roberta Casas" stacked />
        <Avatar src="/avatars/3.svg" alt="Bonnie Green" stacked />
        <AvatarGroupCounter href="#" aria-label="99 more people">
          +99
        </AvatarGroupCounter>
      </AvatarGroup>
    </div>
  );
}
