import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  chatBubbleBodyVariants,
  chatBubbleContentVariants,
  chatBubbleHeaderClassName,
  chatBubbleMetaClassName,
  chatBubbleNameClassName,
  chatBubbleSurfaceVariants,
  chatBubbleVariants,
  type ChatBubbleVariantProps,
} from "./chat-bubble.variants";

export type ChatBubbleProps = ComponentProps<"div"> &
  ChatBubbleVariantProps & {
    /** The sender's avatar, for example `<Avatar size="sm" … />`. */
    avatar?: ReactNode;
    /** The sender's name. */
    name?: ReactNode;
    /** When the message was sent, as shown, such as "11:46". */
    time?: string;
    /** Machine-readable time for `<time dateTime>`, such as "2026-10-08T11:46". */
    dateTime?: string;
    /** Delivery status under the message, such as "Delivered". Can be a row with actions. */
    status?: ReactNode;
    /** Shown next to the bubble, such as a `ChatBubbleMenu`. */
    actions?: ReactNode;
  };

/**
 * One message in a conversation: avatar, sender, time, content, status and actions. Put a
 * conversation in a container with `role="log"` so new messages are announced.
 */
export function ChatBubble({
  avatar,
  name,
  time,
  dateTime,
  status,
  actions,
  variant,
  align,
  className,
  children,
  ...props
}: ChatBubbleProps) {
  const header =
    name || time ? (
      <div className={chatBubbleHeaderClassName}>
        {name ? <span className={chatBubbleNameClassName}>{name}</span> : null}
        {time ? (
          <time dateTime={dateTime} className={chatBubbleMetaClassName}>
            {time}
          </time>
        ) : null}
      </div>
    ) : null;
  const content = <div className={chatBubbleContentVariants({ variant })}>{children}</div>;

  return (
    <div
      data-slot="chat-bubble"
      className={cn(chatBubbleVariants({ align }), className)}
      {...props}
    >
      {avatar}
      <div className={chatBubbleBodyVariants({ variant, align })}>
        {header}
        {variant === "outline" ? (
          <div className={chatBubbleSurfaceVariants({ align })}>{content}</div>
        ) : (
          content
        )}
        {status ? <div className={chatBubbleMetaClassName}>{status}</div> : null}
      </div>
      {actions}
    </div>
  );
}
