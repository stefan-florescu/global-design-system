"use client";

import { createContext, useContext, type PointerEvent } from "react";

import type { DropdownPlacement } from "./dropdown-position";

/** What to focus when the panel opens: its first or last item, or nothing. */
export type FocusIntent = "first" | "last" | "none";

/** `menu`: an ARIA menu. `dialog`: a non-modal dialog. `disclosure`: a plain panel. */
export type PanelKind = "menu" | "dialog" | "disclosure";

/**
 * - `trigger`: move focus back to the trigger (Escape, choosing an item).
 * - `keep`: leave focus where it is (a click or focus outside, Tab).
 * - `auto`: back to the trigger only if focus is inside the panel, so it is never lost.
 */
export type CloseFocus = "trigger" | "keep" | "auto";

export type DropdownContextValue = {
  open: boolean;
  /** Open, or when already open move focus, to the first or last item. */
  show: (focus: FocusIntent) => void;
  close: (focus?: CloseFocus) => void;
  /** Close this dropdown and every parent menu (after choosing an item). */
  closeAll: (focus?: CloseFocus) => void;
  triggerId: string;
  panelId: string;
  /** Ref callbacks for the trigger and the panel elements. */
  setTrigger: (node: HTMLElement | null) => void;
  setPanel: (node: HTMLElement | null) => void;
  getTrigger: () => HTMLElement | null;
  /** What to focus now that the panel has opened; reading it resets it. */
  takeFocusIntent: () => FocusIntent;
  /** Run `listener` whenever this dropdown closes. Returns an unsubscribe function. */
  subscribeClose: (listener: () => void) => () => void;
  placement: DropdownPlacement;
  offset: number;
  skidding: number;
  kind: PanelKind;
  setKind: (kind: PanelKind) => void;
  parent: DropdownContextValue | null;
  /** Called by the trigger on click: pins a hover-opened dropdown. Returns true if it did. */
  pin: () => boolean;
};

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(component: string): DropdownContextValue {
  const context = useContext(DropdownContext);
  if (!context) throw new Error(`<${component}> must be used inside <Dropdown>.`);
  return context;
}

/** The kind of the nearest panel, so items render as menu items or as plain links/buttons. */
export const DropdownPanelKindContext = createContext<PanelKind>("menu");

export type RadioGroupContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
};

export const DropdownRadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const ITEM_SELECTOR = '[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]';

/** The items of `menu`, without those of its sub-menus. */
export function getMenuItems(menu: HTMLElement): HTMLElement[] {
  return [...menu.querySelectorAll<HTMLElement>(ITEM_SELECTOR)].filter(
    (item) => item.closest('[role="menu"]') === menu,
  );
}

const TABBABLE =
  'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Moves focus into a panel that just opened. */
export function focusPanel(panel: HTMLElement, intent: FocusIntent) {
  if (intent === "none") return;
  const role = panel.getAttribute("role");
  if (role === "menu") {
    const items = getMenuItems(panel);
    const item = intent === "last" ? items[items.length - 1] : items[0];
    (item ?? panel).focus();
  } else if (role === "dialog") {
    const first = panel.querySelector<HTMLElement>(TABBABLE);
    (first ?? panel).focus();
  }
}

/** Menu items follow the pointer, so the keyboard carries on from the hovered item. */
export function focusOnHover(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;
  const item = event.currentTarget;
  if (item.getAttribute("aria-disabled") === "true") return;
  if (document.activeElement !== item) item.focus({ preventScroll: true });
}
