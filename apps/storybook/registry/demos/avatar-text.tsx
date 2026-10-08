import { Avatar } from "@stefan-florescu/ui";

export default function AvatarText() {
  return (
    <div className="flex items-center gap-4">
      <Avatar src="/avatars/5.svg" alt="" />
      <div className="font-medium">
        <div className="text-foreground">Ioana Stan</div>
        <div className="text-muted-foreground text-sm">Joined in August 2024</div>
      </div>
    </div>
  );
}
