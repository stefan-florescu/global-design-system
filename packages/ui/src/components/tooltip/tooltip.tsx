"use client";

import {
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/cn";
import { hidePopover, showPopover } from "../dropdown/dropdown-popover";
import type { DropdownSide } from "../dropdown/dropdown-position";
import { mergeRefs, Slot } from "../dropdown/dropdown-slot";
import {
  placeAnchoredPanel,
  trackAnchoredPanel,
  type AnchoredPlacement,
} from "../popover/popover-position";

import {
  tooltipArrowVariants,
  tooltipVariants,
  type TooltipVariantProps,
} from "./tooltip.variants";

/** A side of the trigger, optionally aligned to its `start` or `end` edge, or `auto`. */
export type TooltipPlacement = AnchoredPlacement;

/** What shows the tooltip: hovering or focusing the trigger, or clicking it. */
export type TooltipTrigger = "hover" | "click";

/**
 * How the tooltip relates to its trigger: `description` adds to the trigger's own name
 * (`aria-describedby`); `label` is the trigger's name (`aria-labelledby`), for icon-only controls.
 */
export type TooltipMode = "description" | "label";

/** How long a hover tooltip waits before closing, so the pointer can move onto it. */
const HOVER_CLOSE_DELAY = 100;
/** Half the arrow's size, and how far it stays from the tooltip's rounded corners, in px. */
const ARROW_HALF = 4;
const ARROW_PADDING = 8;

export type TooltipProps = Omit<
  ComponentProps<"div">,
  "content" | "role" | "popover" | "children"
> &
  TooltipVariantProps & {
    /** What the tooltip shows: short text. Never put links, buttons or other controls in it. */
    content: ReactNode;
    /**
     * The trigger: one focusable element, such as a `Button` or a link. Its props, handlers and
     * `ref` are kept.
     */
    children: ReactElement;
    /**
     * Side of the trigger the tooltip opens on, optionally aligned to its `start` or `end` edge.
     * It flips to the other side when there is no room. `auto` picks the side with the most room.
     */
    placement?: TooltipPlacement;
    /**
     * `hover` shows it while the pointer rests on the trigger or the tooltip, or while the trigger
     * has keyboard focus. `click` shows and hides it with a click (or Enter / Space on a button).
     */
    trigger?: TooltipTrigger;
    /**
     * `description` (the default) describes a trigger that already has a name. `label` makes the
     * tooltip the trigger's name, for icon-only buttons whose tooltip says what they are.
     */
    mode?: TooltipMode;
    /** Show the arrow pointing at the trigger. */
    arrow?: boolean;
    /** The fade's duration as a Tailwind `duration-*` class, or `false` to show it at once. */
    animation?: false | `duration-${number}`;
    /** Distance between trigger and tooltip, in px. */
    offset?: number;
    /** How long the pointer must rest on the trigger before a hover tooltip shows, in ms. */
    delay?: number;
    /** Whether the tooltip is shown (controlled). */
    open?: boolean;
    /** Whether the tooltip is shown on first render (uncontrolled). */
    defaultOpen?: boolean;
    /** Called when the tooltip shows or hides. */
    onOpenChange?: (open: boolean) => void;
  };

/**
 * A short text that describes (or names) the element it wraps, shown on hover and keyboard focus
 * or on click (WAI-ARIA tooltip pattern). It opens in the top layer, so no
 * `overflow: hidden` clips it; Escape hides it without moving focus, and it stays open while the
 * pointer moves onto it. `className` and other `div` props go to the tooltip.
 */
export function Tooltip({
  content,
  children,
  placement = "top",
  trigger = "hover",
  variant = "dark",
  mode = "description",
  arrow = true,
  animation = "duration-300",
  offset = 8,
  delay = 0,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  id: idProp,
  className,
  ref,
  onPointerEnter,
  onPointerLeave,
  ...props
}: TooltipProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = openProp ?? internal;
  const isHover = trigger === "hover";

  const reactId = useId();
  const tooltipId = idProp ?? `${reactId}-tooltip`;
  const child = isValidElement(children)
    ? (children as ReactElement<Record<string, unknown>>)
    : null;

  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const openRef = useRef(open);
  /* Pointer over the trigger or tooltip, keyboard focus on the trigger, a press in progress. */
  const stateRef = useRef({
    pointer: false,
    focus: false,
    pressed: false,
    timer: undefined as ReturnType<typeof setTimeout> | undefined,
  });

  const [side, setSide] = useState<DropdownSide>();
  /* Where the tooltip is rendered, found after mount (see below). */
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    openRef.current = open;
  }, [open]);

  // The tooltip is rendered at the end of the page, so it never changes the trigger's
  // surroundings (a button group's first and last child, a list's items). Inside a modal dialog it
  // goes at the end of the dialog, which keeps it out of the inert page; inside a themed region it
  // goes at the end of that region, which keeps its colours.
  useLayoutEffect(() => {
    setContainer(
      triggerRef.current?.closest<HTMLElement>("dialog, [data-theme]:not(:root)") ?? document.body,
    );
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      if (next === openRef.current) return;
      openRef.current = next;
      if (openProp === undefined) setInternal(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const hide = useCallback(() => {
    clearTimeout(stateRef.current.timer);
    setOpen(false);
  }, [setOpen]);

  const show = useCallback(
    (wait: number) => {
      const state = stateRef.current;
      clearTimeout(state.timer);
      if (wait > 0 && !openRef.current) state.timer = setTimeout(() => setOpen(true), wait);
      else setOpen(true);
    },
    [setOpen],
  );

  /** Hides a hover tooltip once neither the pointer nor focus is on the trigger or tooltip. */
  const scheduleHide = useCallback(() => {
    const state = stateRef.current;
    clearTimeout(state.timer);
    state.timer = setTimeout(() => {
      if (!state.pointer && !state.focus) setOpen(false);
    }, HOVER_CLOSE_DELAY);
  }, [setOpen]);

  useEffect(() => {
    const state = stateRef.current;
    return () => clearTimeout(state.timer);
  }, []);

  // While shown: Escape hides it, wherever focus is, without moving focus; it is handled first
  // (and marked handled) so the same press doesn't also close a dialog or menu around it. A press
  // outside hides a click tooltip.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      hide();
    };
    const onPointerDown = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Node &&
        (triggerRef.current?.contains(target) || panelRef.current?.contains(target))
      ) {
        return;
      }
      if (!isHover) hide();
    };
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, isHover, hide]);

  // Show the tooltip in the top layer, next to the trigger, and keep it there.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!open) {
      hidePopover(panel);
      return;
    }
    showPopover(panel);

    const update = () => {
      const anchor = triggerRef.current;
      if (!anchor) return;
      // Measure at the viewport's corner, so the text wraps only when the viewport is too narrow.
      panel.style.left = "0px";
      panel.style.top = "0px";
      setSide(
        placeAnchoredPanel(panel, anchor, {
          placement,
          offset,
          arrow: arrowRef.current,
          arrowHalf: ARROW_HALF,
          arrowPadding: ARROW_PADDING,
        }),
      );
    };
    update();
    return trackAnchoredPanel(panel, triggerRef.current, update);
  }, [open, placement, offset, arrow, container]);

  /* ---------------------------------------------------------------------------------------- */
  /* Trigger                                                                                   */
  /* ---------------------------------------------------------------------------------------- */

  const describedBy = child?.props["aria-describedby"] as string | undefined;
  const ownLabel = child?.props["aria-label"] as string | undefined;
  // The tooltip exists from the first client render on, so the trigger only points at it then.
  const aria =
    mode === "label"
      ? {
          "aria-labelledby": container ? tooltipId : undefined,
          // A text tooltip also names the trigger before the page is interactive.
          "aria-label": ownLabel ?? (typeof content === "string" ? content : undefined),
        }
      : {
          "aria-describedby":
            [describedBy, container ? tooltipId : undefined].filter(Boolean).join(" ") || undefined,
        };

  const triggerProps = {
    ...aria,
    onPointerEnter: (event: PointerEvent) => {
      if (!isHover || event.pointerType === "touch") return;
      stateRef.current.pointer = true;
      show(delay);
    },
    onPointerLeave: (event: PointerEvent) => {
      if (!isHover || event.pointerType === "touch") return;
      stateRef.current.pointer = false;
      scheduleHide();
    },
    onPointerDown: () => {
      const state = stateRef.current;
      state.pressed = true;
      setTimeout(() => {
        state.pressed = false;
      });
    },
    /* Keyboard focus shows a hover tooltip; focus that follows a click or a tap does not. */
    onFocus: () => {
      const state = stateRef.current;
      if (!isHover || state.pressed) return;
      state.focus = true;
      show(0);
    },
    onBlur: () => {
      stateRef.current.focus = false;
      if (isHover) scheduleHide();
      else hide();
    },
    onClick: () => {
      if (isHover) return;
      if (openRef.current) hide();
      else show(0);
    },
  };

  const setTriggerRef = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  const tooltip = (
    <div
      {...props}
      role="tooltip"
      id={tooltipId}
      ref={mergeRefs<HTMLDivElement>(panelRef, ref)}
      hidden={!open}
      data-state={open ? "open" : "closed"}
      data-side={side}
      data-slot="tooltip"
      className={cn(
        tooltipVariants({ variant }),
        animation === false ? "transition-none" : animation,
        className,
      )}
      // Hoverable (WCAG 1.4.13): the pointer can move onto the tooltip without hiding it.
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (!isHover || event.pointerType === "touch") return;
        stateRef.current.pointer = true;
        clearTimeout(stateRef.current.timer);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (!isHover || event.pointerType === "touch") return;
        stateRef.current.pointer = false;
        scheduleHide();
      }}
    >
      {content}
      {arrow ? (
        <span
          ref={arrowRef}
          aria-hidden
          data-slot="tooltip-arrow"
          className={tooltipArrowVariants({ side, variant })}
        />
      ) : null}
    </div>
  );

  return (
    <>
      <Slot {...triggerProps} ref={setTriggerRef}>
        {children}
      </Slot>
      {container ? createPortal(tooltip, container) : null}
    </>
  );
}
