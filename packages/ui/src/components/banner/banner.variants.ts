import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's banners: a full-width bar pinned to the top or bottom of the viewport, or a
 * floating card inset from the edges. The bar uses `muted` with a `border` hairline; the
 * floating card uses `background`, `border` and `shadow-md`.
 *
 * No z-index is set: the system has no layer tokens yet, so add one from your app's layer
 * scale when the banner must sit above positioned content.
 */
export const bannerVariants = cva("flex items-center gap-4 p-4 text-sm text-foreground", {
  variants: {
    position: {
      top: "fixed inset-x-0 top-0",
      bottom: "fixed inset-x-0 bottom-0",
      static: "relative w-full",
    },
    floating: {
      true: "rounded-lg border border-border bg-background shadow-md",
      false: "border-border bg-muted",
    },
  },
  compoundVariants: [
    { floating: false, position: "top", className: "border-b" },
    { floating: false, position: "bottom", className: "border-t" },
    { floating: false, position: "static", className: "border-y" },
    { floating: true, position: "top", className: "inset-x-4 top-4" },
    { floating: true, position: "bottom", className: "inset-x-4 bottom-4" },
  ],
  defaultVariants: { position: "top", floating: false },
});

export const bannerDismissClassName = [
  "ml-auto inline-flex size-8 shrink-0 cursor-pointer items-center justify-center self-start rounded-lg text-muted-foreground",
  "transition-colors hover:bg-accent hover:text-accent-foreground motion-reduce:transition-none",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
  "[&_svg]:size-4",
].join(" ");

export type BannerVariantProps = VariantProps<typeof bannerVariants>;
