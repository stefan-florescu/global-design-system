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

import { cn } from "../../lib/cn";
import { useDialog } from "../../lib/use-dialog";
import { Button, type ButtonProps } from "../button";
import { Slot } from "../dropdown/dropdown-slot";

import {
  modalBodyClassName,
  modalCloseClassName,
  modalFooterClassName,
  modalHeaderClassName,
  modalTitleClassName,
  modalVariants,
} from "./modal.variants";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";

export type ModalPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ModalContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  size: ModalSize;
  placement: ModalPlacement;
  dismissible: boolean;
  contentId: string;
  titleId: string;
  hasTitle: boolean;
  setHasTitle: (value: boolean) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext(part: string) {
  const context = use(ModalContext);
  if (!context) throw new Error(`<${part}> must be used inside <Modal>.`);
  return context;
}

/** The modal's open state and a setter, for custom triggers and actions inside `<Modal>`. */
export function useModal() {
  const { open, setOpen } = useModalContext("useModal");
  return { open, setOpen };
}

export type ModalProps = {
  /** Whether the modal is open (controlled). Use with `onOpenChange`. */
  open?: boolean;
  /** Whether the modal is open on first render (uncontrolled). */
  defaultOpen?: boolean;
  /** Called when the modal asks to open or close: trigger, close buttons, Escape, backdrop. */
  onOpenChange?: (open: boolean) => void;
  /** The maximum width, as Flowbite's `max-w-*` sizes. */
  size?: ModalSize;
  /** Where the modal sits on the screen. */
  placement?: ModalPlacement;
  /**
   * Close when the backdrop is clicked. Set it to `false` for Flowbite's static modal, which
   * only closes from its own buttons or Escape.
   */
  dismissible?: boolean;
  /** A `ModalTrigger` (optional) and the `ModalContent`. */
  children?: ReactNode;
};

/**
 * A dialog on top of the page, for notices, confirmations and short forms. Follows the WAI-ARIA
 * dialog (modal) pattern with the native `<dialog>`: focus moves into the modal and stays there,
 * the page is inert and can't scroll, Escape and the backdrop close it, and focus returns to the
 * trigger.
 */
export function Modal({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  size = "2xl",
  placement = "center",
  dismissible = true,
  children,
}: ModalProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = openProp ?? uncontrolled;
  const id = useId();
  const [hasTitle, setHasTitle] = useState(false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const value = useMemo<ModalContextValue>(
    () => ({
      open,
      setOpen,
      size,
      placement,
      dismissible,
      contentId: `${id}-modal`,
      titleId: `${id}-title`,
      hasTitle,
      setHasTitle,
    }),
    [open, setOpen, size, placement, dismissible, id, hasTitle],
  );

  return <ModalContext value={value}>{children}</ModalContext>;
}

export type ModalTriggerProps = ButtonProps & {
  /** Render your own element (its only child) as the trigger instead of a `Button`. */
  asChild?: boolean;
};

/**
 * The button that opens the modal. A `Button` (brand by default) that takes every Button option,
 * or, with `asChild`, your own element.
 */
export function ModalTrigger({ asChild = false, onClick, children, ...props }: ModalTriggerProps) {
  const { open, setOpen, contentId } = useModalContext("ModalTrigger");
  const triggerProps = {
    "aria-haspopup": "dialog" as const,
    "aria-expanded": open,
    "aria-controls": contentId,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) setOpen(true);
    },
  };
  if (asChild) return <Slot {...triggerProps}>{children}</Slot>;
  return (
    <Button {...triggerProps} {...props}>
      {children}
    </Button>
  );
}

export type ModalContentProps = Omit<ComponentProps<"dialog">, "open">;

/**
 * The modal box: a native `<dialog>`, labelled by its `ModalTitle`. Without a title, give it an
 * `aria-label`. Pass `role="alertdialog"` for a confirmation that interrupts the user.
 */
export function ModalContent({ className, children, ref, ...props }: ModalContentProps) {
  const { open, setOpen, size, placement, dismissible, contentId, titleId, hasTitle } =
    useModalContext("ModalContent");
  const dialogRef = useDialog({ open, setOpen, dismissible });

  return (
    <dialog
      id={contentId}
      ref={(node) => {
        dialogRef.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      aria-labelledby={hasTitle ? titleId : undefined}
      data-slot="modal"
      data-placement={placement}
      className={cn(modalVariants({ size, placement }), className)}
      {...props}
    >
      {children}
    </dialog>
  );
}

export type ModalHeaderProps = ComponentProps<"div">;

/** Flowbite's heading row: a `ModalTitle` and a `ModalClose`, over a divider. */
export function ModalHeader({ className, ...props }: ModalHeaderProps) {
  return (
    <div data-slot="modal-header" className={cn(modalHeaderClassName, className)} {...props} />
  );
}

export type ModalTitleProps = ComponentProps<"h2">;

/** The modal's heading. It names the dialog. */
export function ModalTitle({ className, id, children, ...props }: ModalTitleProps) {
  const { titleId, setHasTitle } = useModalContext("ModalTitle");
  useEffect(() => {
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);
  return (
    <h2
      id={id ?? titleId}
      data-slot="modal-title"
      className={cn(modalTitleClassName, className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export type ModalBodyProps = ComponentProps<"div">;

/** The modal's content between the header and the footer. */
export function ModalBody({ className, ...props }: ModalBodyProps) {
  return <div data-slot="modal-body" className={cn(modalBodyClassName, className)} {...props} />;
}

export type ModalFooterProps = ComponentProps<"div">;

/** The row of actions at the bottom of the modal, over a divider. */
export function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <div data-slot="modal-footer" className={cn(modalFooterClassName, className)} {...props} />
  );
}

export type ModalCloseProps = ComponentProps<"button"> & {
  /** Accessible name of the × button. Ignored with `asChild`. */
  label?: string;
  /**
   * Close the modal from your own element (its only child), such as a "Cancel" `Button`,
   * instead of rendering the × button.
   */
  asChild?: boolean;
};

/**
 * Closes the modal. By default Flowbite's × button in the header; with `asChild`, any button you
 * pass, such as "Decline" or "Cancel" in the footer.
 */
export function ModalClose({
  label = "Close",
  asChild = false,
  className,
  onClick,
  type = "button",
  children,
  ...props
}: ModalCloseProps) {
  const { setOpen } = useModalContext("ModalClose");
  const close = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) setOpen(false);
  };
  if (asChild) {
    return (
      <Slot className={className} onClick={close} {...props}>
        {children}
      </Slot>
    );
  }
  return (
    <button
      type={type}
      data-slot="modal-close"
      className={cn(modalCloseClassName, className)}
      onClick={close}
      {...props}
    >
      <X aria-hidden />
      <span className="sr-only">{label}</span>
    </button>
  );
}
