import { Badge } from "@stefan-florescu/ui";

export default function BadgeDot() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" bordered dot>
        2 mins ago
      </Badge>
      <Badge variant="alternative" bordered dot>
        2 mins ago
      </Badge>
      <Badge variant="gray" bordered dot>
        2 mins ago
      </Badge>
      <Badge variant="danger" bordered dot>
        2 mins ago
      </Badge>
      <Badge variant="success" bordered dot>
        2 mins ago
      </Badge>
      <Badge variant="warning" bordered dot>
        2 mins ago
      </Badge>
    </div>
  );
}
