import { ArrowRight } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        Get started
        <ArrowRight aria-hidden />
      </Button>
      <Button variant="outline">Learn more</Button>
    </div>
  );
}
