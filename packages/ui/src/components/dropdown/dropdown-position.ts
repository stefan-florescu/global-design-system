/*
 * Places a dropdown panel next to its trigger (Flowbite's Popper placements), in viewport
 * coordinates for a `position: fixed` / top-layer panel.
 */

export type DropdownSide = "top" | "right" | "bottom" | "left";
export type DropdownAlign = "start" | "end";
/** Side of the trigger, optionally aligned to its start or end edge. */
export type DropdownPlacement = DropdownSide | `${DropdownSide}-${DropdownAlign}`;

type Rect = Pick<DOMRect, "top" | "right" | "bottom" | "left" | "width" | "height">;

export type DropdownPositionOptions = {
  placement: DropdownPlacement;
  /** Gap between trigger and panel, in px (Flowbite's offset distance). */
  offset: number;
  /** Shift along the trigger, in px (Flowbite's offset skidding): right or down when positive. */
  skidding: number;
  /** Right-to-left: `start` / `end` follow the reading direction. */
  rtl: boolean;
  /** Mirror `left` / `right` in right-to-left layouts (used by sub-menus). */
  mirrorSides?: boolean;
  viewport: { width: number; height: number };
};

/** Keep this far from the viewport edges, in px. */
const EDGE = 8;

const OPPOSITE: Record<DropdownSide, DropdownSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

function place(
  side: DropdownSide,
  align: DropdownAlign | undefined,
  anchor: Rect,
  panel: { width: number; height: number },
  { offset, skidding, rtl }: DropdownPositionOptions,
) {
  if (side === "top" || side === "bottom") {
    const edge = rtl && align ? (align === "start" ? "end" : "start") : align;
    const x =
      edge === "start"
        ? anchor.left
        : edge === "end"
          ? anchor.right - panel.width
          : anchor.left + (anchor.width - panel.width) / 2;
    const y = side === "bottom" ? anchor.bottom + offset : anchor.top - offset - panel.height;
    return { x: x + skidding, y };
  }
  const y =
    align === "start"
      ? anchor.top
      : align === "end"
        ? anchor.bottom - panel.height
        : anchor.top + (anchor.height - panel.height) / 2;
  const x = side === "right" ? anchor.right + offset : anchor.left - offset - panel.width;
  return { x, y: y + skidding };
}

/** Space left between the trigger and the viewport edge on `side`. */
function room(side: DropdownSide, anchor: Rect, viewport: { width: number; height: number }) {
  if (side === "top") return anchor.top;
  if (side === "bottom") return viewport.height - anchor.bottom;
  if (side === "left") return anchor.left;
  return viewport.width - anchor.right;
}

function clamp(value: number, size: number, limit: number) {
  if (size + EDGE * 2 > limit) return EDGE;
  return Math.min(Math.max(value, EDGE), limit - size - EDGE);
}

/**
 * Where to put the panel. It flips to the opposite side when it does not fit and that side has
 * more room, and slides along the trigger to stay inside the viewport.
 */
export function computeDropdownPosition(
  anchor: Rect,
  panel: { width: number; height: number },
  options: DropdownPositionOptions,
): { x: number; y: number; side: DropdownSide } {
  const [rawSide, align] = options.placement.split("-") as [DropdownSide, DropdownAlign?];
  let side: DropdownSide =
    options.rtl && options.mirrorSides && (rawSide === "left" || rawSide === "right")
      ? OPPOSITE[rawSide]
      : rawSide;

  const vertical = side === "top" || side === "bottom";
  const needed = (vertical ? panel.height : panel.width) + options.offset + EDGE;
  if (
    room(side, anchor, options.viewport) < needed &&
    room(OPPOSITE[side], anchor, options.viewport) > room(side, anchor, options.viewport)
  ) {
    side = OPPOSITE[side];
  }

  const { x, y } = place(side, align, anchor, panel, options);
  return vertical
    ? { x: clamp(x, panel.width, options.viewport.width), y, side }
    : { x, y: clamp(y, panel.height, options.viewport.height), side };
}
