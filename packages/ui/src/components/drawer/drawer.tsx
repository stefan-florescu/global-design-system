"use client";

import { X } from "@stefan-florescu/icons";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../lib/cn";
import { useDialog } from "../../lib/use-dialog";
import { Button, type ButtonProps } from "../button";

import {
  drawerCloseClassName,
  drawerDescriptionClassName,
  drawerEdgeClassName,
  drawerHandleBarClassName,
  drawerHandleClassName,
  drawerHandleLabelClassName,
  drawerHeaderClassName,
  drawerTitleClassName,
  drawerVariants,
} from "./drawer.variants";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  placement: DrawerPlacement;
  backdrop: boolean;
  scrollLock: boolean;
  edge: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
  hasTitle: boolean;
  setHasTitle: (value: boolean) => void;
  hasDescription: boolean;
  setHasDescription: (value: boolean) => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

/** The strip a swipeable-edge drawer leaves on screen while closed, where its handle is copied. */
const EdgeSlotContext = createContext<HTMLElement | null>(null);

function useDrawerContext(part: string) {
  const context = use(DrawerContext);
  if (!context) throw new Error(`<${part}> must be used inside <Drawer>.`);
  return context;
}

/** The drawer's open state and a setter, for custom triggers and actions inside `<Drawer>`. */
export function useDrawer() {
  const { open, setOpen } = useDrawerContext("useDrawer");
  return { open, setOpen };
}

export type DrawerProps = {
  /** Whether the drawer is open (controlled). Use with `onOpenChange`. */
  open?: boolean;
  /** Whether the drawer is open on first render (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the drawer asks to open or close: trigger, close button, Escape, backdrop. */
  onOpenChange?: (open: boolean) => void;
  /** The edge the drawer slides in from. */
  placement?: DrawerPlacement;
  /**
   * Dim the page and make it inert while the drawer is open (a modal dialog). A click on the
   * backdrop closes the drawer. Without it the drawer is a non-modal dialog: the page stays usable.
   */
  backdrop?: boolean;
  /** Stop the page from scrolling while the drawer is open. */
  scrollLock?: boolean;
  /**
   * Swipeable edge (bottom drawers): keep a strip with a `DrawerHandle` on screen while closed;
   * the handle opens and closes the drawer.
   */
  edge?: boolean;
  /** A `DrawerTrigger` (optional) and the `DrawerContent`. */
  children?: ReactNode;
};

/**
 * A panel that slides in from an edge of the screen: navigation, forms or details on top of the
 * page. Follows the WAI-ARIA dialog (modal) pattern with the native `<dialog>`: focus moves into
 * the drawer and stays there, Escape and the backdrop close it, and focus returns to the trigger.
 */
export function Drawer({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "left",
  backdrop = true,
  scrollLock = true,
  edge = false,
  children,
}: DrawerProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const id = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const value = useMemo<DrawerContextValue>(
    () => ({
      open,
      setOpen,
      placement: edge ? "bottom" : placement,
      backdrop,
      scrollLock,
      edge,
      contentId: `${id}-drawer`,
      titleId: `${id}-title`,
      descriptionId: `${id}-description`,
      hasTitle,
      setHasTitle,
      hasDescription,
      setHasDescription,
    }),
    [open, setOpen, placement, backdrop, scrollLock, edge, id, hasTitle, hasDescription],
  );

  return <DrawerContext value={value}>{children}</DrawerContext>;
}

export type DrawerTriggerProps = ButtonProps;

/**
 * The button that opens the drawer. A `Button` (brand by default) that takes every Button option.
 * To open the drawer from your own control, make the `Drawer` controlled instead.
 */
export function DrawerTrigger({ onClick, ...props }: DrawerTriggerProps) {
  const { open, setOpen, contentId } = useDrawerContext("DrawerTrigger");
  return (
    <Button
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(true);
      }}
      {...props}
    />
  );
}

export type DrawerContentProps = Omit<ComponentProps<"dialog">, "open">;

/**
 * The drawer panel: a native `<dialog>`, labelled by its `DrawerTitle` (or `DrawerHandle`) and
 * described by its `DrawerDescription`. Set its width with `className` (`w-80`; `w-96` by default).
 */
export function DrawerContent({ className, children, ref, ...props }: DrawerContentProps) {
  const {
    open,
    setOpen,
    placement,
    backdrop,
    scrollLock,
    edge,
    contentId,
    titleId,
    descriptionId,
    hasTitle,
    hasDescription,
  } = useDrawerContext("DrawerContent");
  const dialogRef = useDialog({ open, setOpen, modal: backdrop, scrollLock });

  const [edgeSlot, setEdgeSlot] = useState<HTMLDivElement | null>(null);

  return (
    <EdgeSlotContext value={edge ? edgeSlot : null}>
      {edge ? (
        <div
          ref={setEdgeSlot}
          className={drawerEdgeClassName}
          hidden={open}
          data-slot="drawer-edge"
        />
      ) : null}
      <dialog
        id={contentId}
        ref={(node) => {
          dialogRef.current = node;
          if (typeof ref === "function") return ref(node);
          if (ref) ref.current = node;
        }}
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-describedby={hasDescription ? descriptionId : undefined}
        data-slot="drawer"
        data-placement={placement}
        className={cn(drawerVariants({ placement, modal: backdrop, edge }), className)}
        {...props}
      >
        {children}
      </dialog>
    </EdgeSlotContext>
  );
}

export type DrawerHeaderProps = ComponentProps<"div">;

/** The heading row: a `DrawerTitle` and a `DrawerClose`, over a divider. */
export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div data-slot="drawer-header" className={cn(drawerHeaderClassName, className)} {...props} />
  );
}

export type DrawerTitleProps = ComponentProps<"h2">;

/** The drawer's heading. It names the dialog. Put a decorative icon first if you like. */
export function DrawerTitle({ className, id, children, ...props }: DrawerTitleProps) {
  const { titleId, setHasTitle } = useDrawerContext("DrawerTitle");
  useEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);
  return (
    <h2
      id={id ?? titleId}
      data-slot="drawer-title"
      className={cn(drawerTitleClassName, className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export type DrawerDescriptionProps = ComponentProps<"p">;

/** A short summary under the title. It describes the dialog to screen readers. */
export function DrawerDescription({ className, id, ...props }: DrawerDescriptionProps) {
  const { descriptionId, setHasDescription } = useDrawerContext("DrawerDescription");
  useEffect(() => {
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);
  return (
    <p
      id={id ?? descriptionId}
      data-slot="drawer-description"
      className={cn(drawerDescriptionClassName, className)}
      {...props}
    />
  );
}

export type DrawerCloseProps = Omit<ComponentProps<"button">, "children"> & {
  /** Accessible name of the button. */
  label?: string;
};

/** The close button: an × in the drawer's top-end corner. */
export function DrawerClose({
  label = "Close",
  className,
  onClick,
  type = "button",
  ...props
}: DrawerCloseProps) {
  const { setOpen, contentId } = useDrawerContext("DrawerClose");
  return (
    <button
      type={type}
      aria-controls={contentId}
      data-slot="drawer-close"
      className={cn(drawerCloseClassName, className)}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
      {...props}
    >
      <X aria-hidden />
      <span className="sr-only">{label}</span>
    </button>
  );
}

export type DrawerHandleProps = Omit<ComponentProps<"button">, "type">;

/**
 * The header of a swipeable-edge drawer (`<Drawer edge>`): a bar with a grip that stays on
 * screen and opens or closes the drawer. Its text names the drawer. Put it first in
 * `DrawerContent`.
 */
export function DrawerHandle({ className, children, onClick, ...props }: DrawerHandleProps) {
  const { open, setOpen, contentId, titleId, setHasTitle } = useDrawerContext("DrawerHandle");
  const edgeSlot = use(EdgeSlotContext);
  useEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);

  // `inEdge`: the copy shown in the strip while the drawer is closed.
  const handle = (inEdge: boolean) => (
    <button
      type="button"
      aria-expanded={inEdge ? false : open}
      aria-controls={contentId}
      data-slot="drawer-handle"
      className={cn(drawerHandleClassName, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(!open);
      }}
      {...props}
    >
      <span aria-hidden className={drawerHandleBarClassName} />
      <span id={inEdge ? undefined : titleId} className={drawerHandleLabelClassName}>
        {children}
      </span>
    </button>
  );

  return (
    <>
      {handle(false)}
      {edgeSlot ? createPortal(handle(true), edgeSlot) : null}
    </>
  );
}
