import { cva, type VariantProps } from "class-variance-authority";

/*
 * Skeletons on our semantic tokens. `Skeleton` is the `role="status"` wrapper that pulses; the
 * placeholders inside are decorative blocks in `neutral-quaternary` (or `default`, a subtler fill
 * for the list and testimonial layouts). The pulse stops when the user prefers reduced motion.
 */
export const skeletonVariants = cva("", {
  variants: {
    animated: {
      true: "animate-pulse motion-reduce:animate-none",
      false: "",
    },
  },
  defaultVariants: { animated: true },
});

/** Any placeholder shape. Give it a size and radius with `className`. */
export const skeletonBlockVariants = cva("", {
  variants: {
    subtle: {
      true: "bg-default",
      false: "bg-neutral-quaternary",
    },
  },
  defaultVariants: { subtle: false },
});

/** A line of text: `md` for headings and short text (10px), `sm` for body lines (8px). */
export const skeletonLineVariants = cva("rounded-full", {
  variants: {
    size: {
      sm: "h-2",
      md: "h-2.5",
    },
  },
  defaultVariants: { size: "md" },
});

/** An image or video: a 192px block with a centred icon. */
export const skeletonMediaClassName =
  "bg-neutral-quaternary rounded-base flex h-48 items-center justify-center";

/** The icon inside an image or video placeholder. */
export const skeletonMediaIconClassName = "text-fg-disabled size-11 shrink-0";

/** The user icon of an avatar placeholder. */
export const skeletonAvatarClassName = "text-fg-disabled size-8 shrink-0";

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;
export type SkeletonBlockVariantProps = VariantProps<typeof skeletonBlockVariants>;
export type SkeletonLineVariantProps = VariantProps<typeof skeletonLineVariants>;
