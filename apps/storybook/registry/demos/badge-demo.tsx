import { Badge } from "@stefan-florescu/ui";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Badge variant="brand">Brand</Badge>
      <Badge variant="alternative">Alternative</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  );
}
