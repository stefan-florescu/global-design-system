"use client";

import {
  createContext,
  use,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import { cn } from "../../lib/cn";
import { mergeRefs, Slot } from "../dropdown/dropdown-slot";

import {
  tabsContentClassName,
  tabsListVariants,
  tabsNavItemVariants,
  tabsTriggerVariants,
  tabsVariants,
  type TabsOrientation,
  type TabsVariant,
} from "./tabs.variants";

type TabsContextValue = {
  value: string | undefined;
  select: (value: string) => void;
  /** Adopt a value when none is selected yet (uncontrolled tabs without `defaultValue`). */
  adopt: (value: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
  activationMode: "automatic" | "manual";
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string) {
  const context = use(TabsContext);
  if (!context) throw new Error(`<${component}> must be used inside <Tabs>.`);
  return context;
}

/** Ids for a tab and its panel; whitespace would break the `aria-controls` id reference. */
function partId(baseId: string, part: "trigger" | "content", value: string) {
  return `${baseId}-${part}-${value.replace(/\s+/g, "-")}`;
}

export type TabsProps = Omit<ComponentProps<"div">, "defaultValue"> & {
  /** Value of the tab selected on first render (uncontrolled). Defaults to the first tab. */
  defaultValue?: string;
  /** Value of the selected tab (controlled). Use with `onValueChange`. */
  value?: string;
  /** Called with the new value whenever another tab is selected. */
  onValueChange?: (value: string) => void;
  /** The tab style. */
  variant?: TabsVariant;
  /** `vertical` stacks the tabs beside the panels from `md` up, and uses ↑ / ↓ to move. */
  orientation?: TabsOrientation;
  /**
   * `automatic` (default) selects a tab as soon as the arrow keys move focus to it. Use `manual`
   * when showing a panel is slow (it fetches data, for example): arrows only move focus, and
   * Enter or Space selects.
   */
  activationMode?: "automatic" | "manual";
};

/**
 * A set of layered sections of content, the panels, shown one at a time. Follows the WAI-ARIA
 * Tabs pattern. Compose with `TabsList`, `TabsTrigger` and `TabsContent`.
 */
export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = "default",
  orientation = "horizontal",
  activationMode = "automatic",
  className,
  children,
  ...props
}: TabsProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlledValue ?? uncontrolled;

  const select = (next: string) => {
    if (next === value) return;
    if (controlledValue === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const adopt = (next: string) => {
    if (controlledValue === undefined) setUncontrolled((current) => current ?? next);
  };

  return (
    <TabsContext value={{ value, select, adopt, variant, orientation, activationMode, baseId }}>
      <div
        data-slot="tabs"
        data-orientation={orientation}
        className={cn(tabsVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext>
  );
}

/** The enabled tabs of one tab list, in order (nested tab sets excluded). */
function enabledTriggers(list: Element) {
  return Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')).filter(
    (tab) => tab.closest('[role="tablist"]') === list,
  );
}

export type TabsListProps = ComponentProps<"div">;

/**
 * The row (or column) of tabs: a `tablist`. Name it with `aria-label` or `aria-labelledby` when
 * the page has more than one set of tabs.
 */
export function TabsList({ className, ref, ...props }: TabsListProps) {
  const { value, adopt, variant, orientation } = useTabs("TabsList");
  const listRef = useRef<HTMLDivElement>(null);

  // Keep exactly one tab reachable with Tab. With no value yet (uncontrolled, no
  // `defaultValue`), select the first enabled tab. When the selected tab is disabled or missing,
  // the first enabled tab becomes the tab stop.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const tabs = enabledTriggers(list);
    const first = tabs[0];
    if (!first) return;
    const selected = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
    if (!selected && value === undefined) {
      adopt(first.dataset.value ?? "");
      return;
    }
    const stop = selected ?? first;
    for (const tab of tabs) tab.tabIndex = tab === stop ? 0 : -1;
  });

  return (
    <div
      ref={mergeRefs(listRef, ref)}
      role="tablist"
      aria-orientation={orientation}
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, orientation }), className)}
      {...props}
    />
  );
}

export type TabsTriggerProps = Omit<ComponentProps<"button">, "value"> & {
  /** Unique value that identifies the tab and its `TabsContent`. */
  value: string;
};

/** A tab. Its label is its content; an icon before the text is decorative. */
export function TabsTrigger({
  value,
  disabled = false,
  className,
  onClick,
  onKeyDown,
  ...props
}: TabsTriggerProps) {
  const context = useTabs("TabsTrigger");
  const { variant, orientation, activationMode, baseId, select } = context;
  const selected = context.value === value;
  const state = disabled ? "disabled" : selected ? "active" : "inactive";

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const list = event.currentTarget.closest('[role="tablist"]');
    if (!list) return;
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const [prevKey, nextKey] =
      orientation === "vertical"
        ? ["ArrowUp", "ArrowDown"]
        : rtl
          ? ["ArrowRight", "ArrowLeft"]
          : ["ArrowLeft", "ArrowRight"];
    const tabs = enabledTriggers(list);
    const index = tabs.indexOf(event.currentTarget);
    const last = tabs.length - 1;
    const target = {
      [prevKey]: index <= 0 ? last : index - 1,
      [nextKey]: index === last ? 0 : index + 1,
      Home: 0,
      End: last,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const tab = tabs[target];
    if (!tab) return;
    tab.focus();
    if (activationMode === "automatic" && tab.dataset.value !== undefined) {
      select(tab.dataset.value);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      id={partId(baseId, "trigger", value)}
      aria-selected={selected}
      aria-controls={partId(baseId, "content", value)}
      tabIndex={selected && !disabled ? 0 : -1}
      disabled={disabled}
      data-slot="tabs-trigger"
      data-state={state}
      data-value={value}
      className={cn(tabsTriggerVariants({ variant, orientation, state }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) select(value);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleKeyDown(event);
      }}
      {...props}
    />
  );
}

export type TabsContentProps = Omit<ComponentProps<"div">, "value"> & {
  /** Value of the `TabsTrigger` that shows this panel. */
  value: string;
};

/**
 * The panel of one tab: a `tabpanel` labelled by its tab, `hidden` while another tab is
 * selected. It is a tab stop, so keyboard users reach its content right after the tabs.
 */
export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: selected, baseId } = useTabs("TabsContent");
  const active = selected === value;

  return (
    <div
      role="tabpanel"
      id={partId(baseId, "content", value)}
      aria-labelledby={partId(baseId, "trigger", value)}
      // The APG Tabs pattern makes the panel a tab stop (jsx-a11y's recommended config allows
      // it for `tabpanel`; strict mode doesn't).
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      hidden={!active}
      data-slot="tabs-content"
      data-state={active ? "active" : "inactive"}
      className={cn(tabsContentClassName, className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------------------------------ */
/* Navigation                                                                                 */
/* ------------------------------------------------------------------------------------------ */

type TabsNavContextValue = { variant: TabsVariant; orientation: TabsOrientation };

const TabsNavContext = createContext<TabsNavContextValue | null>(null);

export type TabsNavProps = ComponentProps<"nav"> & {
  /** The tab style, as on `Tabs`. */
  variant?: TabsVariant;
  /** `vertical` stacks the links in a column. */
  orientation?: TabsOrientation;
};

/**
 * Tab-styled links to other pages: a `nav` landmark with a list of `TabsLink`. Use it when each
 * tab is a page of its own; use `Tabs` to switch panels on the same page. Name it with
 * `aria-label`.
 */
export function TabsNav({
  variant = "default",
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsNavProps) {
  return (
    <TabsNavContext value={{ variant, orientation }}>
      <nav data-slot="tabs-nav" className={className} {...props}>
        <ul className={tabsListVariants({ variant, orientation })}>{children}</ul>
      </nav>
    </TabsNavContext>
  );
}

export type TabsLinkProps = ComponentProps<"a"> & {
  /** Marks the link as the current page (`aria-current="page"`) and styles it as the active tab. */
  active?: boolean;
  /** Shown and announced as unavailable; the link has no `href` and can't be followed. */
  disabled?: boolean;
  /** Render the only child (such as a router `Link`) as the link. */
  asChild?: boolean;
};

/** A link in a `TabsNav`; renders the list item and the link. */
export function TabsLink({
  active = false,
  disabled = false,
  asChild = false,
  href,
  className,
  children,
  onClick,
  ...props
}: TabsLinkProps) {
  const context = use(TabsNavContext);
  if (!context) throw new Error("<TabsLink> must be used inside <TabsNav>.");
  const { variant, orientation } = context;
  const state = disabled ? "disabled" : active ? "active" : "inactive";

  const linkProps = {
    "aria-current": active ? ("page" as const) : undefined,
    ...props,
    // With `asChild`, keep the child's own `href` unless disabled.
    ...(disabled ? { href: undefined } : href !== undefined ? { href } : {}),
    "aria-disabled": disabled || undefined,
    "data-slot": "tabs-link",
    "data-state": state,
    className: cn(tabsTriggerVariants({ variant, orientation, state }), className),
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
  };

  return (
    <li className={tabsNavItemVariants({ variant, orientation })}>
      {asChild ? <Slot {...linkProps}>{children}</Slot> : <a {...linkProps}>{children}</a>}
    </li>
  );
}
