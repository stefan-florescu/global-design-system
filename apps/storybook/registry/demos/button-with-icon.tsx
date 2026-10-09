import { ArrowRight, ShoppingCart } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <ShoppingCart aria-hidden />
        Buy now
      </Button>
      <Button>
        Choose plan
        <ArrowRight aria-hidden />
      </Button>
    </div>
  );
}
