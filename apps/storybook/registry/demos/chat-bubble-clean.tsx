import { Avatar, ChatBubble } from "@stefan-florescu/ui";

export default function ChatBubbleClean() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Bonnie Green"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status="Delivered"
      variant="clean"
    >
      That&apos;s awesome. I think our users will really appreciate the improvements.
    </ChatBubble>
  );
}
