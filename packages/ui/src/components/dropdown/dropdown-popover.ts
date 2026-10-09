/*
 * Popover helpers shared by Dropdown and Mega Menu panels. The popover attribute is set here
 * rather than in the markup: where the popover API is missing (older browsers, test DOMs) the
 * panel stays an ordinary `fixed` element on `z-dropdown`.
 */

export function isPopoverOpen(element: HTMLElement) {
  try {
    return element.matches(":popover-open");
  } catch {
    return false;
  }
}

export function showPopover(element: HTMLElement) {
  if (typeof element.showPopover !== "function") return;
  if (!element.hasAttribute("popover")) element.setAttribute("popover", "manual");
  if (!isPopoverOpen(element)) element.showPopover();
}

export function hidePopover(element: HTMLElement) {
  if (typeof element.hidePopover !== "function") return;
  if (isPopoverOpen(element)) element.hidePopover();
}
