import { Clock } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

export default function BadgeIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral">
        <Clock aria-hidden />3 days ago
      </Badge>
      <Badge variant="brand" size="lg">
        <Clock aria-hidden />2 minutes ago
      </Badge>
    </div>
  );
}
