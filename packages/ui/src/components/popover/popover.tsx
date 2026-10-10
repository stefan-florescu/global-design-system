"use client";

import {
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { focusPanel } from "../dropdown/dropdown-context";
import { hidePopover, showPopover } from "../dropdown/dropdown-popover";
import type { DropdownSide } from "../dropdown/dropdown-position";
import { mergeRefs, Slot } from "../dropdown/dropdown-slot";

import {
  popoverArrowVariants,
  popoverBodyClassName,
  popoverHeaderClassName,
  popoverPanelClassName,
  popoverTitleClassName,
} from "./popover.variants";
import { placeAnchoredPanel, trackAnchoredPanel, type AnchoredPlacement } from "./popover-position";

/** A side of the trigger, optionally aligned to its `start` or `end` edge, or `auto`. */
export type PopoverPlacement = AnchoredPlacement;

/** What opens the popover: a click (or Enter / Space), or hovering or focusing the trigger. */
export type PopoverTrigger = "click" | "hover";

/** How long a hover popover waits before closing, so the pointer can cross the gap. */
const HOVER_CLOSE_DELAY = 100;
/** Half the arrow's size, and how far it stays from the panel's rounded corners, in px. */
const ARROW_HALF = 4;
const ARROW_PADDING = 12;

type PopoverContextValue = {
  /** Called by `PopoverTitle`: the first title names the panel. Returns an unregister function. */
  registerTitle: (id: string) => () => void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

export type PopoverProps = Omit<ComponentProps<"div">, "content" | "role" | "popover"> & {
  /** What the popover shows: rich content such as text, links, images or buttons. */
  content: ReactNode;
  /**
   * The trigger: one focusable element, such as a `Button`, a link or a text field. Its props,
   * handlers and `ref` are kept.
   */
  children: ReactElement;
  /**
   * `click` opens and closes it with a click, Enter or Space. `hover` opens it while the pointer
   * rests on the trigger or the panel, or while the trigger has keyboard focus; a click or a tap
   * opens it too and keeps it open.
   */
  trigger?: PopoverTrigger;
  /**
   * Side of the trigger the panel opens on, optionally aligned to its `start` or `end` edge. It
   * flips to the other side when there is no room. `auto` picks the side with the most room.
   */
  placement?: PopoverPlacement;
  /** Distance between trigger and panel, in px (Flowbite's `data-popover-offset`). */
  offset?: number;
  /** Show the arrow pointing at the trigger. */
  arrow?: boolean;
  /** Whether the popover is open (controlled). */
  open?: boolean;
  /** Whether the popover is open on first render (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the popover opens or closes. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Shows rich content in a box next to a trigger, on click or on hover (Flowbite's popover): a
 * non-modal dialog in the top layer, named by its `PopoverTitle`. It renders right after the
 * trigger, so Tab moves from the trigger into its content. Escape, a click outside or moving focus
 * away closes it. `className` and other `div` props go to the panel.
 */
export function Popover({
  content,
  children,
  trigger = "click",
  placement = "top",
  offset = 10,
  arrow = true,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  id: idProp,
  className,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: PopoverProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = openProp ?? internal;
  const isHover = trigger === "hover";

  const reactId = useId();
  const panelId = idProp ?? `${reactId}-popover`;
  const child = isValidElement(children)
    ? (children as ReactElement<Record<string, unknown>>)
    : null;
  const triggerId = (child?.props.id as string | undefined) ?? `${reactId}-trigger`;

  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);
  const openRef = useRef(open);
  const focusOnOpenRef = useRef(false);
  /* Hover state: pointer over the trigger or panel, focus in them, pinned open by a click. */
  const hoverRef = useRef({
    pointer: false,
    focus: false,
    pinned: false,
    /** Focus that follows a press (a click or a tap) does not open it; keyboard focus does. */
    pressed: false,
    suppressFocus: false,
    timer: undefined as ReturnType<typeof setTimeout> | undefined,
  });

  const [side, setSide] = useState<DropdownSide>();
  const [titleId, setTitleId] = useState<string>();

  useLayoutEffect(() => {
    openRef.current = open;
  }, [open]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!next) hoverRef.current.pinned = false;
      if (next === openRef.current) return;
      openRef.current = next;
      if (openProp === undefined) setInternal(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  /** Closes; `trigger` moves focus back to the trigger, `auto` only if focus was in the panel. */
  const close = useCallback(
    (focus: "trigger" | "auto" | "keep") => {
      const hover = hoverRef.current;
      clearTimeout(hover.timer);
      if (!openRef.current) return;
      const focusInside = Boolean(panelRef.current?.contains(document.activeElement));
      if (focus === "trigger" || (focus === "auto" && focusInside)) {
        hover.suppressFocus = true;
        triggerRef.current?.focus();
        hover.suppressFocus = false;
      }
      setOpen(false);
    },
    [setOpen],
  );

  const scheduleHoverClose = useCallback(() => {
    const hover = hoverRef.current;
    clearTimeout(hover.timer);
    hover.timer = setTimeout(() => {
      if (!hover.pointer && !hover.focus && !hover.pinned) close("auto");
    }, HOVER_CLOSE_DELAY);
  }, [close]);

  useEffect(() => {
    const hover = hoverRef.current;
    return () => clearTimeout(hover.timer);
  }, []);

  const handleEscape = useCallback(
    (
      event: Pick<Event, "defaultPrevented" | "preventDefault" | "stopPropagation"> & {
        key: string;
      },
    ) => {
      if (event.key !== "Escape" || event.defaultPrevented || !openRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      close("trigger");
    },
    [close],
  );

  // While open: a press outside closes it, and so does focus moving outside a click popover.
  useEffect(() => {
    if (!open) return;
    const inside = (target: EventTarget | null) =>
      target instanceof Node &&
      Boolean(triggerRef.current?.contains(target) || panelRef.current?.contains(target));
    const onPointerDown = (event: Event) => {
      if (!inside(event.target)) close("keep");
    };
    const onFocusIn = (event: Event) => {
      if (inside(event.target)) return;
      if (isHover) {
        hoverRef.current.focus = false;
        hoverRef.current.pinned = false;
        scheduleHoverClose();
      } else {
        close("keep");
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open, isHover, close, scheduleHoverClose]);

  // Show the panel in the top layer, next to the trigger, and keep it there.
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
    if (focusOnOpenRef.current) {
      focusOnOpenRef.current = false;
      focusPanel(panel, "first");
    }
    return trackAnchoredPanel(panel, triggerRef.current, update);
  }, [open, placement, offset, arrow]);

  // The panel: Escape closes it (unless a control inside, such as a menu, handled it first), and
  // a hover popover stays open while the pointer or focus is in it.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const hover = hoverRef.current;
    const inside = (node: EventTarget | null) =>
      node instanceof Node && Boolean(triggerRef.current?.contains(node) || panel.contains(node));

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!panel.contains(event.target as Node | null)) return;
      handleEscape(event);
    };
    const onPointerEnter = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      hover.pointer = true;
      clearTimeout(hover.timer);
    };
    const onPointerLeave = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      hover.pointer = false;
      scheduleHoverClose();
    };
    const onFocusIn = () => {
      hover.focus = true;
      clearTimeout(hover.timer);
    };
    const onFocusOut = (event: globalThis.FocusEvent) => {
      if (inside(event.relatedTarget)) return;
      hover.focus = false;
      hover.pinned = false;
      scheduleHoverClose();
    };

    document.addEventListener("keydown", onKeyDown);
    if (isHover) {
      panel.addEventListener("pointerenter", onPointerEnter);
      panel.addEventListener("pointerleave", onPointerLeave);
      panel.addEventListener("focusin", onFocusIn);
      panel.addEventListener("focusout", onFocusOut);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      panel.removeEventListener("pointerenter", onPointerEnter);
      panel.removeEventListener("pointerleave", onPointerLeave);
      panel.removeEventListener("focusin", onFocusIn);
      panel.removeEventListener("focusout", onFocusOut);
    };
  }, [isHover, handleEscape, scheduleHoverClose]);

  /* ---------------------------------------------------------------------------------------- */
  /* Trigger                                                                                   */
  /* ---------------------------------------------------------------------------------------- */

  const describedBy = child?.props["aria-describedby"] as string | undefined;
  const triggerProps = {
    id: triggerId,
    "data-state": open ? "open" : "closed",
    onKeyDown: handleEscape,
    onClick: () => {
      if (isHover) {
        // A click or a tap opens a hover popover and keeps it open.
        clearTimeout(hoverRef.current.timer);
        hoverRef.current.pinned = true;
        setOpen(true);
      } else if (openRef.current) {
        close("trigger");
      } else {
        // A non-modal dialog: focus moves to its first control, or to the panel itself.
        focusOnOpenRef.current = true;
        setOpen(true);
      }
    },
    ...(isHover
      ? {
          "aria-describedby": [describedBy, panelId].filter(Boolean).join(" "),
          onPointerEnter: (event: { pointerType: string }) => {
            if (event.pointerType === "touch") return;
            const hover = hoverRef.current;
            hover.pointer = true;
            clearTimeout(hover.timer);
            setOpen(true);
          },
          onPointerLeave: (event: { pointerType: string }) => {
            if (event.pointerType === "touch") return;
            hoverRef.current.pointer = false;
            scheduleHoverClose();
          },
          onPointerDown: () => {
            const hover = hoverRef.current;
            hover.pressed = true;
            setTimeout(() => {
              hover.pressed = false;
            });
          },
          onFocus: () => {
            const hover = hoverRef.current;
            if (hover.suppressFocus || hover.pressed) return;
            hover.focus = true;
            clearTimeout(hover.timer);
            setOpen(true);
          },
          /* Focus leaving a hover popover closes it, even after a click pinned it open. */
          onBlur: (event: { relatedTarget: EventTarget | null }) => {
            const next = event.relatedTarget;
            if (next instanceof Node && panelRef.current?.contains(next)) return;
            hoverRef.current.focus = false;
            hoverRef.current.pinned = false;
            scheduleHoverClose();
          },
        }
      : {
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          "aria-controls": open ? panelId : undefined,
        }),
  };

  const setTriggerRef = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);

  const registerTitle = useCallback((id: string) => {
    setTitleId((current) => current ?? id);
    return () => setTitleId((current) => (current === id ? undefined : current));
  }, []);
  const context = useMemo(() => ({ registerTitle }), [registerTitle]);

  const labelledBy = ariaLabelledBy ?? (ariaLabel ? undefined : (titleId ?? triggerId));

  return (
    <>
      <Slot {...triggerProps} ref={setTriggerRef}>
        {children}
      </Slot>
      <PopoverContext value={context}>
        <div
          {...props}
          role="dialog"
          id={panelId}
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          ref={mergeRefs<HTMLDivElement>(panelRef, ref)}
          hidden={!open}
          tabIndex={-1}
          data-state={open ? "open" : "closed"}
          data-side={side}
          data-slot="popover"
          className={cn(popoverPanelClassName, className)}
        >
          {content}
          {arrow ? (
            <span
              ref={arrowRef}
              aria-hidden
              data-slot="popover-arrow"
              className={popoverArrowVariants({ side })}
            />
          ) : null}
        </div>
      </PopoverContext>
    </>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Parts                                                                                      */
/* ------------------------------------------------------------------------------------------ */

export type PopoverHeaderProps = ComponentProps<"div">;

/** Flowbite's grey title bar at the top of the popover. Put a `PopoverTitle` inside. */
export function PopoverHeader({ className, ...props }: PopoverHeaderProps) {
  return (
    <div data-slot="popover-header" className={cn(popoverHeaderClassName, className)} {...props} />
  );
}

export type PopoverTitleProps = ComponentProps<"h3">;

/**
 * The popover's heading (an `h3`). The first title in a popover names it, unless the popover has
 * its own `aria-label` or `aria-labelledby`.
 */
export function PopoverTitle({ id: idProp, className, children, ...props }: PopoverTitleProps) {
  const context = useContext(PopoverContext);
  const generated = useId();
  const id = idProp ?? generated;
  const register = context?.registerTitle;
  useLayoutEffect(() => register?.(id), [register, id]);
  return (
    <h3
      id={id}
      data-slot="popover-title"
      className={cn(popoverTitleClassName, className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export type PopoverBodyProps = ComponentProps<"div">;

/** The padded content under a `PopoverHeader`. */
export function PopoverBody({ className, ...props }: PopoverBodyProps) {
  return (
    <div data-slot="popover-body" className={cn(popoverBodyClassName, className)} {...props} />
  );
}
