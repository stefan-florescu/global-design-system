import { Badge, Spinner } from "@stefan-florescu/ui";

export default function BadgeLoader() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand" bordered>
        <Spinner decorative variant="current" className="me-1" />2 mins ago
      </Badge>
      <Badge variant="alternative" bordered>
        <Spinner decorative variant="current" className="me-1" />2 mins ago
      </Badge>
      <Badge variant="gray" bordered>
        <Spinner decorative variant="current" className="me-1" />2 mins ago
      </Badge>
      <Badge variant="danger" bordered>
        <Spinner decorative variant="current" className="me-1" />2 mins ago
      </Badge>
      <Badge variant="success" bordered>
        <Spinner decorative variant="current" className="me-1" />2 mins ago
      </Badge>
      <Badge variant="warning" bordered>
        <Spinner decorative variant="current" className="me-1" />2 mins ago
      </Badge>
    </div>
  );
}
