"use client";

import { X } from "@stefan-florescu/icons";
import {
  createContext,
  use,
  useCallback,
  useState,
  type ComponentProps,
  type MouseEvent,
} from "react";

import { cn } from "../../lib/cn";
import { Slot } from "../dropdown/dropdown-slot";

import { ToastEntryContext } from "./toast-context";
import {
  toastIconVariants,
  toastToggleClassName,
  toastVariants,
  type ToastIconVariantProps,
  type ToastVariantProps,
} from "./toast.variants";

const ToastContext = createContext<(() => void) | null>(null);

export type ToastProps = ComponentProps<"div"> &
  ToastVariantProps & {
    /** Called when a `ToastToggle` closes the toast. The toast hides itself. */
    onDismiss?: () => void;
  };

/**
 * A short message about an action, with optional actions. Close it with a `ToastToggle`.
 *
 * On its own, a toast is a polite live region (`role="status"`); a `danger` toast uses
 * `role="alert"`, which interrupts. Pass `role` to override. Inside `ToastProvider`, the stack is
 * the live region, so toasts shown with `useToast()` don't add their own role.
 */
export function Toast({ variant = "default", role, onDismiss, className, ...props }: ToastProps) {
  const entry = use(ToastEntryContext);
  const [dismissed, setDismissed] = useState(false);
  const dismiss = useCallback(() => {
    setDismissed(true);
    onDismiss?.();
    entry?.dismiss();
  }, [entry, onDismiss]);

  if (dismissed) return null;

  const defaultRole = entry ? undefined : variant === "danger" ? "alert" : "status";

  return (
    <ToastContext value={dismiss}>
      <div
        role={role ?? defaultRole}
        data-slot="toast"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    </ToastContext>
  );
}

export type ToastIconProps = ComponentProps<"span"> &
  ToastIconVariantProps & {
    /**
     * Visually hidden text read before the message, such as "Success:". Add it when the message
     * alone doesn't say what kind of toast it is. The icon itself is decorative.
     */
    label?: string;
  };

/** An icon in a coloured square, before the message. */
export function ToastIcon({ variant, size, label, className, children, ...props }: ToastIconProps) {
  return (
    <span
      data-slot="toast-icon"
      className={cn(toastIconVariants({ variant, size }), className)}
      {...props}
    >
      <span aria-hidden className="contents">
        {children}
      </span>
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

export type ToastToggleProps = ComponentProps<"button"> & {
  /** Accessible name of the × button. Ignored with `asChild`. */
  label?: string;
  /**
   * Close the toast with your own element instead, such as a `Button` reading "Not now". Its
   * text is its name.
   */
  asChild?: boolean;
};

/** Closes the toast. An × button by default; with `asChild`, any button you pass. */
export function ToastToggle({
  label = "Close",
  asChild = false,
  onClick,
  className,
  children,
  ...props
}: ToastToggleProps) {
  const dismiss = use(ToastContext);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) dismiss?.();
  };

  if (asChild) {
    return (
      <Slot data-slot="toast-toggle" onClick={handleClick} className={className} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      data-slot="toast-toggle"
      className={cn(toastToggleClassName, className)}
      onClick={handleClick}
      {...props}
    >
      {children ?? <X aria-hidden />}
    </button>
  );
}
