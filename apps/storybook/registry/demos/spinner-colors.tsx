import { Spinner, type SpinnerProps } from "@stefan-florescu/ui";

const variants: SpinnerProps["variant"][] = [
  "brand",
  "dark",
  "success",
  "danger",
  "warning",
  "pink",
  "purple",
];

export default function SpinnerColors() {
  return (
    <div className="flex items-center gap-2">
      {variants.map((variant) => (
        <Spinner key={variant} variant={variant} />
      ))}
    </div>
  );
}
