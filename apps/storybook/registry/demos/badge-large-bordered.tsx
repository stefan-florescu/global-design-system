import { Badge } from "@stefan-florescu/ui";

export default function BadgeLargeBordered() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" size="lg" bordered>
        Brand
      </Badge>
      <Badge variant="alternative" size="lg" bordered>
        Alternative
      </Badge>
      <Badge variant="gray" size="lg" bordered>
        Gray
      </Badge>
      <Badge variant="danger" size="lg" bordered>
        Danger
      </Badge>
      <Badge variant="success" size="lg" bordered>
        Success
      </Badge>
      <Badge variant="warning" size="lg" bordered>
        Warning
      </Badge>
    </div>
  );
}
