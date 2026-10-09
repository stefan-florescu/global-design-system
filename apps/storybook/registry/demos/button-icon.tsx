import { ArrowRight } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(["xs", "sm", "md"] as const).map((size) => (
        <Button key={size} iconOnly size={size} aria-label="Next step">
          <ArrowRight aria-hidden />
        </Button>
      ))}
      {(["xs", "sm", "md"] as const).map((size) => (
        <Button key={`outline-${size}`} iconOnly outline size={size} aria-label="Next step">
          <ArrowRight aria-hidden />
        </Button>
      ))}
    </div>
  );
}
