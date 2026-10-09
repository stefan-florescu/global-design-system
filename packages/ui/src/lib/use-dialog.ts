import { useEffect, useRef } from "react";

export type UseDialogOptions = {
  /** Whether the dialog should be open. */
  open: boolean;
  /** Asks to open or close: Escape, a backdrop click, or a close by the browser. */
  setOpen: (open: boolean) => void;
  /** `showModal()` (the page is inert, with a backdrop) or `show()` (a non-modal dialog). */
  modal?: boolean;
  /** Stop the page from scrolling while the dialog is open. */
  scrollLock?: boolean;
  /** Close when the backdrop of a modal dialog is clicked. Escape always closes. */
  dismissible?: boolean;
};

/**
 * Drives a native `<dialog>` from React state, for the WAI-ARIA dialog pattern: it opens with
 * `showModal()` (or `show()`), so the browser moves focus into it, traps it and makes the page
 * inert (`data-autofocus` on a descendant moves focus there instead); Escape and (optionally) the backdrop close it through `setOpen`, so a controlled dialog
 * stays in sync; focus returns to the element that had it; and the page can't scroll meanwhile.
 * Attach the returned ref to the `<dialog>`.
 */
export function useDialog({
  open,
  setOpen,
  modal = true,
  scrollLock = true,
  dismissible = true,
}: UseDialogOptions) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Open and close the native dialog to match the state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (modal) dialog.showModal();
      else dialog.show();
      // The browser focuses the first focusable element (or the `autofocus` one). React never
      // writes `autoFocus` to the DOM, so `data-autofocus` picks another starting point.
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    } else if (!open && dialog.open) {
      const hadFocus = dialog.contains(document.activeElement);
      dialog.close();
      const target = returnFocus.current;
      returnFocus.current = null;
      // The browser returns focus too; this covers focus that was inside a non-modal dialog.
      if (
        target?.isConnected &&
        (hadFocus || document.activeElement === document.body || !document.activeElement)
      ) {
        target.focus({ preventScroll: true });
      }
    }
  }, [open, modal]);

  // Close on unmount so the page is never left inert.
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  // Lock the page scroll while open.
  useEffect(() => {
    if (!open || !scrollLock) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open, scrollLock]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Escape on a modal dialog: close through the state, so a controlled dialog stays in sync
    // and any closing transition runs.
    const onCancel = (event: Event) => {
      event.preventDefault();
      setOpen(false);
    };
    // Escape on a non-modal dialog, which the browser does not close by itself.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented && !dialog.matches(":modal")) {
        event.preventDefault();
        setOpen(false);
      }
    };
    // A click on the backdrop targets the dialog itself, outside its box.
    const onClick = (event: MouseEvent) => {
      if (!dismissible || event.target !== dialog || !dialog.matches(":modal")) return;
      const box = dialog.getBoundingClientRect();
      const inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
      if (!inside) setOpen(false);
    };
    // Closed by the browser (a `<form method="dialog">`, a second Escape): sync the state.
    const onClose = () => {
      if (openRef.current) setOpen(false);
    };

    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("keydown", onKeyDown);
    dialog.addEventListener("click", onClick);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("keydown", onKeyDown);
      dialog.removeEventListener("click", onClick);
      dialog.removeEventListener("close", onClose);
    };
  }, [setOpen, dismissible]);

  return dialogRef;
}
