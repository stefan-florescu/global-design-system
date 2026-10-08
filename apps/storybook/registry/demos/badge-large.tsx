import { Badge } from "@stefan-florescu/ui";

export default function BadgeLarge() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="brand" size="lg">
        Brand
      </Badge>
      <Badge variant="neutral" size="lg">
        Neutral
      </Badge>
      <Badge variant="info" size="lg">
        Info
      </Badge>
      <Badge variant="success" size="lg">
        Success
      </Badge>
      <Badge variant="warning" size="lg">
        Warning
      </Badge>
      <Badge variant="destructive" size="lg">
        Destructive
      </Badge>
    </div>
  );
}
