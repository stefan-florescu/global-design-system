import { Badge } from "@stefan-florescu/ui";

export default function BadgePillBordered() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" pill bordered>
        Brand
      </Badge>
      <Badge variant="alternative" pill bordered>
        Alternative
      </Badge>
      <Badge variant="gray" pill bordered>
        Gray
      </Badge>
      <Badge variant="danger" pill bordered>
        Danger
      </Badge>
      <Badge variant="success" pill bordered>
        Success
      </Badge>
      <Badge variant="warning" pill bordered>
        Warning
      </Badge>
    </div>
  );
}
