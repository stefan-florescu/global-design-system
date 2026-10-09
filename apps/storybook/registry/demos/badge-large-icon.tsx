import { Clock } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

export default function BadgeLargeIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" size="lg" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="alternative" size="lg" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="gray" size="lg" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="danger" size="lg" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="success" size="lg" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
      <Badge variant="warning" size="lg" bordered>
        <Clock aria-hidden />2 mins ago
      </Badge>
    </div>
  );
}
