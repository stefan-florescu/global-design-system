import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Flowbite v4 modal, class for class (https://flowbite.com/docs/components/modal/), on our semantic
 * tokens, which carry Flowbite's role names. The modal is a native <dialog>, which is Flowbite's
 * "modal content" box itself:
 * - Flowbite centres the box in a full-screen wrapper with `p-4`; here the dialog is fixed to the
 *   viewport (`inset-0`) and placed with margins, keeping the same 16px gap from the edges. It is
 *   never wider or taller than the screen minus that gap, and scrolls inside when it is taller;
 * - `backdrop:` is Flowbite's backdrop element (`bg-dark-backdrop/70`);
 * - like Flowbite, it appears and disappears without an animation.
 */
export const modalVariants = cva(
  [
    "fixed inset-0 h-fit max-h-[calc(100%-var(--spacing)*8)] w-[calc(100%-var(--spacing)*8)] overflow-y-auto",
    "rounded-base border border-default bg-neutral-primary-soft p-4 text-body shadow-sm md:p-6",
    "backdrop:bg-dark-backdrop/70",
  ],
  {
    variants: {
      /** Flowbite's `max-w-*` widths. Its "Sizes" section uses `md`, `lg`, `4xl` and `7xl`. */
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
      /** Flowbite's `{top|center|bottom}-{left|center|right}` placements, 16px from the edges. */
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

/** Flowbite's modal header: the title and the close button, over a divider. */
export const modalHeaderClassName =
  "flex items-center justify-between gap-4 border-b border-default pb-4 md:pb-5";

/** Flowbite's modal heading (an `h3` there). */
export const modalTitleClassName = "text-lg font-medium text-heading";

/** Flowbite's modal body: spaced paragraphs between the header and the footer. */
export const modalBodyClassName = "space-y-4 py-4 md:space-y-6 md:py-6";

/** Flowbite's modal footer: the actions, over a divider. */
export const modalFooterClassName = "flex items-center gap-4 border-t border-default pt-4 md:pt-5";

/** Flowbite's close button: a 36px × in the header's end corner. */
export const modalCloseClassName = [
  "ms-auto inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-base bg-transparent text-sm text-body",
  "hover:bg-neutral-tertiary hover:text-heading [&_svg]:size-5",
  focusOutline,
].join(" ");
