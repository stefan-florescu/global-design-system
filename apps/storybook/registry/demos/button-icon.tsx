import { ArrowRight, Plus, Search } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconOnly aria-label="Next step">
        <ArrowRight aria-hidden />
      </Button>
      <Button iconOnly pill aria-label="Add item">
        <Plus aria-hidden />
      </Button>
      <Button iconOnly variant="outline" aria-label="Search">
        <Search aria-hidden />
      </Button>
      <Button iconOnly outline pill aria-label="Next step">
        <ArrowRight aria-hidden />
      </Button>
    </div>
  );
}
