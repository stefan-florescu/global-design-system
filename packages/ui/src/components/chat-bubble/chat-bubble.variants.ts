import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Chat bubble, in three styles:
 * - default: name, time and status sit inside the `neutral-secondary-soft` bubble;
 * - outline: name, time and status sit outside, above and below the bubble;
 * - clean: no bubble, the message is `heading` text on the page.
 * The corner nearest the avatar stays square; `align="end"` mirrors the layout for sent messages.
 */
export const chatBubbleVariants = cva("flex items-start gap-2.5", {
  variants: {
    align: {
      start: "",
      end: "flex-row-reverse",
    },
  },
  defaultVariants: { align: "start" },
});

const bubbleShape = {
  start: "rounded-e-base rounded-es-base",
  end: "rounded-s-base rounded-ee-base",
} as const;

const bubbleSurface = "bg-neutral-secondary-soft p-4";

/** The column next to the avatar: header, message and status. */
export const chatBubbleBodyVariants = cva("flex w-full max-w-80 min-w-0 flex-col", {
  variants: {
    variant: {
      default: `leading-1.5 ${bubbleSurface}`,
      outline: "gap-1",
      clean: "leading-1.5",
    },
    align: {
      start: "",
      end: "",
    },
  },
  compoundVariants: [
    { variant: "default", align: "start", className: bubbleShape.start },
    { variant: "default", align: "end", className: bubbleShape.end },
  ],
  defaultVariants: { variant: "default", align: "start" },
});

/** The outline style's bubble, between the header and the status. */
export const chatBubbleSurfaceVariants = cva(
  `flex w-full flex-col leading-1.5 text-start ${bubbleSurface}`,
  {
    variants: {
      align: bubbleShape,
    },
    defaultVariants: { align: "start" },
  },
);

/** The message itself. */
export const chatBubbleContentVariants = cva("w-full text-start text-sm", {
  variants: {
    variant: {
      default: "py-2.5 text-body",
      outline: "text-body",
      clean: "py-2 text-heading",
    },
  },
  defaultVariants: { variant: "default" },
});

export const chatBubbleHeaderClassName = "flex items-center gap-1.5";

export const chatBubbleNameClassName = "text-sm font-semibold text-heading";

export const chatBubbleMetaClassName = "text-sm text-body";

/** The "more" button next to the bubble. */
export const chatBubbleActionClassName = [
  "box-border inline-flex shrink-0 cursor-pointer items-center self-center rounded-base border border-transparent bg-neutral-primary p-1.5 text-body",
  "hover:bg-neutral-tertiary hover:text-heading focus:ring-4 focus:ring-neutral-tertiary",
  focusOutline,
  "[&_svg]:size-6",
].join(" ");

/**
 * The dots dropdown under the "more" button: the `Dropdown` panel and items, narrowed to `w-40`
 * with `rounded-md` items.
 */
export const chatBubbleMenuClassName = "w-40";

export const chatBubbleMenuItemClassName = "rounded-md";

export type ChatBubbleVariantProps = VariantProps<typeof chatBubbleBodyVariants>;
