import { Badge } from "@stefan-florescu/ui";

export default function BadgeLink() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" bordered href="#">
        Brand
      </Badge>
      <Badge variant="alternative" bordered href="#">
        Alternative
      </Badge>
      <Badge variant="gray" bordered href="#">
        Gray
      </Badge>
      <Badge variant="danger" bordered href="#">
        Danger
      </Badge>
      <Badge variant="success" bordered href="#">
        Success
      </Badge>
      <Badge variant="warning" bordered href="#">
        Warning
      </Badge>
    </div>
  );
}
