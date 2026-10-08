import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/cn";

import {
  chatBubbleBodyVariants,
  chatBubbleMetaClassName,
  chatBubbleMutedClassName,
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
    /** Delivery status shown under the message, such as "Delivered". */
    status?: ReactNode;
  };

/**
 * One message in a conversation: avatar, sender, time, content and status. Put a conversation
 * in a container with `role="log"` so new messages are announced.
 */
export function ChatBubble({
  avatar,
  name,
  time,
  dateTime,
  status,
  variant,
  align,
  className,
  children,
  ...props
}: ChatBubbleProps) {
  return (
    <div
      data-slot="chat-bubble"
      className={cn(chatBubbleVariants({ align }), className)}
      {...props}
    >
      {avatar}
      <div className={chatBubbleBodyVariants({ variant, align })}>
        {name || time ? (
          <div className={chatBubbleMetaClassName}>
            {name ? <span className="font-semibold">{name}</span> : null}
            {time ? (
              <time dateTime={dateTime} className={chatBubbleMutedClassName}>
                {time}
              </time>
            ) : null}
          </div>
        ) : null}
        <div className="py-1.5">{children}</div>
        {status ? <span className={chatBubbleMutedClassName}>{status}</span> : null}
      </div>
    </div>
  );
}
