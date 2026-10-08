import { Badge } from "@stefan-florescu/ui";

export default function BadgeLink() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge href="/changelog">Changelog</Badge>
      <Badge href="/components" variant="neutral" size="lg">
        All components
      </Badge>
    </div>
  );
}
