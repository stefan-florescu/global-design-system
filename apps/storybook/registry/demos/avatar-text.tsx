import { Avatar } from "@stefan-florescu/ui";

export default function AvatarText() {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar src="/avatars/1.svg" alt="" />
      <div className="text-heading font-medium">
        <div>Jese Leos</div>
        <div className="text-body text-sm font-normal">Joined in August 2014</div>
      </div>
    </div>
  );
}
