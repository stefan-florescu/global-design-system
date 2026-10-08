import { Check } from "@stefan-florescu/icons";
import { Badge } from "@stefan-florescu/ui";

export default function BadgeIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge iconOnly>
        <Check aria-hidden />
        <span className="sr-only">Verified</span>
      </Badge>
      <Badge iconOnly variant="success" size="lg">
        <Check aria-hidden />
        <span className="sr-only">Completed</span>
      </Badge>
    </div>
  );
}
