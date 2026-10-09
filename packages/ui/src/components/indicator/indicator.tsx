import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  indicatorPlacementVariants,
  indicatorVariants,
  type IndicatorVariantProps,
} from "./indicator.variants";

export type IndicatorProps = Omit<ComponentProps<"span">, "children"> &
  IndicatorVariantProps & {
    /** A number shown inside the indicator, such as unread messages. */
    count?: number | string;
    /** Show `max+` when a numeric `count` is larger, for example "99+". */
    max?: number;
    /**
     * Text alternative read by screen readers instead of the visible dot or count, such as
     * "Online" or "8 unread messages". Without it, a dot is hidden from assistive technology.
     */
    label?: string;
    /** An icon (mark it `aria-hidden`) shown inside the indicator instead of a count. */
    children?: ReactNode;
  };

/**
 * A small dot, count or icon that shows status or new activity. Set `placement` to pin it to an
 * edge or corner of a `relative` parent; leave it out to show it inline, as in a legend.
 */
export function Indicator({
  variant,
  size,
  placement,
  bordered,
  count,
  max,
  label,
  className,
  children,
  ...props
}: IndicatorProps) {
  const shown =
    count === undefined
      ? children
      : typeof count === "number" && max !== undefined && count > max
        ? `${max}+`
        : count;
  const hasContent = shown !== undefined && shown !== null && shown !== false && shown !== "";
  const decorative = !label && count === undefined;

  return (
    <span
      data-slot="indicator"
      aria-hidden={decorative || undefined}
      className={cn(
        indicatorVariants({
          variant,
          size,
          bordered,
          content: count !== undefined ? "count" : hasContent ? "icon" : "dot",
        }),
        placement && indicatorPlacementVariants({ placement }),
        className,
      )}
      {...props}
    >
      {label ? (
        <>
          {hasContent ? <span aria-hidden>{shown}</span> : null}
          <span className="sr-only">{label}</span>
        </>
      ) : (
        shown
      )}
    </span>
  );
}
