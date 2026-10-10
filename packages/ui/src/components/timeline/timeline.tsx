import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  timelineBodyClassName,
  timelineConnectorClassName,
  timelineContentClassName,
  timelineItemClassName,
  timelinePointVariants,
  timelinePointWrapperClassName,
  timelineTimeClassName,
  timelineTitleClassName,
  timelineVariants,
  type TimelineVariantProps,
} from "./timeline.variants";

export type TimelineProps = ComponentProps<"ol"> & TimelineVariantProps;

/**
 * Events in date order, as an ordered list (`<ol>`). Vertical by default, with the line on the
 * start side; `horizontal` lays the events out in a row from `sm` up (Flowbite's "Stepper
 * timeline"). Fill it with `TimelineItem`s.
 */
export function Timeline({ horizontal = false, className, ...props }: TimelineProps) {
  return (
    <ol
      data-slot="timeline"
      data-horizontal={horizontal ? "" : undefined}
      className={cn(timelineVariants({ horizontal }), className)}
      {...props}
    />
  );
}

/** One event (`<li>`): a `TimelinePoint` followed by `TimelineContent`. */
export function TimelineItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li data-slot="timeline-item" className={cn(timelineItemClassName, className)} {...props} />
  );
}

export type TimelinePointProps = ComponentProps<"span"> & {
  /**
   * Icon shown in a 24px brand circle. Decorative: it is hidden from assistive technology.
   * Without `icon` or `children`, the point is a 12px dot.
   */
  icon?: ReactNode;
};

/**
 * The marker on the line: a dot, an `icon` in a circle, or your own content (`children`), such as
 * an `Avatar`, in a 24px circle. `className` and other props go to the marker.
 */
export function TimelinePoint({ icon, className, children, ...props }: TimelinePointProps) {
  const marker = children ? "custom" : icon ? "icon" : "dot";

  return (
    <div data-slot="timeline-point" data-marker={marker} className={timelinePointWrapperClassName}>
      <span
        aria-hidden={marker === "custom" ? undefined : true}
        data-slot="timeline-marker"
        className={cn(timelinePointVariants({ marker }), className)}
        {...props}
      >
        {children ?? icon}
      </span>
      <div aria-hidden data-slot="timeline-connector" className={timelineConnectorClassName} />
    </div>
  );
}

/** The text and actions of an event, after its point. */
export function TimelineContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn(timelineContentClassName, className)}
      {...props}
    />
  );
}

/**
 * When the event happened, as a `<time>`. Pass a machine-readable `dateTime`, such as
 * `"2025-03-13"`. Put a `Badge` inside to show the date as a tag.
 */
export function TimelineTime({ className, ...props }: ComponentProps<"time">) {
  return (
    <time data-slot="timeline-time" className={cn(timelineTimeClassName, className)} {...props} />
  );
}

export type TimelineTitleProps = ComponentProps<"h3"> & {
  /** Heading level. Match the page outline: one level below the heading the timeline sits under. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/** The event's heading. An `h3` by default. */
export function TimelineTitle({ headingLevel = 3, className, ...props }: TimelineTitleProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <Heading
      data-slot="timeline-title"
      className={cn(timelineTitleClassName, className)}
      {...props}
    />
  );
}

/** The event's description. */
export function TimelineBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="timeline-body" className={cn(timelineBodyClassName, className)} {...props} />
  );
}
