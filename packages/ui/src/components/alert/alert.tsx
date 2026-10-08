"use client";

import { X } from "@stefan-florescu/icons";
import { useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  alertDismissClassName,
  alertIconClassName,
  alertVariants,
  type AlertVariantProps,
} from "./alert.variants";

export type AlertProps = ComponentProps<"div"> &
  AlertVariantProps & {
    /** Decorative icon shown before the content. It is hidden from assistive technology. */
    icon?: ReactNode;
    /** Show a close button. The alert hides itself when it is pressed. */
    dismissible?: boolean;
    /** Accessible name of the close button. */
    dismissLabel?: string;
    /** Called after the close button is pressed. */
    onDismiss?: () => void;
  };

/**
 * A short, important message about the current page or task.
 *
 * `destructive` and `warning` alerts use `role="alert"`, so screen readers announce them when
 * they appear; the other variants use the polite `role="status"`. Pass `role` to override.
 */
export function Alert({
  variant = "info",
  bordered,
  accentBorder,
  icon,
  dismissible = false,
  dismissLabel = "Dismiss",
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const urgent = variant === "destructive" || variant === "warning";

  return (
    <div
      role={urgent ? "alert" : "status"}
      data-slot="alert"
      className={cn(alertVariants({ variant, bordered, accentBorder }), className)}
      {...props}
    >
      {icon ? (
        <span aria-hidden className={alertIconClassName}>
          {icon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">{children}</div>
      {dismissible ? (
        <button
          type="button"
          aria-label={dismissLabel}
          className={alertDismissClassName}
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
        >
          <X aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

/** Bold lead-in or heading line of an alert. */
export function AlertTitle({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="alert-title" className={cn("font-medium", className)} {...props} />;
}

/** Supporting text of an alert. */
export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("mt-1", className)} {...props} />;
}
