import { Badge, indicatorPlacementVariants } from "@stefan-florescu/ui";

const PLACEMENTS = [
  "top-start",
  "top-center",
  "top-end",
  "middle-start",
  "middle-center",
  "middle-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
] as const;

export default function IndicatorPosition() {
  return (
    <div className="flex justify-center py-4">
      <div className="bg-neutral-secondary-soft border-default rounded-base relative size-56 border">
        {PLACEMENTS.map((placement) => (
          <Badge
            key={placement}
            className={indicatorPlacementVariants({
              placement,
              className: "text-fg-brand rounded-base px-2 ring-1 ring-inset",
            })}
          >
            {placement}
          </Badge>
        ))}
      </div>
    </div>
  );
}
