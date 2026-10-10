"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { tableScrollAreaClassName } from "./table.variants";

type ScrollState = {
  overflowing: boolean;
  labelledBy?: string;
  label?: string;
};

/** The name of the scroller: the caption's title, else the table's own label. */
function readName(area: HTMLElement): Pick<ScrollState, "labelledBy" | "label"> {
  const table = area.querySelector(":scope > table");
  const title = table?.querySelector(":scope > caption [data-slot='table-caption-title']");
  if (title?.id) return { labelledBy: title.id };
  const caption = table?.querySelector(":scope > caption");
  if (caption?.id) return { labelledBy: caption.id };
  const labelledBy = table?.getAttribute("aria-labelledby");
  if (labelledBy) return { labelledBy };
  const label = table?.getAttribute("aria-label");
  return label ? { label } : {};
}

/**
 * Scrolls a wide table sideways. When the table is wider than the space (WCAG 1.4.10), the
 * scroller joins the tab order so keyboard users can scroll it with the arrow keys (WCAG 2.1.1),
 * and becomes a region named by the caption. Without JavaScript it stays a plain scroller, which
 * current browsers already make focusable.
 */
export function TableScrollArea({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ScrollState>({ overflowing: false });

  useEffect(() => {
    const area = ref.current;
    if (!area) return;
    const update = () => {
      const next = { overflowing: area.scrollWidth > area.clientWidth + 1, ...readName(area) };
      setState((previous) =>
        previous.overflowing === next.overflowing &&
        previous.labelledBy === next.labelledBy &&
        previous.label === next.label
          ? previous
          : next,
      );
    };
    update();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(area);
    const table = area.querySelector(":scope > table");
    if (table) observer?.observe(table);
    return () => observer?.disconnect();
  }, []);

  const named = Boolean(state.labelledBy || state.label);

  return (
    <div
      ref={ref}
      data-slot="table-scroll-area"
      className={tableScrollAreaClassName}
      // A scroller is not interactive by role, but it must take focus to be scrolled by keyboard.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={state.overflowing ? 0 : undefined}
      role={state.overflowing && named ? "region" : undefined}
      aria-labelledby={state.overflowing ? state.labelledBy : undefined}
      aria-label={state.overflowing && !state.labelledBy ? state.label : undefined}
    >
      {children}
    </div>
  );
}
