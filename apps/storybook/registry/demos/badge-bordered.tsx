import { Badge } from "@stefan-florescu/ui";

export default function BadgeBordered() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" bordered>
        Brand
      </Badge>
      <Badge variant="alternative" bordered>
        Alternative
      </Badge>
      <Badge variant="gray" bordered>
        Gray
      </Badge>
      <Badge variant="danger" bordered>
        Danger
      </Badge>
      <Badge variant="success" bordered>
        Success
      </Badge>
      <Badge variant="warning" bordered>
        Warning
      </Badge>
    </div>
  );
}
