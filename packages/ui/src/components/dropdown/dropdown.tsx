"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "@stefan-florescu/icons";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button";

import {
  DropdownContext,
  DropdownPanelKindContext,
  focusOnHover,
  focusPanel,
  getMenuItems,
  useDropdownContext,
  type CloseFocus,
  type DropdownContextValue,
  type FocusIntent,
  type PanelKind,
} from "./dropdown-context";
import { computeDropdownPosition, type DropdownPlacement } from "./dropdown-position";
import { mergeRefs, Slot } from "./dropdown-slot";
import {
  dropdownItemVariants,
  dropdownPanelClassName,
  dropdownSubChevronClassName,
  dropdownTriggerChevronVariants,
  type DropdownItemVariantProps,
} from "./dropdown.variants";

/* ------------------------------------------------------------------------------------------ */
/* State                                                                                      */
/* ------------------------------------------------------------------------------------------ */

type DropdownStateProps = {
  /** Whether the dropdown is open (controlled). */
  open?: boolean;
  /** Whether the dropdown is open on first render (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the dropdown opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Side of the trigger the panel opens on, optionally aligned to the trigger's `start` or `end`
   * edge. It flips to the other side when there is no room.
   */
  placement?: DropdownPlacement;
  /** Distance between trigger and panel, in px (Flowbite's offset distance). */
  offset?: number;
  /** Shift along the trigger, in px (Flowbite's offset skidding). */
  skidding?: number;
};

function useDropdownState(
  {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    placement = "bottom",
    offset = 10,
    skidding = 0,
    openOnHover = false,
    hoverDelay = 300,
  }: DropdownStateProps & { openOnHover?: boolean; hoverDelay?: number },
  parent: DropdownContextValue | null,
): DropdownContextValue {
  const [internal, setInternal] = useState(defaultOpen);
  const open = openProp ?? internal;
  const [kind, setKind] = useState<PanelKind>("menu");

  const id = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const focusIntentRef = useRef<FocusIntent>("none");
  const hoverOpenedRef = useRef(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeListenersRef = useRef(new Set<() => void>());
  const openRef = useRef(open);

  useLayoutEffect(() => {
    openRef.current = open;
  }, [open]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!next) {
        hoverOpenedRef.current = false;
        // Sub-menus close with their parent.
        closeListenersRef.current.forEach((listener) => listener());
      }
      if (next === openRef.current) return;
      openRef.current = next;
      if (openProp === undefined) setInternal(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const show = useCallback(
    (focus: FocusIntent) => {
      clearTimeout(hoverTimerRef.current);
      hoverOpenedRef.current = false;
      if (openRef.current) {
        if (panelRef.current) focusPanel(panelRef.current, focus);
        return;
      }
      focusIntentRef.current = focus;
      setOpen(true);
    },
    [setOpen],
  );

  const close = useCallback(
    (focus: CloseFocus = "auto") => {
      clearTimeout(hoverTimerRef.current);
      if (!openRef.current) return;
      const focusInside = Boolean(panelRef.current?.contains(document.activeElement));
      if (focus === "trigger" || (focus === "auto" && focusInside)) triggerRef.current?.focus();
      setOpen(false);
    },
    [setOpen],
  );

  const closeAll = useCallback(
    (focus: CloseFocus = "auto") => {
      if (parent) {
        close("keep");
        parent.closeAll(focus);
      } else {
        close(focus);
      }
    },
    [close, parent],
  );

  const subscribeClose = useCallback((listener: () => void) => {
    const listeners = closeListenersRef.current;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const parentSubscribe = parent?.subscribeClose;
  useEffect(() => parentSubscribe?.(() => setOpen(false)), [parentSubscribe, setOpen]);

  // While open: a click or focus outside the trigger and panel closes it; so does Escape inside.
  useEffect(() => {
    if (!open) return;
    const inside = (target: EventTarget | null) =>
      target instanceof Node &&
      Boolean(triggerRef.current?.contains(target) || panelRef.current?.contains(target));
    const onOutside = (event: Event) => {
      if (!inside(event.target)) close("keep");
    };
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || !inside(event.target)) return;
      event.preventDefault();
      close("trigger");
    };
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, close]);

  // `openOnHover`: open while the pointer rests on the trigger or the panel (not on touch).
  useEffect(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!openOnHover || !trigger) return;
    const onEnter = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      clearTimeout(hoverTimerRef.current);
      if (openRef.current) return;
      hoverTimerRef.current = setTimeout(() => {
        focusIntentRef.current = "none";
        setOpen(true);
        hoverOpenedRef.current = true;
      }, hoverDelay);
    };
    const onLeave = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      clearTimeout(hoverTimerRef.current);
      if (!openRef.current || !hoverOpenedRef.current) return;
      hoverTimerRef.current = setTimeout(() => close("auto"), hoverDelay);
    };
    const targets = panel ? [trigger, panel] : [trigger];
    for (const target of targets) {
      target.addEventListener("pointerenter", onEnter);
      target.addEventListener("pointerleave", onLeave);
    }
    return () => {
      clearTimeout(hoverTimerRef.current);
      for (const target of targets) {
        target.removeEventListener("pointerenter", onEnter);
        target.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [openOnHover, hoverDelay, setOpen, close]);

  const pin = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    if (!openRef.current || !hoverOpenedRef.current) return false;
    hoverOpenedRef.current = false;
    return true;
  }, []);

  const setTrigger = useCallback((node: HTMLElement | null) => {
    triggerRef.current = node;
  }, []);
  const setPanel = useCallback((node: HTMLElement | null) => {
    panelRef.current = node;
  }, []);
  const getTrigger = useCallback(() => triggerRef.current, []);
  const takeFocusIntent = useCallback(() => {
    const intent = focusIntentRef.current;
    focusIntentRef.current = "none";
    return intent;
  }, []);

  return useMemo(
    () => ({
      open,
      show,
      close,
      closeAll,
      triggerId: `${id}-trigger`,
      panelId: `${id}-panel`,
      setTrigger,
      setPanel,
      getTrigger,
      takeFocusIntent,
      subscribeClose,
      placement,
      offset,
      skidding,
      kind,
      setKind,
      parent,
      pin,
    }),
    [
      open,
      show,
      close,
      closeAll,
      id,
      setTrigger,
      setPanel,
      getTrigger,
      takeFocusIntent,
      subscribeClose,
      placement,
      offset,
      skidding,
      kind,
      parent,
      pin,
    ],
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Dropdown                                                                                   */
/* ------------------------------------------------------------------------------------------ */

export type DropdownProps = DropdownStateProps & {
  /**
   * Also open when the pointer rests on the trigger, and close when it leaves (Flowbite's
   * "Dropdown hover"). A click, a tap or the keyboard still open it, and a click keeps it open.
   */
  openOnHover?: boolean;
  /** Delay before opening or closing on hover, in ms (Flowbite's `data-dropdown-delay`). */
  hoverDelay?: number;
  /** A `DropdownTrigger` followed by a `DropdownMenu` or `DropdownContent`. */
  children?: ReactNode;
};

/**
 * Shows a menu of actions, or a panel of content, next to a trigger (Flowbite's dropdown).
 * Holds the open state and the placement; renders no element of its own.
 */
export function Dropdown({ children, ...props }: DropdownProps) {
  const context = useDropdownState(props, null);
  return <DropdownContext value={context}>{children}</DropdownContext>;
}

/* ------------------------------------------------------------------------------------------ */
/* Trigger                                                                                    */
/* ------------------------------------------------------------------------------------------ */

export type DropdownTriggerProps = ButtonProps & {
  /**
   * Render the only child (such as an avatar or icon button) as the trigger instead of a
   * `Button`. The child must be a focusable element, usually a `<button>`, with an accessible name.
   */
  asChild?: boolean;
  /** Show a chevron pointing to where the panel opens. Ignored with `asChild`. */
  chevron?: boolean;
};

const CHEVRONS = { top: ChevronUp, right: ChevronRight, bottom: ChevronDown, left: ChevronLeft };

/**
 * The button that opens the dropdown: our `Button` with a chevron, or your own element with
 * `asChild`. Enter, Space and Arrow Down open a menu on its first item; Arrow Up on its last.
 */
export function DropdownTrigger({
  asChild = false,
  chevron = true,
  children,
  onClick,
  onKeyDown,
  ref,
  ...props
}: DropdownTriggerProps) {
  const context = useDropdownContext("DropdownTrigger");
  const { open, kind, show, close, pin } = context;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (pin()) {
      if (kind !== "disclosure") show("first");
    } else if (open) close("trigger");
    else show(kind === "disclosure" ? "none" : "first");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      close("trigger");
    } else if (kind === "menu" && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      show(event.key === "ArrowDown" ? "first" : "last");
    }
  };

  const triggerProps = {
    id: context.triggerId,
    "aria-haspopup": kind === "disclosure" ? undefined : kind,
    "aria-expanded": open,
    "aria-controls": open ? context.panelId : undefined,
    "data-state": open ? "open" : "closed",
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };

  if (asChild) {
    return (
      <Slot {...props} {...triggerProps} ref={mergeRefs(context.setTrigger, ref)}>
        {children}
      </Slot>
    );
  }

  const side = context.placement.split("-")[0] as keyof typeof CHEVRONS;
  const Chevron = CHEVRONS[side];
  const icon = chevron ? (
    <Chevron
      aria-hidden
      className={dropdownTriggerChevronVariants({ position: side === "left" ? "start" : "end" })}
    />
  ) : null;

  return (
    <Button {...props} {...triggerProps} ref={mergeRefs(context.setTrigger, ref)}>
      {side === "left" ? icon : null}
      {children}
      {side === "left" ? null : icon}
    </Button>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Panels                                                                                     */
/* ------------------------------------------------------------------------------------------ */

/**
 * The popover attribute is set here rather than in the markup: where the popover API is missing
 * (older browsers, test DOMs) the panel stays an ordinary `fixed` element on `z-dropdown`.
 */
function showPopover(element: HTMLElement) {
  if (typeof element.showPopover !== "function") return;
  if (!element.hasAttribute("popover")) element.setAttribute("popover", "manual");
  if (!isPopoverOpen(element)) element.showPopover();
}

function hidePopover(element: HTMLElement) {
  if (typeof element.hidePopover !== "function") return;
  if (isPopoverOpen(element)) element.hidePopover();
}

function isPopoverOpen(element: HTMLElement) {
  try {
    return element.matches(":popover-open");
  } catch {
    return false;
  }
}

type PanelProps = Omit<ComponentProps<"div">, "popover" | "role"> & {
  kind: PanelKind;
  role?: "menu" | "dialog";
};

/**
 * The floating panel shared by `DropdownMenu` and `DropdownContent`: a manual native popover
 * (top layer, so no `overflow` or stacking context clips it), placed next to the trigger and kept
 * there while the page scrolls or resizes.
 */
function DropdownPanel({ kind, role, className, ref, children, ...props }: PanelProps) {
  const context = useDropdownContext(kind === "menu" ? "DropdownMenu" : "DropdownContent");
  const { open, setKind, setPanel, getTrigger, takeFocusIntent, placement, offset, skidding } =
    context;
  const isSub = context.parent !== null;
  const panelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => setKind(kind), [kind, setKind]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!open) {
      hidePopover(panel);
      return;
    }
    showPopover(panel);

    const update = () => {
      const trigger = getTrigger();
      if (!trigger) return;
      const position = computeDropdownPosition(
        trigger.getBoundingClientRect(),
        { width: panel.offsetWidth, height: panel.offsetHeight },
        {
          placement,
          offset,
          skidding,
          rtl: getComputedStyle(trigger).direction === "rtl",
          mirrorSides: isSub,
          viewport: { width: document.documentElement.clientWidth, height: window.innerHeight },
        },
      );
      panel.style.left = `${position.x}px`;
      panel.style.top = `${position.y}px`;
      panel.dataset.side = position.side;
    };
    update();
    focusPanel(panel, takeFocusIntent());

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(panel);
    const trigger = getTrigger();
    if (trigger) observer?.observe(trigger);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, [open, placement, offset, skidding, isSub, getTrigger, takeFocusIntent]);

  return (
    <DropdownPanelKindContext value={kind}>
      <div
        {...props}
        role={role}
        id={context.panelId}
        ref={mergeRefs<HTMLDivElement>(panelRef, setPanel, ref)}
        hidden={!open}
        tabIndex={-1}
        data-state={open ? "open" : "closed"}
        data-slot={isSub ? "dropdown-sub-menu" : `dropdown-${kind === "menu" ? "menu" : "content"}`}
        className={cn(dropdownPanelClassName, className)}
      >
        {children}
      </div>
    </DropdownPanelKindContext>
  );
}

export type DropdownMenuProps = Omit<ComponentProps<"div">, "popover" | "role">;

/**
 * A menu of actions or options (WAI-ARIA menu): items are reached with the arrow keys, Home, End
 * and by typing their first letters; Escape closes it and returns focus to the trigger.
 * Put `DropdownItem`, `DropdownCheckboxItem`, `DropdownRadioGroup`, `DropdownSub`,
 * `DropdownHeader`, `DropdownGroup` and `DropdownDivider` inside.
 */
export function DropdownMenu({ onKeyDown, onKeyUp, ...props }: DropdownMenuProps) {
  const context = useDropdownContext("DropdownMenu");
  const search = useRef({
    text: "",
    timer: undefined as ReturnType<typeof setTimeout> | undefined,
  });

  useEffect(() => {
    const state = search.current;
    return () => clearTimeout(state.timer);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const menu = event.currentTarget;
    const target = event.target as HTMLElement;
    // Keys pressed in a sub-menu are handled there.
    if (target.closest('[role="menu"]') !== menu) return;

    const items = getMenuItems(menu);
    const index = items.indexOf(document.activeElement as HTMLElement);
    const rtl = getComputedStyle(menu).direction === "rtl";
    const isSub = context.parent !== null;

    const focusAt = (next: number) => items[next]?.focus();
    let handled = true;

    switch (event.key) {
      case "ArrowDown":
        focusAt(index < 0 ? 0 : (index + 1) % items.length);
        break;
      case "ArrowUp":
        focusAt(index < 0 ? items.length - 1 : (index - 1 + items.length) % items.length);
        break;
      case "Home":
      case "PageUp":
        focusAt(0);
        break;
      case "End":
      case "PageDown":
        focusAt(items.length - 1);
        break;
      case "Escape":
        context.close("trigger");
        break;
      case rtl ? "ArrowRight" : "ArrowLeft":
        if (isSub) context.close("trigger");
        else handled = false;
        break;
      case "Tab":
        // Let focus move on, then close every level of the menu.
        setTimeout(() => context.closeAll("keep"));
        handled = false;
        break;
      case "Enter":
        if (index >= 0) items[index]?.click();
        break;
      default: {
        const isCharacter =
          event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
        if (!isCharacter || (event.key === " " && search.current.text === "")) {
          if (event.key === " " && index >= 0) items[index]?.click();
          else handled = false;
          break;
        }
        typeahead(event.key, items, index);
      }
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const typeahead = (key: string, items: HTMLElement[], index: number) => {
    const state = search.current;
    clearTimeout(state.timer);
    state.text += key.toLowerCase();
    state.timer = setTimeout(() => {
      state.text = "";
    }, 500);

    const repeated = [...state.text].every((character) => character === state.text[0]);
    const query = repeated ? state.text[0]! : state.text;
    // A new search starts after the current item; a longer one may match the current item.
    const start = index < 0 ? 0 : query.length === 1 ? index + 1 : index;
    const ordered = [...items.slice(start), ...items.slice(0, start)];
    const label = (item: HTMLElement) =>
      (item.dataset.textValue ?? item.textContent ?? "").trim().toLowerCase();
    ordered.find((item) => label(item).startsWith(query))?.focus();
  };

  return (
    <DropdownPanel
      kind="menu"
      role="menu"
      aria-labelledby={context.triggerId}
      onKeyDown={handleKeyDown}
      onKeyUp={(event) => {
        onKeyUp?.(event);
        // Space was handled on key down; stop buttons from clicking again on key up.
        if (event.key === " ") event.preventDefault();
      }}
      {...props}
    />
  );
}

export type DropdownContentProps = Omit<ComponentProps<"div">, "popover" | "role"> & {
  /**
   * `dialog` for a panel of form controls (search, checkboxes, a date picker): focus moves to
   * its first control when it opens. Leave it out for a plain disclosure panel, such as links in
   * a navigation bar, where focus stays on the trigger.
   */
  role?: "dialog";
};

/**
 * A panel of any content that opens from the trigger, for when the content is not a menu: form
 * controls, a search field, a date picker or navigation links. Tab moves through it as usual;
 * Escape, a click outside or moving focus out closes it.
 */
export function DropdownContent({ role, ...props }: DropdownContentProps) {
  const context = useDropdownContext("DropdownContent");
  const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  return (
    <DropdownPanel
      kind={role === "dialog" ? "dialog" : "disclosure"}
      role={role}
      aria-labelledby={role === "dialog" && !named ? context.triggerId : undefined}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Sub-menus                                                                                  */
/* ------------------------------------------------------------------------------------------ */

export type DropdownSubProps = DropdownStateProps & {
  /** A `DropdownSubTrigger` followed by a `DropdownSubMenu`. */
  children?: ReactNode;
};

/**
 * A nested menu (Flowbite's "Multi-level dropdown"). Opens to the right of its trigger item by
 * default, or to the left in right-to-left layouts.
 */
export function DropdownSub({ placement = "right-start", children, ...props }: DropdownSubProps) {
  const parent = useDropdownContext("DropdownSub");
  const context = useDropdownState({ placement, ...props }, parent);
  return <DropdownContext value={context}>{children}</DropdownContext>;
}

export type DropdownSubTriggerProps = Omit<ComponentProps<"button">, "role"> &
  DropdownItemVariantProps;

/**
 * The item that opens a sub-menu. Enter, Space, Arrow Right (Arrow Left in right-to-left) or a
 * click open it on its first item; Arrow Left or Escape in the sub-menu comes back here.
 */
export function DropdownSubTrigger({
  variant,
  className,
  children,
  onClick,
  onKeyDown,
  onPointerMove,
  ref,
  ...props
}: DropdownSubTriggerProps) {
  const context = useDropdownContext("DropdownSubTrigger");
  const { open, show, close } = context;

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      id={context.triggerId}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? context.panelId : undefined}
      data-state={open ? "open" : "closed"}
      data-slot="dropdown-sub-trigger"
      ref={mergeRefs<HTMLButtonElement>(context.setTrigger, ref)}
      className={cn(dropdownItemVariants({ variant }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        // A pointer click on an open sub-menu closes it; Enter or Space moves into it.
        if (open && event.detail > 0) close("trigger");
        else show("first");
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
        if (event.key === (rtl ? "ArrowLeft" : "ArrowRight")) {
          event.preventDefault();
          event.stopPropagation();
          show("first");
        }
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        focusOnHover(event);
      }}
      {...props}
    >
      {children}
      <ChevronRight aria-hidden className={dropdownSubChevronClassName} />
    </button>
  );
}

export type DropdownSubMenuProps = DropdownMenuProps;

/** The menu a `DropdownSubTrigger` opens. Takes the same props as `DropdownMenu`. */
export function DropdownSubMenu(props: DropdownSubMenuProps) {
  return <DropdownMenu {...props} />;
}
