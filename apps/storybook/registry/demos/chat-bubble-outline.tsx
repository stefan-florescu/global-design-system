import { Avatar, ChatBubble } from "@stefan-florescu/ui";

export default function ChatBubbleOutline() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Ana Popescu"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status="Delivered"
      variant="outline"
    >
      That&apos;s awesome. I think our users will really appreciate the improvements.
    </ChatBubble>
  );
}
