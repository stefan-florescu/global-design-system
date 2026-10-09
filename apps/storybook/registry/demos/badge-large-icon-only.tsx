import { Clock } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

export default function BadgeLargeIconOnly() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" size="lg" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Brand: 2 mins ago</span>
      </Badge>
      <Badge variant="alternative" size="lg" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Alternative: 2 mins ago</span>
      </Badge>
      <Badge variant="gray" size="lg" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Gray: 2 mins ago</span>
      </Badge>
      <Badge variant="danger" size="lg" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Danger: 2 mins ago</span>
      </Badge>
      <Badge variant="success" size="lg" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Success: 2 mins ago</span>
      </Badge>
      <Badge variant="warning" size="lg" bordered iconOnly>
        <Clock aria-hidden />
        <span className="sr-only">Warning: 2 mins ago</span>
      </Badge>
    </div>
  );
}
