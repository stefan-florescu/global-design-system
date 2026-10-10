import { CircleUser, FileVideoCamera, Image, type LucideProps } from "@stefan-florescu/icons";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import {
  skeletonAvatarClassName,
  skeletonBlockVariants,
  skeletonLineVariants,
  skeletonMediaClassName,
  skeletonMediaIconClassName,
  skeletonVariants,
  type SkeletonBlockVariantProps,
  type SkeletonLineVariantProps,
  type SkeletonVariantProps,
} from "./skeleton.variants";

export type SkeletonProps = ComponentProps<"div"> &
  SkeletonVariantProps & {
    /** Text for screen readers, announced by the `role="status"` region. */
    label?: string;
  };

/**
 * A loading placeholder that mimics the content on its way. A `role="status"` region that pulses
 * and tells screen readers it is loading; lay out the placeholders inside it.
 */
export function Skeleton({
  label = "Loading…",
  animated,
  className,
  children,
  ...props
}: SkeletonProps) {
  return (
    <div
      role="status"
      data-slot="skeleton"
      className={cn(skeletonVariants({ animated }), className)}
      {...props}
    >
      {children}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export type SkeletonBlockProps = Omit<ComponentProps<"div">, "children"> &
  SkeletonBlockVariantProps;

/** A placeholder of any shape, such as a chart bar. Size and round it with `className`. */
export function SkeletonBlock({ subtle, className, ...props }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-block"
      className={cn(skeletonBlockVariants({ subtle }), className)}
      {...props}
    />
  );
}

export type SkeletonLineProps = SkeletonBlockProps & SkeletonLineVariantProps;

/** A line of text. Full width by default; set a width or `max-w-*` with `className`. */
export function SkeletonLine({ size, subtle, className, ...props }: SkeletonLineProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-line"
      className={cn(skeletonBlockVariants({ subtle }), skeletonLineVariants({ size }), className)}
      {...props}
    />
  );
}

export type SkeletonImageProps = Omit<ComponentProps<"div">, "children">;

/** An image placeholder: a 192px block with an image icon. */
export function SkeletonImage({ className, ...props }: SkeletonImageProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-image"
      className={cn(skeletonMediaClassName, className)}
      {...props}
    >
      <Image className={skeletonMediaIconClassName} />
    </div>
  );
}

export type SkeletonVideoProps = SkeletonImageProps;

/** A video placeholder: a 192px block with a video file icon. */
export function SkeletonVideo({ className, ...props }: SkeletonVideoProps) {
  return (
    <div
      aria-hidden
      data-slot="skeleton-video"
      className={cn(skeletonMediaClassName, className)}
      {...props}
    >
      <FileVideoCamera className={skeletonMediaIconClassName} />
    </div>
  );
}

export type SkeletonAvatarProps = LucideProps;

/** An avatar placeholder: a 32px user icon. */
export function SkeletonAvatar({ className, ...props }: SkeletonAvatarProps) {
  return (
    <CircleUser
      aria-hidden
      data-slot="skeleton-avatar"
      className={cn(skeletonAvatarClassName, className)}
      {...props}
    />
  );
}
