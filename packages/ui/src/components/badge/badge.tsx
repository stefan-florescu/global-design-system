import { X } from "@stefan-florescu/icons";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import {
  badgeDismissVariants,
  badgeDotVariants,
  badgeLinkClassName,
  badgeVariants,
  type BadgeVariantProps,
} from "./badge.variants";

export type BadgeProps = Omit<ComponentProps<"span">, "ref"> &
  BadgeVariantProps & {
    /** Turn the badge into a link. */
    href?: string;
    /** Show a dot in the label colour before the content. */
    dot?: boolean;
    /**
     * Show a remove button (a "chip"). Called when it is pressed; remove the badge from your
     * state to hide it.
     */
    onDismiss?: () => void;
    /** Accessible name of the remove button. */
    dismissLabel?: string;
  };

/** A small label for a status, count or category. */
export function Badge({
  variant,
  size,
  bordered,
  pill,
  iconOnly,
  href,
  dot = false,
  onDismiss,
  dismissLabel = "Remove",
  className,
  children,
  ...props
}: BadgeProps) {
  const classes = cn(
    badgeVariants({
      variant,
      size,
      bordered,
      pill,
      iconOnly,
      link: Boolean(href),
      dismissible: Boolean(onDismiss),
    }),
    href && badgeLinkClassName,
    className,
  );
  const dotElement = dot ? (
    <span aria-hidden data-slot="badge-dot" className={badgeDotVariants({ variant })} />
  ) : null;

  if (href) {
    return (
      <a
        href={href}
        data-slot="badge"
        className={classes}
        {...(props as Omit<ComponentProps<"a">, "ref">)}
      >
        {dotElement}
        {children}
      </a>
    );
  }

  return (
    <span data-slot="badge" className={classes} {...props}>
      {dotElement}
      {children}
      {onDismiss ? (
        <button
          type="button"
          aria-label={dismissLabel}
          data-slot="badge-dismiss"
          className={badgeDismissVariants({ variant })}
          onClick={onDismiss}
        >
          <X aria-hidden />
        </button>
      ) : null}
    </span>
  );
}
