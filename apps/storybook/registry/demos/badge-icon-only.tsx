import { Clock } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

export default function BadgeIconOnly() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Brand: 2 mins ago</span>
      </Badge>
      <Badge variant="alternative" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Alternative: 2 mins ago</span>
      </Badge>
      <Badge variant="gray" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Gray: 2 mins ago</span>
      </Badge>
      <Badge variant="danger" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Danger: 2 mins ago</span>
      </Badge>
      <Badge variant="success" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Success: 2 mins ago</span>
      </Badge>
      <Badge variant="warning" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Warning: 2 mins ago</span>
      </Badge>
    </div>
  );
}
