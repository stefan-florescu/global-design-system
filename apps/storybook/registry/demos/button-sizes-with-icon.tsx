import { Mail } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function ButtonSizesWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} size={size}>
          <Mail aria-hidden />
          Email us
        </Button>
      ))}
    </div>
  );
}
