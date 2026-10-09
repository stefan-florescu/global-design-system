import { ShoppingCart } from "@stefan-florescu/icons";
import { Button } from "@stefan-florescu/ui";

const SIZES = [
  ["xs", "Extra small"],
  ["sm", "Small"],
  ["md", "Base"],
  ["lg", "Large"],
  ["xl", "Extra large"],
] as const;

export default function ButtonSizesWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SIZES.map(([size, label]) => (
        <Button key={size} size={size}>
          <ShoppingCart aria-hidden />
          {label}
        </Button>
      ))}
    </div>
  );
}
