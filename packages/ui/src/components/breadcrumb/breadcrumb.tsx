import { ChevronRight } from "@stefan-florescu/icons";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  breadcrumbItemClassName,
  breadcrumbLinkClassName,
  breadcrumbListClassName,
  breadcrumbPageClassName,
  breadcrumbSeparatorClassName,
  breadcrumbVariants,
  type BreadcrumbVariantProps,
} from "./breadcrumb.variants";

export type BreadcrumbProps = ComponentProps<"nav"> & BreadcrumbVariantProps;

/**
 * Shows where the current page sits in the site hierarchy. Renders a `<nav>` landmark named
 * "Breadcrumb" with an ordered list of `BreadcrumbItem`s.
 */
export function Breadcrumb({ variant, className, children, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="breadcrumb"
      className={cn(breadcrumbVariants({ variant }), className)}
      {...props}
    >
      <ol className={breadcrumbListClassName}>{children}</ol>
    </nav>
  );
}

export type BreadcrumbItemProps = Omit<ComponentProps<"li">, "children"> & {
  /** Link to this level. Leave it out on the last item: it marks the current page. */
  href?: string;
  /** Icon before the label, such as a house for the home page. */
  icon?: ReactNode;
  children?: ReactNode;
};

/** One level in the trail. Items after the first are preceded by a chevron. */
export function BreadcrumbItem({ href, icon, className, children, ...props }: BreadcrumbItemProps) {
  return (
    <li data-slot="breadcrumb-item" className={cn(breadcrumbItemClassName, className)} {...props}>
      <ChevronRight aria-hidden className={breadcrumbSeparatorClassName} />
      {href ? (
        <a href={href} className={breadcrumbLinkClassName}>
          {icon}
          {children}
        </a>
      ) : (
        <span aria-current="page" className={breadcrumbPageClassName}>
          {icon}
          {children}
        </span>
      )}
    </li>
  );
}
