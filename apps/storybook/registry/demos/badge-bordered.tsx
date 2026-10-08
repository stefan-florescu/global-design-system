import { Badge } from "@stefan-florescu/ui";

export default function BadgeBordered() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="brand" bordered>
        Brand
      </Badge>
      <Badge variant="neutral" bordered>
        Neutral
      </Badge>
      <Badge variant="info" bordered>
        Info
      </Badge>
      <Badge variant="success" bordered>
        Success
      </Badge>
      <Badge variant="warning" bordered>
        Warning
      </Badge>
      <Badge variant="destructive" bordered>
        Destructive
      </Badge>
    </div>
  );
}
