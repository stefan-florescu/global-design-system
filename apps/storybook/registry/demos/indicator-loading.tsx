import { Badge } from "@stefan-florescu/ui";

export default function IndicatorLoading() {
  return (
    <div className="flex justify-center">
      <div
        role="status"
        className="bg-neutral-secondary-soft border-default rounded-base flex size-56 items-center justify-center border"
      >
        <Badge className="animate-pulse rounded-sm px-2 py-px ring-1 ring-inset motion-reduce:animate-none">
          loading...
        </Badge>
      </div>
    </div>
  );
}
