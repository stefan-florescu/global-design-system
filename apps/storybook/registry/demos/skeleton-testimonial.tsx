import { Skeleton, SkeletonAvatar, SkeletonLine } from "@stefan-florescu/ui";

export default function SkeletonTestimonial() {
  return (
    <Skeleton className="w-full">
      <SkeletonLine subtle className="mx-auto mb-2.5 max-w-[640px]" />
      <SkeletonLine subtle className="mx-auto max-w-[540px]" />
      <div className="mt-4 flex items-center justify-center">
        <SkeletonAvatar className="me-3 size-7" />
        <SkeletonLine className="me-3 w-20" />
        <SkeletonLine size="sm" className="w-24" />
      </div>
    </Skeleton>
  );
}
