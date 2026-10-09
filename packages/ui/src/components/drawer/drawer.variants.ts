import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline, focusOutlineInset } from "../../lib/focus";

/*
 * Flowbite v4 drawer, class for class (https://flowbite.com/docs/components/drawer/), on our
 * semantic tokens, which carry Flowbite's role names. The panel is a native <dialog>:
 * - `m-0 inset-auto max-h-none max-w-none` undo the browser's centred dialog styles;
 * - `backdrop:` is Flowbite's backdrop element (`bg-dark-backdrop/70`);
 * - the slide uses Flowbite's `transition-transform` timing. `starting:` slides it in when it
 *   opens, and `transition-discrete` on `display` and `overlay` keeps it on screen (and in the
 *   top layer) while it slides out. Reduced motion drops the slide.
 */
export const drawerVariants = cva(
  [
    "fixed inset-auto m-0 max-h-none max-w-none overflow-y-auto border-default bg-neutral-primary-soft p-4 text-body",
    "backdrop:bg-dark-backdrop/70",
    "transition-[translate,display,overlay] transition-discrete motion-reduce:transition-none",
  ],
  {
    variants: {
      placement: {
        left: "top-0 left-0 h-screen w-96 border-e -translate-x-full open:translate-x-0 starting:open:-translate-x-full",
        right:
          "top-0 right-0 h-screen w-96 border-s translate-x-full open:translate-x-0 starting:open:translate-x-full",
        top: "inset-x-0 top-0 max-h-screen w-full border-b -translate-y-full open:translate-y-0 starting:open:-translate-y-full",
        bottom:
          "inset-x-0 bottom-0 max-h-screen w-full border-t translate-y-full open:translate-y-0 starting:open:translate-y-full",
      },
      /** Without a backdrop the drawer is not in the top layer, so it takes the modal layer. */
      modal: {
        true: "",
        false: "z-modal",
      },
      /** Swipeable edge: slides from, and back to, the 60px strip that stays on screen. */
      edge: {
        true: "rounded-t-base p-0 translate-y-[calc(100%-var(--spacing)*15)] starting:open:translate-y-[calc(100%-var(--spacing)*15)]",
        false: "",
      },
    },
    defaultVariants: { placement: "left", modal: true, edge: false },
  },
);

export type DrawerVariantProps = VariantProps<typeof drawerVariants>;

/** The strip of a swipeable-edge drawer that stays on screen while it is closed. */
export const drawerEdgeClassName =
  "fixed inset-x-0 bottom-0 z-fixed h-15 overflow-hidden rounded-t-base border-t border-default bg-neutral-primary-soft";

/** Flowbite's drawer heading row. */
export const drawerHeaderClassName = "mb-5 flex items-center border-b border-default pb-4";

/** Flowbite's drawer heading (an `h5` there): body colour, with an optional leading icon. */
export const drawerTitleClassName =
  "inline-flex items-center text-lg font-medium text-body [&_svg]:me-1.5 [&_svg]:size-5 [&_svg]:shrink-0";

export const drawerDescriptionClassName = "mb-3 text-sm text-body";

/** Flowbite's close button, pinned to the drawer's top-end corner. */
export const drawerCloseClassName = [
  "absolute end-2.5 top-2.5 flex size-9 cursor-pointer items-center justify-center rounded-base bg-transparent text-body",
  "hover:bg-neutral-tertiary hover:text-heading [&_svg]:size-5",
  focusOutline,
].join(" ");

/** Flowbite's swipeable-edge header: the whole row toggles the drawer. */
export const drawerHandleClassName = [
  "relative block w-full cursor-pointer p-4 text-start hover:bg-neutral-secondary-soft",
  focusOutlineInset,
].join(" ");

/** The short bar centred at the top of the handle. */
export const drawerHandleBarClassName =
  "absolute top-3 left-1/2 h-1 w-8 -translate-x-1/2 rounded-lg bg-neutral-quaternary";

export const drawerHandleLabelClassName =
  "inline-flex items-center text-base font-medium text-body [&_svg]:me-1.5 [&_svg]:size-5 [&_svg]:shrink-0";
