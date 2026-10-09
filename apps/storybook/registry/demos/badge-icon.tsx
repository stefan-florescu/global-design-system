import { Clock } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

export default function BadgeIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="alternative" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="gray" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="danger" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="success" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="warning" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
    </div>
  );
}
