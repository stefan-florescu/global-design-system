import { cva, type VariantProps } from "class-variance-authority";

import { focusOutline } from "../../lib/focus";

/*
 * Carousel: a `h-56 md:h-96` slide window with `rounded-base` corners, 40px translucent control
 * squares at the sides and 12px indicators centred at the bottom. The control and indicator
 * surfaces are `neutral-primary-medium`, on the `z.raised` layer.
 * Accessibility:
 * - control icons are `heading` rather than white: a white icon on a 30% white square falls
 *   under 3:1 on light images in the light theme (in dark mode the icon is white);
 * - controls and indicators draw the solid keyboard outline from lib/focus.
 */
export const carouselClassName = "relative w-full";

export const carouselViewportClassName = "relative h-56 overflow-hidden rounded-base md:h-96";

export const carouselTrackVariants = cva(
  "flex h-full transition-transform motion-reduce:transition-none",
  {
    variants: {
      transition: {
        /** The default slide: 700ms, ease-in-out. */
        default: "duration-700 ease-in-out",
        /** A faster slide: 200ms, linear. */
        fast: "duration-200 ease-linear",
      },
    },
    defaultVariants: { transition: "default" },
  },
);

export const carouselSlideClassName = "relative h-full w-full shrink-0";

/** The full-height hit area at each side. */
export const carouselControlClassName =
  "group absolute top-0 z-raised flex h-full cursor-pointer items-center justify-center px-4 outline-hidden";

/** The visible square inside a control. */
export const carouselControlIconClassName = [
  "inline-flex size-10 items-center justify-center rounded-base bg-neutral-primary-medium/30 text-heading",
  "group-hover:bg-neutral-primary-medium/50 group-focus:ring-4 group-focus:ring-neutral-primary-medium",
  "group-focus-visible:outline-2 group-focus-visible:outline-solid group-focus-visible:outline-offset-2 group-focus-visible:outline-ring",
  "[&_svg]:size-5",
].join(" ");

export const carouselIndicatorsClassName =
  "absolute bottom-5 left-1/2 z-raised flex -translate-x-1/2 space-x-3 rtl:space-x-reverse";

export const carouselIndicatorClassName = [
  "size-3 cursor-pointer rounded-base bg-neutral-primary-medium/50 hover:bg-neutral-primary-medium",
  "aria-[current=true]:bg-neutral-primary-medium",
  focusOutline,
].join(" ");

export type CarouselVariantProps = VariantProps<typeof carouselTrackVariants>;
