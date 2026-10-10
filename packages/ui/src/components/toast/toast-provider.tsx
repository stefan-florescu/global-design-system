"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

import { ToastEntryContext } from "./toast-context";
import { toastViewportVariants, type ToastPosition } from "./toast.variants";

export type ToastOptions = {
  /**
   * Close the toast after this many milliseconds. Off by default: toasts stay until they are
   * closed (WCAG 2.2.1). The timer pauses while the pointer is over the toast or focus is in it.
   * Use it only for messages that can be missed, and give people time to read: at least 5000ms.
   */
  duration?: number;
};

export type ToastApi = {
  /** Show a toast, usually a `<Toast>`. Returns its id. */
  toast: (content: ReactNode, options?: ToastOptions) => string;
  /** Close the toast with this id. */
  dismiss: (id: string) => void;
};

type Entry = { id: string; content: ReactNode; duration?: number };

const ToastApiContext = createContext<ToastApi | null>(null);

/** Shows toasts from code. Call it in a component inside `ToastProvider`. */
export function useToast(): ToastApi {
  const api = use(ToastApiContext);
  if (!api) throw new Error("useToast() must be used inside <ToastProvider>.");
  return api;
}

export type ToastProviderProps = {
  children?: ReactNode;
  /** Corner or edge of the screen where toasts stack. */
  position?: ToastPosition;
  /** Stack the toasts in the nearest positioned ancestor (`absolute`) instead of the screen. */
  contained?: boolean;
  /** Accessible name of the notifications region. */
  label?: string;
  /** Classes for the region that holds the stack. */
  className?: string;
};

/**
 * Lets the components inside show toasts with `useToast()`. Renders a "Notifications" region
 * whose list is a polite live region, so each new toast is announced without moving focus.
 */
export function ToastProvider({
  children,
  position = "bottom-end",
  contained = false,
  label = "Notifications",
  className,
}: ToastProviderProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const toast = useCallback((content: ReactNode, options: ToastOptions = {}) => {
    nextId.current += 1;
    const id = `toast-${nextId.current}`;
    setEntries((current) => [...current, { id, content, duration: options.duration }]);
    return id;
  }, []);

  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastApiContext value={api}>
      {children}
      <section
        aria-label={label}
        data-slot="toast-viewport"
        className={cn(toastViewportVariants({ position, contained }), className)}
      >
        <ol aria-live="polite" aria-relevant="additions text" className="flex flex-col gap-3">
          {entries.map((entry) => (
            <ToastEntry key={entry.id} id={entry.id} duration={entry.duration} dismiss={dismiss}>
              {entry.content}
            </ToastEntry>
          ))}
        </ol>
      </section>
    </ToastApiContext>
  );
}

function ToastEntry({
  id,
  duration,
  dismiss,
  children,
}: {
  id: string;
  duration?: number;
  dismiss: (id: string) => void;
  children: ReactNode;
}) {
  const remove = useCallback(() => dismiss(id), [dismiss, id]);
  const context = useMemo(() => ({ dismiss: remove }), [remove]);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const remaining = useRef(duration ?? 0);
  const item = useRef<HTMLLIElement>(null);
  const paused = hovered || focused;

  // Pausing is passive, so it listens natively rather than making the list item interactive.
  useEffect(() => {
    const node = item.current;
    if (!node || !duration) return;
    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    const focusIn = () => setFocused(true);
    const focusOut = (event: FocusEvent) => {
      if (!node.contains(event.relatedTarget as Node | null)) setFocused(false);
    };
    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointerleave", leave);
    node.addEventListener("focusin", focusIn);
    node.addEventListener("focusout", focusOut);
    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointerleave", leave);
      node.removeEventListener("focusin", focusIn);
      node.removeEventListener("focusout", focusOut);
    };
  }, [duration]);

  useEffect(() => {
    if (!duration || paused) return;
    const start = Date.now();
    const timer = setTimeout(remove, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - start;
    };
  }, [duration, paused, remove]);

  return (
    <li data-slot="toast-entry" className="pointer-events-auto flex justify-center" ref={item}>
      <ToastEntryContext value={context}>{children}</ToastEntryContext>
    </li>
  );
}
