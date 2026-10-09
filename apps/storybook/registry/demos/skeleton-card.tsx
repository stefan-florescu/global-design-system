import { Skeleton, SkeletonAvatar, SkeletonLine, SkeletonVideo } from "@stefan-florescu/ui";

export default function SkeletonCard() {
  return (
    <Skeleton className="border-default rounded-base w-full max-w-sm border p-4 shadow-xs md:p-6">
      <SkeletonVideo className="mb-4 sm:mb-6" />
      <SkeletonLine className="mb-4 w-48" />
      <SkeletonLine size="sm" className="mb-2.5" />
      <SkeletonLine size="sm" className="mb-2.5" />
      <SkeletonLine size="sm" />
      <div className="mt-4 flex items-center">
        <SkeletonAvatar className="me-3" />
        <div>
          <SkeletonLine className="mb-2 w-32" />
          <SkeletonLine size="sm" className="w-48" />
        </div>
      </div>
    </Skeleton>
  );
}
