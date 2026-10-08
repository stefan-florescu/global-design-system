import { ArrowRight, Plus } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus aria-hidden />
        New project
      </Button>
      <Button variant="outline">
        Choose plan
        <ArrowRight aria-hidden />
      </Button>
    </div>
  );
}
