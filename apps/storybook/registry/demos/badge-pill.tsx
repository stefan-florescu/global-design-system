import { Badge } from "@stefan-florescu/ui";

export default function BadgePill() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" pill>
        Brand
      </Badge>
      <Badge variant="alternative" pill>
        Alternative
      </Badge>
      <Badge variant="gray" pill>
        Gray
      </Badge>
      <Badge variant="danger" pill>
        Danger
      </Badge>
      <Badge variant="success" pill>
        Success
      </Badge>
      <Badge variant="warning" pill>
        Warning
      </Badge>
    </div>
  );
}
