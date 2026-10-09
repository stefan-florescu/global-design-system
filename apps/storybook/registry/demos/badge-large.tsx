import { Badge } from "@stefan-florescu/ui";

export default function BadgeLarge() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" size="lg">
        Brand
      </Badge>
      <Badge variant="alternative" size="lg">
        Alternative
      </Badge>
      <Badge variant="gray" size="lg">
        Gray
      </Badge>
      <Badge variant="danger" size="lg">
        Danger
      </Badge>
      <Badge variant="success" size="lg">
        Success
      </Badge>
      <Badge variant="warning" size="lg">
        Warning
      </Badge>
    </div>
  );
}
