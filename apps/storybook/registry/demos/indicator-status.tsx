import { Avatar } from "@stefan-florescu/ui";

export default function IndicatorStatus() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Avatar src="/avatars/5.svg" alt="Bonnie Green" status="online" statusPosition="top-right" />
      <Avatar src="/avatars/5.svg" alt="Bonnie Green" status="busy" statusPosition="top-right" />
    </div>
  );
}
