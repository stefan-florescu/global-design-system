/*
 * Places a floating panel (a popover or a tooltip) next to its trigger, in the top layer, and
 * points its arrow at the trigger. Shared by Popover and Tooltip; the side and alignment logic
 * itself is the dropdown's `computeDropdownPosition`.
 */

import {
  computeDropdownPosition,
  type DropdownPlacement,
  type DropdownSide,
} from "../dropdown/dropdown-position";

/** A side of the trigger, optionally aligned to its `start` or `end` edge, or `auto`. */
export type AnchoredPlacement = DropdownPlacement | "auto";

type Size = { width: number; height: number };
type Rect = Pick<DOMRect, "top" | "right" | "bottom" | "left" | "width" | "height">;

/** `auto`: the side of the trigger with the most room left around the panel. */
export function autoSide(anchor: Rect, panel: Size, offset: number, viewport: Size): DropdownSide {
  const room: Record<DropdownSide, number> = {
    top: anchor.top - panel.height - offset,
    bottom: viewport.height - anchor.bottom - panel.height - offset,
    right: viewport.width - anchor.right - panel.width - offset,
    left: anchor.left - panel.width - offset,
  };
  return (Object.keys(room) as DropdownSide[]).reduce((best, side) =>
    room[side] > room[best] ? side : best,
  );
}

export type AnchoredPanelOptions = {
  placement: AnchoredPlacement;
  /** Gap between trigger and panel, in px. */
  offset: number;
  /** The arrow element, if any: it is moved along the panel edge to point at the trigger. */
  arrow?: HTMLElement | null;
  /** Half the arrow's size, in px. */
  arrowHalf: number;
  /** How far the arrow stays from the panel's rounded corners, in px. */
  arrowPadding: number;
};

/**
 * Moves a `position: fixed` panel next to `anchor` (flipping it when there is no room) and points
 * the arrow at the middle of the anchor, clear of the rounded corners. Returns the side the panel
 * ended up on.
 */
export function placeAnchoredPanel(
  panel: HTMLElement,
  anchor: HTMLElement,
  { placement, offset, arrow, arrowHalf, arrowPadding }: AnchoredPanelOptions,
): DropdownSide {
  const rect = anchor.getBoundingClientRect();
  const size = { width: panel.offsetWidth, height: panel.offsetHeight };
  const viewport = { width: document.documentElement.clientWidth, height: window.innerHeight };
  const position = computeDropdownPosition(rect, size, {
    placement: placement === "auto" ? autoSide(rect, size, offset, viewport) : placement,
    offset,
    skidding: 0,
    rtl: getComputedStyle(anchor).direction === "rtl",
    viewport,
  });
  panel.style.left = `${position.x}px`;
  panel.style.top = `${position.y}px`;

  if (arrow) {
    const vertical = position.side === "top" || position.side === "bottom";
    const start = vertical
      ? rect.left + rect.width / 2 - position.x - panel.clientLeft
      : rect.top + rect.height / 2 - position.y - panel.clientTop;
    const length = vertical ? panel.clientWidth : panel.clientHeight;
    const at = Math.max(
      Math.min(start - arrowHalf, length - arrowPadding - arrowHalf * 2),
      Math.min(arrowPadding, length / 2 - arrowHalf),
    );
    arrow.style.left = vertical ? `${at}px` : "";
    arrow.style.top = vertical ? "" : `${at}px`;
  }
  return position.side;
}

/**
 * Calls `update` on the next frame whenever the page scrolls, the window resizes, or the panel or
 * its anchor changes size. Returns a function that stops it.
 */
export function trackAnchoredPanel(
  panel: HTMLElement,
  anchor: HTMLElement | null,
  update: () => void,
): () => void {
  let frame = 0;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, true);
  window.addEventListener("resize", schedule);
  const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
  observer?.observe(panel);
  if (anchor) observer?.observe(anchor);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule, true);
    window.removeEventListener("resize", schedule);
    observer?.disconnect();
  };
}
