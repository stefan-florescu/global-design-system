import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Toasts on our semantic tokens. `default` is the white toast; `danger`, `warning`, `brand` and
 * `success` use the Alert colours. Every label and fill pairing passes WCAG 2.2 AA.
 */
export const toastVariants = cva(
  "flex w-full max-w-xs items-center rounded-base border p-4 shadow-xs",
  {
    variants: {
      variant: {
        default: "border-default bg-neutral-primary-soft text-body",
        brand: "border-brand-subtle bg-brand-softer text-sm text-fg-brand-strong",
        success: "border-success-subtle bg-success-soft text-sm text-fg-success-strong",
        danger: "border-danger-subtle bg-danger-soft text-sm text-fg-danger-strong",
        warning: "border-warning-subtle bg-warning-soft text-sm text-fg-warning",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/**
 * The square behind a toast's icon, in the toast's colour. `brand` is the brand icon on a neutral
 * square, as in an interactive toast.
 */
export const toastIconVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "bg-neutral-primary-medium text-fg-brand",
        success: "bg-success-soft text-fg-success",
        danger: "bg-danger-soft text-fg-danger",
        warning: "bg-warning-soft text-fg-warning",
      },
      size: {
        sm: "size-7",
        md: "size-9",
      },
    },
    defaultVariants: { variant: "brand", size: "sm" },
  },
);

/** The 32px × button, pushed to the end of the toast. */
export const toastToggleClassName = [
  "ms-auto box-border flex size-8 shrink-0 cursor-pointer items-center justify-center rounded border border-transparent bg-transparent",
  "text-sm leading-5 font-medium text-body hover:bg-neutral-secondary-medium hover:text-heading",
  "focus:ring-4 focus:ring-neutral-tertiary [&_svg]:size-5",
  focusOutline,
].join(" ");

/**
 * The stack of toasts shown by `ToastProvider`, 20px from the edges.
 * Below `sm` it spans the screen, minus a 16px gutter.
 */
export const toastViewportVariants = cva(
  "pointer-events-none z-toast inset-x-4 flex flex-col gap-3 sm:inset-x-auto sm:w-full sm:max-w-xs",
  {
    variants: {
      position: {
        "top-start": "top-5 sm:start-5",
        "top-center": "top-5 sm:inset-x-0 sm:mx-auto",
        "top-end": "top-5 sm:end-5",
        "bottom-start": "bottom-5 sm:start-5",
        "bottom-center": "bottom-5 sm:inset-x-0 sm:mx-auto",
        "bottom-end": "bottom-5 sm:end-5",
      },
      /** Place the stack in the nearest positioned ancestor instead of the viewport. */
      contained: {
        true: "absolute",
        false: "fixed",
      },
    },
    defaultVariants: { position: "bottom-end", contained: false },
  },
);

export type ToastVariantProps = VariantProps<typeof toastVariants>;
export type ToastIconVariantProps = VariantProps<typeof toastIconVariants>;
export type ToastPosition = NonNullable<VariantProps<typeof toastViewportVariants>["position"]>;
