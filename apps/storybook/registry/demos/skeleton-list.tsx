import { Skeleton, SkeletonLine } from "@stefan-florescu/ui";

export default function SkeletonList() {
  return (
    <Skeleton className="border-default divide-default rounded-base w-full max-w-md divide-y border p-4 shadow-xs md:p-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className={`flex items-center justify-between ${i === 0 ? "pb-4" : "py-4"}`}>
          <div>
            <SkeletonLine className="mb-2.5 w-24" />
            <SkeletonLine size="sm" className="w-32" />
          </div>
          <SkeletonLine subtle className="w-12" />
        </div>
      ))}
    </Skeleton>
  );
}
