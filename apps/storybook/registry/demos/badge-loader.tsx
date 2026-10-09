import { LoaderCircle } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

export default function BadgeLoader() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" bordered>
        <LoaderCircle aria-hidden className="me-1 animate-spin motion-reduce:animate-none" />2 mins
        ago
      </Badge>
      <Badge variant="alternative" bordered>
        <LoaderCircle aria-hidden className="me-1 animate-spin motion-reduce:animate-none" />2 mins
        ago
      </Badge>
      <Badge variant="gray" bordered>
        <LoaderCircle aria-hidden className="me-1 animate-spin motion-reduce:animate-none" />2 mins
        ago
      </Badge>
      <Badge variant="danger" bordered>
        <LoaderCircle aria-hidden className="me-1 animate-spin motion-reduce:animate-none" />2 mins
        ago
      </Badge>
      <Badge variant="success" bordered>
        <LoaderCircle aria-hidden className="me-1 animate-spin motion-reduce:animate-none" />2 mins
        ago
      </Badge>
      <Badge variant="warning" bordered>
        <LoaderCircle aria-hidden className="me-1 animate-spin motion-reduce:animate-none" />2 mins
        ago
      </Badge>
    </div>
  );
}
