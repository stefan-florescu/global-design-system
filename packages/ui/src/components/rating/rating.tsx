import { Star } from "@stefan-florescu/icons";
import type { ComponentProps } from "react";

import { cn } from "../../lib/cn";

import { ratingStarVariants, ratingVariants, type RatingVariantProps } from "./rating.variants";

export type RatingProps = Omit<ComponentProps<"div">, "children"> &
  RatingVariantProps & {
    /** The score, from 0 to `max`. A star fills for each whole point: 4.95 fills four. */
    value: number;
    /** Number of stars. */
    max?: number;
    /**
     * Text alternative of the stars. Defaults to "Rated {value} out of {max}". When visible text
     * next to the stars already states the score, pass `aria-hidden` instead.
     */
    label?: string;
  };

/**
 * A static star rating. Renders an image (`role="img"`) named "Rated 4 out of 5"; the stars
 * themselves are hidden from assistive technology.
 */
export function Rating({ value, max = 5, size, label, className, ...props }: RatingProps) {
  const count = Math.max(0, Math.floor(max));
  const filled = Math.min(count, Math.max(0, Math.floor(value)));
  return (
    <div
      role="img"
      aria-label={label ?? `Rated ${value} out of ${count}`}
      data-slot="rating"
      className={cn(ratingVariants({ size }), className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          data-filled={index < filled || undefined}
          className={ratingStarVariants({ filled: index < filled })}
        />
      ))}
    </div>
  );
}
