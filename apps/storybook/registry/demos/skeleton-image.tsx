import { Skeleton, SkeletonImage, SkeletonLine } from "@stefan-florescu/ui";

export default function SkeletonImageDemo() {
  return (
    <Skeleton className="w-full space-y-8 md:flex md:items-center md:space-y-0 md:space-x-8 rtl:space-x-reverse">
      <SkeletonImage className="w-full sm:w-96" />
      <div className="w-full">
        <SkeletonLine className="mb-4 w-48" />
        <SkeletonLine size="sm" className="mb-2.5 max-w-[480px]" />
        <SkeletonLine size="sm" className="mb-2.5" />
        <SkeletonLine size="sm" className="mb-2.5 max-w-[440px]" />
        <SkeletonLine size="sm" className="mb-2.5 max-w-[460px]" />
        <SkeletonLine size="sm" className="max-w-[360px]" />
      </div>
    </Skeleton>
  );
}
