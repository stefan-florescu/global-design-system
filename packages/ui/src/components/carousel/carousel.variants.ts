/*
 * Flowbite's carousel on semantic tokens. Controls and indicators sit on the slides, so they
 * use a translucent `background` disc with `foreground` icons, which stays legible on light
 * and dark images in both themes.
 */
export const carouselClassName = "relative w-full overflow-hidden rounded-lg";

export const carouselTrackClassName =
  "flex transition-transform ease-out motion-reduce:transition-none";

export const carouselSlideClassName = "w-full shrink-0";

export const carouselControlClassName = [
  "inline-flex size-10 cursor-pointer items-center justify-center rounded-full",
  "bg-background/60 text-foreground shadow-sm transition-colors hover:bg-background/90 motion-reduce:transition-none",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
  "[&_svg]:size-5",
].join(" ");

export const carouselIndicatorClassName = [
  "group inline-flex size-6 cursor-pointer items-center justify-center rounded-full",
  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
].join(" ");

export const carouselDotClassName = [
  "size-3 rounded-full bg-background/60 shadow-sm transition-colors motion-reduce:transition-none",
  "group-hover:bg-background group-aria-[current=true]:bg-background",
].join(" ");
