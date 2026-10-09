import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4 breadcrumb, class for class (https://flowbite.com/docs/components/breadcrumb/):
 * `text-body` links that turn `fg-brand` on hover, the current page in `body-subtle`, 14px
 * chevron separators. `solid` is Flowbite's "Solid background" trail. Accessibility addition:
 * links draw the solid keyboard outline from lib/focus (Flowbite has no focus style).
 */
export const breadcrumbVariants = cva("flex", {
  variants: {
    variant: {
      default: "",
      solid: "rounded-base border border-default-medium bg-neutral-secondary-medium p-3",
    },
  },
  defaultVariants: { variant: "default" },
});

export const breadcrumbListClassName =
  "m-0 inline-flex list-none items-center space-x-1 p-0 md:space-x-2 rtl:space-x-reverse";

export const breadcrumbItemClassName =
  "group inline-flex items-center space-x-1.5 rtl:space-x-reverse";

export const breadcrumbSeparatorClassName =
  "size-3.5 shrink-0 text-body group-first:hidden rtl:rotate-180";

const labelClassName =
  "inline-flex items-center text-sm font-medium [&_svg]:me-1.5 [&_svg]:size-4 [&_svg]:shrink-0";

export const breadcrumbLinkClassName = [
  labelClassName,
  "rounded-xs text-body no-underline hover:text-fg-brand",
  focusOutline,
].join(" ");

export const breadcrumbPageClassName = [labelClassName, "text-body-subtle"].join(" ");

export type BreadcrumbVariantProps = VariantProps<typeof breadcrumbVariants>;
