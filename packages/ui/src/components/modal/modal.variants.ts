import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Modal on our semantic tokens. The modal is a native <dialog>, which is the content box itself:
 * - the dialog is fixed to the viewport (`inset-0`) and placed with margins, 16px from the edges.
 *   It is never wider or taller than the screen minus that gap, and scrolls inside when it is
 *   taller;
 * - `backdrop:` dims the page behind it (`bg-dark-backdrop/70`);
 * - it appears and disappears without an animation.
 */
export const modalVariants = cva(
  [
    "fixed inset-0 h-fit max-h-[calc(100%-var(--spacing)*8)] w-[calc(100%-var(--spacing)*8)] overflow-y-auto",
    "rounded-base border border-default bg-neutral-primary-soft p-4 text-body shadow-sm md:p-6",
    "backdrop:bg-dark-backdrop/70",
  ],
  {
    variants: {
      /** The `max-w-*` widths. */
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
      },
      /** `{top|center|bottom}-{left|center|right}` placements, 16px from the edges. */
      placement: {
        "top-left": "ms-4 me-auto mt-4 mb-auto",
        "top-center": "mx-auto mt-4 mb-auto",
        "top-right": "ms-auto me-4 mt-4 mb-auto",
        "center-left": "ms-4 me-auto my-auto",
        center: "m-auto",
        "center-right": "ms-auto me-4 my-auto",
        "bottom-left": "ms-4 me-auto mt-auto mb-4",
        "bottom-center": "mx-auto mt-auto mb-4",
        "bottom-right": "ms-auto me-4 mt-auto mb-4",
      },
    },
    defaultVariants: { size: "2xl", placement: "center" },
  },
);

export type ModalVariantProps = VariantProps<typeof modalVariants>;

/** The modal header: the title and the close button, over a divider. */
export const modalHeaderClassName =
  "flex items-center justify-between gap-4 border-b border-default pb-4 md:pb-5";

/** The modal heading. */
export const modalTitleClassName = "text-lg font-medium text-heading";

/** The modal body: spaced paragraphs between the header and the footer. */
export const modalBodyClassName = "space-y-4 py-4 md:space-y-6 md:py-6";

/** The modal footer: the actions, over a divider. */
export const modalFooterClassName = "flex items-center gap-4 border-t border-default pt-4 md:pt-5";

/** The close button: a 36px × in the header's end corner. */
export const modalCloseClassName = [
  "ms-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-base bg-transparent text-sm text-body",
  "hover:bg-neutral-tertiary hover:text-heading [&_svg]:size-5",
  focusOutline,
].join(" ");
