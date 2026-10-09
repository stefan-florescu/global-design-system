import { Skeleton, SkeletonLine } from "@stefan-florescu/ui";

export default function SkeletonDemo() {
  return (
    <Skeleton className="w-full max-w-sm">
      <SkeletonLine className="mb-4 w-48" />
      <SkeletonLine size="sm" className="mb-2.5 max-w-[360px]" />
      <SkeletonLine size="sm" className="mb-2.5" />
      <SkeletonLine size="sm" className="mb-2.5 max-w-[330px]" />
      <SkeletonLine size="sm" className="mb-2.5 max-w-[300px]" />
      <SkeletonLine size="sm" className="max-w-[360px]" />
    </Skeleton>
  );
}
