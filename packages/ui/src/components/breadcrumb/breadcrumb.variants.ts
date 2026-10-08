import { cva, type VariantProps } from "class-variance-authority";

/*
 * Flowbite's breadcrumb: links in `foreground` that turn `brand-subtle-foreground` on hover,
 * the current page in `muted-foreground`, chevron separators. `solid` adds a `muted` surface
 * (muted-foreground on muted is a checked pairing).
 */
export const breadcrumbVariants = cva("w-fit", {
  variants: {
    variant: {
      default: "",
      solid: "rounded-lg border border-border bg-muted px-5 py-3",
    },
  },
  defaultVariants: { variant: "default" },
});

export const breadcrumbListClassName =
  "m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-sm font-medium md:gap-2.5";

export const breadcrumbItemClassName = "group inline-flex items-center gap-1.5 md:gap-2.5";

export const breadcrumbSeparatorClassName =
  "size-4 shrink-0 text-muted-foreground group-first:hidden";

export const breadcrumbLinkClassName = [
  "inline-flex items-center gap-2 rounded-xs text-foreground no-underline",
  "transition-colors hover:text-brand-subtle-foreground motion-reduce:transition-none",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "[&_svg]:size-4 [&_svg]:shrink-0",
].join(" ");

export const breadcrumbPageClassName =
  "inline-flex items-center gap-2 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0";

export type BreadcrumbVariantProps = VariantProps<typeof breadcrumbVariants>;
