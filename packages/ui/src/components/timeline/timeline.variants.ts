import { cva, type VariantProps } from "class-variance-authority";

/*
 * Timelines on our semantic tokens. The vertical timeline is the default; `horizontal` is a
 * stepper timeline, which stacks vertically below `sm`.
 *
 * The parts are server components, so they can't read the orientation from React context.
 * `Timeline` marks itself `data-horizontal`, and its items, points and content restyle themselves
 * with `[[data-horizontal]>&]`-style variants that only match their own list, so a timeline nested
 * in another keeps its own orientation. These selectors are more specific than the vertical
 * classes they replace, so the result doesn't depend on the order of the generated CSS.
 */
export const timelineVariants = cva("", {
  variants: {
    horizontal: {
      false: "relative border-s border-default",
      true: "items-center sm:flex",
    },
  },
  defaultVariants: { horizontal: false },
});

/**
 * An event. Vertical items sit 24px from the line, or 16px next to a plain dot (the
 * default timeline); the last item has no bottom margin.
 */
export const timelineItemClassName = [
  "ms-6 mb-10 last:mb-0",
  "[:not([data-horizontal])>&]:has-[>[data-marker=dot]]:ms-4",
  "[[data-horizontal]>&]:relative [[data-horizontal]>&]:ms-0 [[data-horizontal]>&]:mb-6 [[data-horizontal]>&]:sm:mb-0",
].join(" ");

/**
 * The wrapper of a point. Vertical points are absolutely placed on the line, so the wrapper is a
 * plain block. Horizontal points sit in a row with the connector line that runs to the next item.
 */
export const timelinePointWrapperClassName =
  "[[data-horizontal]>*>&]:flex [[data-horizontal]>*>&]:items-center";

/** The line from a horizontal point to the next one, shown from `sm` up. */
export const timelineConnectorClassName =
  "hidden h-px w-full bg-neutral-quaternary [[data-horizontal]>*>*>&]:sm:flex";

export const timelinePointVariants = cva(
  [
    "absolute rounded-full",
    // Horizontal: in the flow, before the connector, with the ring from `sm` up.
    "[[data-horizontal]>*>*>&]:static [[data-horizontal]>*>*>&]:z-10 [[data-horizontal]>*>*>&]:shrink-0",
    "[[data-horizontal]>*>*>&]:ring-0 [[data-horizontal]>*>*>&]:sm:ring-8",
  ],
  {
    variants: {
      marker: {
        /** A 12px grey dot on the line. */
        dot: "-start-1.5 mt-1.5 size-3 border border-buffer bg-neutral-quaternary [[data-horizontal]>*>*>&]:mt-0 [[data-horizontal]>*>*>&]:ring-buffer",
        /** A 24px brand circle with a 12px icon. */
        icon: "-start-3 flex size-6 items-center justify-center bg-brand-softer text-fg-brand-strong ring-8 ring-buffer [&_svg]:size-3 [&_svg]:shrink-0",
        /** A 24px circle for your own content, such as an `Avatar`. */
        custom: "-start-3 flex size-6 items-center justify-center ring-8 ring-buffer",
      },
    },
    defaultVariants: { marker: "dot" },
  },
);

/** Horizontal content sits below the point, with room before the next item. */
export const timelineContentClassName =
  "[[data-horizontal]>*>&]:mt-3 [[data-horizontal]>*>&]:sm:pe-8";

export const timelineTimeClassName = "text-sm leading-none font-normal text-body";

export const timelineTitleClassName = "my-2 text-lg font-semibold text-heading";

/** A 16px gap before whatever follows the text, such as a button. */
export const timelineBodyClassName = "text-base font-normal text-body not-last:mb-4";

export type TimelineVariantProps = VariantProps<typeof timelineVariants>;
export type TimelinePointVariantProps = VariantProps<typeof timelinePointVariants>;
