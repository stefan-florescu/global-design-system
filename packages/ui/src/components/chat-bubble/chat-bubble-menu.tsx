"use client";

import { EllipsisVertical } from "@stefan-florescu/icons";

import { cn } from "../../lib/cn";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  type DropdownItemProps,
  type DropdownMenuProps,
  type DropdownPlacement,
  type DropdownProps,
} from "../dropdown";

import {
  chatBubbleActionClassName,
  chatBubbleMenuClassName,
  chatBubbleMenuItemClassName,
} from "./chat-bubble.variants";

export type ChatBubbleMenuProps = DropdownMenuProps &
  Pick<DropdownProps, "open" | "defaultOpen" | "onOpenChange"> & {
    /** Accessible name of the "more" button. */
    label?: string;
    /** Where the menu opens, as on `Dropdown`. Defaults to `bottom-start`. */
    placement?: DropdownPlacement;
  };

/**
 * The "more" button next to a chat bubble and the menu of actions it opens, built
 * on `Dropdown`: a WAI-ARIA menu button with arrow keys, Home, End, typeahead,
 * and Escape returning focus to the button. Pass it to `ChatBubble`'s `actions`.
 */
export function ChatBubbleMenu({
  label = "Message actions",
  placement = "bottom-start",
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
  ...props
}: ChatBubbleMenuProps) {
  return (
    <Dropdown
      placement={placement}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <DropdownTrigger asChild>
        <button type="button" aria-label={label} className={chatBubbleActionClassName}>
          <EllipsisVertical aria-hidden />
        </button>
      </DropdownTrigger>
      <DropdownMenu className={cn(chatBubbleMenuClassName, className)} {...props}>
        {children}
      </DropdownMenu>
    </Dropdown>
  );
}

export type ChatBubbleMenuItemProps = DropdownItemProps;

/**
 * One action in a `ChatBubbleMenu`, such as "Reply": a `DropdownItem` (`menuitem`) that closes
 * the menu and returns focus to the "more" button when chosen. Pass `href` to render a link.
 */
export function ChatBubbleMenuItem({ className, ...props }: ChatBubbleMenuItemProps) {
  return <DropdownItem className={cn(chatBubbleMenuItemClassName, className)} {...props} />;
}
