"use client";

import { ChevronDown } from "@stefan-florescu/icons";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";
import { Dropdown } from "../dropdown";
import { DropdownContext, type DropdownContextValue } from "../dropdown/dropdown-context";
import { computeDropdownPosition } from "../dropdown/dropdown-position";
import { hidePopover, showPopover } from "../dropdown/dropdown-popover";
import { mergeRefs, Slot } from "../dropdown/dropdown-slot";

import {
  megaMenuChevronClassName,
  megaMenuContentVariants,
  megaMenuFullWidthInnerVariants,
  megaMenuGroupVariants,
  megaMenuLinkDescriptionClassName,
  megaMenuLinkTitleClassName,
  megaMenuLinkVariants,
  megaMenuTriggerClassName,
} from "./mega-menu.variants";

/*
 * The mega menu is a disclosure (WAI-ARIA APG "Disclosure Navigation Menu"), not an ARIA menu:
 * a button with `aria-expanded` shows a panel of ordinary links that Tab reaches right after the
 * button. Open state, Escape, click outside and focus leaving are `Dropdown`'s; this file adds
 * the navbar trigger, the anchored or full-width panel and the link columns.
 */

function useMegaMenuContext(component: string): DropdownContextValue {
  const context = useContext(DropdownContext);
  if (!context) throw new Error(`<${component}> must be used inside <MegaMenu>.`);
  return context;
}

type Layout = "anchored" | "full";
const LayoutContext = createContext<Layout>("anchored");

/* ------------------------------------------------------------------------------------------ */
/* MegaMenu                                                                                   */
/* ------------------------------------------------------------------------------------------ */

export type MegaMenuProps = {
  /** Whether the panel is open (controlled). */
  open?: boolean;
  /** Whether the panel is open on first render (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the panel opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** A `MegaMenuTrigger` followed by a `MegaMenuContent`, usually inside a navbar `<li>`. */
  children?: ReactNode;
};

/**
 * A navbar item that opens a wide panel of grouped links. Holds the open state;
 * renders no element of its own.
 */
export function MegaMenu({ open, defaultOpen, onOpenChange, children }: MegaMenuProps) {
  return (
    <Dropdown open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </Dropdown>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Trigger                                                                                    */
/* ------------------------------------------------------------------------------------------ */

export type MegaMenuTriggerProps = Omit<ComponentProps<"button">, "type"> & {
  /** Render the only child (a `<button>` with an accessible name) as the trigger. */
  asChild?: boolean;
  /** Show the chevron after the label. Ignored with `asChild`. */
  chevron?: boolean;
};

/**
 * The navbar button that shows and hides the panel (`aria-expanded`, `aria-controls`). Styled as
 * a navbar item: a full-width row in the collapsed navbar, a plain link from `md` up.
 */
export function MegaMenuTrigger({
  asChild = false,
  chevron = true,
  className,
  children,
  onClick,
  ref,
  ...props
}: MegaMenuTriggerProps) {
  const context = useMegaMenuContext("MegaMenuTrigger");
  const { open, show, close } = context;

  const triggerProps = {
    ...props,
    id: context.triggerId,
    "aria-expanded": open,
    "aria-controls": context.panelId,
    "data-state": open ? "open" : "closed",
    "data-slot": "mega-menu-trigger",
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (open) close("trigger");
      else show("none");
    },
  };

  if (asChild) {
    return (
      <Slot {...triggerProps} ref={mergeRefs(context.setTrigger, ref)} className={className}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      type="button"
      {...triggerProps}
      ref={mergeRefs<HTMLButtonElement>(context.setTrigger, ref)}
      className={cn(megaMenuTriggerClassName, className)}
    >
      {children}
      {chevron ? <ChevronDown aria-hidden className={megaMenuChevronClassName} /> : null}
    </button>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Panel                                                                                      */
/* ------------------------------------------------------------------------------------------ */

/** Tailwind's breakpoints, read from the `--sds-breakpoint-*` tokens when they are loaded. */
type Breakpoint = "sm" | "md" | "lg" | "xl";
const BREAKPOINT_FALLBACK: Record<Breakpoint, string> = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const queries = new Map<Breakpoint, string>();

function minWidthQuery(breakpoint: Breakpoint) {
  let query = queries.get(breakpoint);
  if (!query) {
    const token = getComputedStyle(document.documentElement)
      .getPropertyValue(`--sds-breakpoint-${breakpoint}`)
      .trim();
    query = `(min-width: ${token || BREAKPOINT_FALLBACK[breakpoint]})`;
    if (token) queries.set(breakpoint, query);
  }
  return query;
}

/** Whether the panel floats (from `stackBelow` up) or stacks in the page flow (below it). */
function useFloating(stackBelow: Breakpoint | "none") {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (stackBelow === "none" || typeof window.matchMedia !== "function") return () => {};
      const query = window.matchMedia(minWidthQuery(stackBelow));
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    [stackBelow],
  );
  const getSnapshot = () => {
    if (stackBelow === "none") return true;
    if (typeof window.matchMedia !== "function") return false;
    return window.matchMedia(minWidthQuery(stackBelow)).matches;
  };
  return useSyncExternalStore(subscribe, getSnapshot, () => stackBelow === "none");
}

export type MegaMenuContentProps = Omit<ComponentProps<"div">, "popover" | "role"> & {
  /**
   * Span the whole width of the navbar (the nearest `<nav>`), under it, with the columns centred
   * in a `max-w-screen-xl` container. Otherwise the panel opens
   * under the trigger.
   */
  fullWidth?: boolean;
  /** Number of columns from `md` up. */
  columns?: 1 | 2 | 3 | 4;
  /** Where an anchored panel lines up with its trigger. */
  align?: "center" | "start" | "end";
  /** Gap between the trigger (or the navbar, with `fullWidth`) and the panel, in px. */
  offset?: number;
  /**
   * Below this breakpoint the panel stacks in the page flow under its trigger, as in a collapsed
   * (hamburger) navbar, instead of floating. `"none"` always floats.
   */
  stackBelow?: Breakpoint | "none";
};

/**
 * The panel of links. Put `MegaMenuGroup` columns inside, and any other content such as a call to
 * action. It follows its trigger in the DOM, so Tab reaches its links right after the trigger.
 * From `stackBelow` up it floats in the top layer, so no `overflow` or stacking context clips it.
 */
export function MegaMenuContent({
  fullWidth = false,
  columns = 3,
  align = "center",
  offset,
  stackBelow = "md",
  className,
  children,
  ref,
  ...props
}: MegaMenuContentProps) {
  const context = useMegaMenuContext("MegaMenuContent");
  const { open, setPanel, getTrigger } = context;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const floating = useFloating(stackBelow);
  const gap = offset ?? (fullWidth ? 4 : 10);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!open || !floating) {
      hidePopover(panel);
      if (!floating) panel.removeAttribute("popover");
      panel.style.removeProperty("left");
      panel.style.removeProperty("top");
      panel.style.removeProperty("width");
      return;
    }
    showPopover(panel);

    const update = () => {
      const trigger = getTrigger();
      if (!trigger) return;
      const viewport = { width: document.documentElement.clientWidth, height: window.innerHeight };
      if (fullWidth) {
        const bar = (trigger.closest("nav") ?? trigger).getBoundingClientRect();
        const spansNav = trigger.closest("nav") !== null;
        panel.style.left = `${spansNav ? bar.left : 0}px`;
        panel.style.top = `${bar.bottom + gap}px`;
        panel.style.width = `${spansNav ? bar.width : viewport.width}px`;
        return;
      }
      const position = computeDropdownPosition(
        trigger.getBoundingClientRect(),
        { width: panel.offsetWidth, height: panel.offsetHeight },
        {
          placement: align === "center" ? "bottom" : `bottom-${align}`,
          offset: gap,
          skidding: 0,
          rtl: getComputedStyle(trigger).direction === "rtl",
          viewport,
        },
      );
      panel.style.left = `${position.x}px`;
      panel.style.top = `${position.y}px`;
    };
    update();

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
    const anchor = fullWidth ? (trigger?.closest("nav") ?? trigger) : trigger;
    if (anchor) observer?.observe(anchor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, [open, floating, fullWidth, align, gap, getTrigger]);

  return (
    <LayoutContext value={fullWidth ? "full" : "anchored"}>
      <div
        {...props}
        id={context.panelId}
        ref={mergeRefs<HTMLDivElement>(panelRef, setPanel, ref)}
        hidden={!open}
        data-state={open ? "open" : "closed"}
        data-mode={floating ? "floating" : "inline"}
        data-slot="mega-menu-content"
        className={cn(megaMenuContentVariants({ fullWidth, columns }), className)}
      >
        {fullWidth ? (
          <div className={megaMenuFullWidthInnerVariants({ columns })}>{children}</div>
        ) : (
          children
        )}
      </div>
    </LayoutContext>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Columns and links                                                                          */
/* ------------------------------------------------------------------------------------------ */

export type MegaMenuGroupProps = ComponentProps<"ul">;

/**
 * A column of `MegaMenuLink`s (a list). Name it with `aria-label` or `aria-labelledby` when it
 * has a heading.
 */
export function MegaMenuGroup({ className, ...props }: MegaMenuGroupProps) {
  const layout = useContext(LayoutContext);
  return (
    <ul
      data-slot="mega-menu-group"
      className={cn(megaMenuGroupVariants({ layout }), className)}
      {...props}
    />
  );
}

export type MegaMenuLinkProps = ComponentProps<"a"> & {
  /**
   * A line of text under the title, as in the full-width layout. The title stays the link's name
   * and the description is read as its description.
   */
  description?: ReactNode;
  /** Render the only child (such as a router `Link`) as the link. */
  asChild?: boolean;
};

/**
 * A link in a `MegaMenuGroup` (an `<li>` with an `<a>`). Put an icon before the label to
 * show icons in the menu. Following it closes the panel; call `preventDefault()` in
 * `onClick` to keep it open.
 */
export function MegaMenuLink({
  description,
  asChild = false,
  className,
  children,
  onClick,
  ...props
}: MegaMenuLinkProps) {
  const context = useContext(DropdownContext);
  const layout = useContext(LayoutContext);
  const id = useId();
  const described = description !== undefined && description !== null;

  const linkProps = {
    ...props,
    "aria-describedby": described
      ? [`${id}-description`, props["aria-describedby"]].filter(Boolean).join(" ")
      : props["aria-describedby"],
    "aria-labelledby":
      described && props["aria-label"] === undefined
        ? (props["aria-labelledby"] ?? `${id}-title`)
        : props["aria-labelledby"],
    "data-description": described || undefined,
    "data-slot": "mega-menu-link",
    className: cn(megaMenuLinkVariants({ layout, description: described }), className),
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) context?.close("trigger");
    },
  };

  const content = described ? (
    <>
      <span id={`${id}-title`} className={megaMenuLinkTitleClassName}>
        {children}
      </span>
      <span id={`${id}-description`} className={megaMenuLinkDescriptionClassName}>
        {description}
      </span>
    </>
  ) : (
    children
  );

  return (
    <li>{asChild ? <Slot {...linkProps}>{children}</Slot> : <a {...linkProps}>{content}</a>}</li>
  );
}
