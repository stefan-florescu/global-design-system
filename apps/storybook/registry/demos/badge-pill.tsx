import { Badge } from "@stefan-florescu/ui";

export default function BadgePill() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="brand" pill>
        Brand
      </Badge>
      <Badge variant="neutral" pill>
        Neutral
      </Badge>
      <Badge variant="info" pill>
        Info
      </Badge>
      <Badge variant="success" pill>
        Success
      </Badge>
      <Badge variant="warning" pill>
        Warning
      </Badge>
      <Badge variant="destructive" pill>
        Destructive
      </Badge>
    </div>
  );
}
