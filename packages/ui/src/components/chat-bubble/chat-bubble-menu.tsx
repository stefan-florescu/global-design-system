"use client";

import { EllipsisVertical } from "@stefan-florescu/icons";
import { useId, type ComponentProps, type CSSProperties } from "react";

import { cn } from "../../lib/cn";

import {
  chatBubbleActionClassName,
  chatBubbleMenuClassName,
  chatBubbleMenuItemClassName,
  chatBubbleMenuListClassName,
} from "./chat-bubble.variants";

export type ChatBubbleMenuProps = Omit<ComponentProps<"div">, "popover"> & {
  /** Accessible name of the "more" button. */
  label?: string;
};

/**
 * The "more" button next to a chat bubble and the list of actions it opens (Flowbite's dots
 * dropdown). Uses the native popover: Escape and a click outside close it, and Tab moves from the
 * button into the actions. Pass it to `ChatBubble`'s `actions`.
 */
export function ChatBubbleMenu({
  label = "Message actions",
  className,
  children,
  ...props
}: ChatBubbleMenuProps) {
  const id = useId();
  const menuId = `${id}-menu`;
  const anchor = `--chat-bubble-menu-${id.replace(/[^\w-]/g, "")}`;

  return (
    <>
      <button
        type="button"
        aria-label={label}
        popoverTarget={menuId}
        className={chatBubbleActionClassName}
        style={{ anchorName: anchor } as CSSProperties}
      >
        <EllipsisVertical aria-hidden />
      </button>
      <div
        id={menuId}
        popover="auto"
        className={cn(chatBubbleMenuClassName, className)}
        style={{ positionAnchor: anchor } as CSSProperties}
        {...props}
      >
        <ul className={chatBubbleMenuListClassName}>{children}</ul>
      </div>
    </>
  );
}

export type ChatBubbleMenuItemProps = ComponentProps<"button">;

/** One action in a `ChatBubbleMenu`, such as "Reply". Closes the menu when chosen. */
export function ChatBubbleMenuItem({
  className,
  onClick,
  type = "button",
  ...props
}: ChatBubbleMenuItemProps) {
  return (
    <li>
      <button
        type={type}
        className={cn(chatBubbleMenuItemClassName, className)}
        onClick={(event) => {
          onClick?.(event);
          event.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover?.();
        }}
        {...props}
      />
    </li>
  );
}
