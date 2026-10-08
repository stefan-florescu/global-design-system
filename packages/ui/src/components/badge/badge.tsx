import { X } from "@stefan-florescu/icons";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import {
  badgeDismissClassName,
  badgeLinkClassName,
  badgeVariants,
  type BadgeVariantProps,
} from "./badge.variants";

export type BadgeProps = Omit<ComponentProps<"span">, "ref"> &
  BadgeVariantProps & {
    /** Turn the badge into a link. */
    href?: string;
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
  onDismiss,
  dismissLabel = "Remove",
  className,
  children,
  ...props
}: BadgeProps) {
  const classes = cn(
    badgeVariants({ variant, size, bordered, pill, iconOnly }),
    href && badgeLinkClassName,
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        data-slot="badge"
        className={classes}
        {...(props as Omit<ComponentProps<"a">, "ref">)}
      >
        {children}
      </a>
    );
  }

  return (
    <span data-slot="badge" className={classes} {...props}>
      {children}
      {onDismiss ? (
        <button
          type="button"
          aria-label={dismissLabel}
          className={badgeDismissClassName}
          onClick={onDismiss}
        >
          <X aria-hidden />
        </button>
      ) : null}
    </span>
  );
}
