import { Skeleton, SkeletonBlock, SkeletonLine } from "@stefan-florescu/ui";

const bars = ["h-72", "h-56", "h-72", "h-64", "h-80", "h-72", "h-80"];

export default function SkeletonWidget() {
  return (
    <Skeleton className="border-default rounded-base w-full max-w-sm border p-4 shadow-xs md:p-6">
      <SkeletonLine className="mb-2.5 w-32" />
      <SkeletonLine size="sm" className="mb-10 w-48" />
      <div className="mt-4 flex items-baseline gap-6">
        {bars.map((height, i) => (
          <SkeletonBlock key={i} className={`w-full rounded-t-full ${height}`} />
        ))}
      </div>
    </Skeleton>
  );
}
