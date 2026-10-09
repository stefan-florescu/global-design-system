import { Skeleton, SkeletonVideo } from "@stefan-florescu/ui";

export default function SkeletonVideoDemo() {
  return (
    <Skeleton className="w-full max-w-sm">
      <SkeletonVideo className="h-56" />
    </Skeleton>
  );
}
