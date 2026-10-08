import { Avatar, ChatBubble } from "@stefan-florescu/ui";

export default function ChatBubbleConversation() {
  return (
    <div
      role="log"
      aria-label="Chat with Ana Popescu"
      className="flex w-full max-w-md flex-col gap-4"
    >
      <ChatBubble
        avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
        name="Ana Popescu"
        time="11:46"
        dateTime="2026-10-08T11:46"
      >
        Are the new layer tokens ready?
      </ChatBubble>
      <ChatBubble
        align="end"
        avatar={<Avatar src="/avatars/2.svg" alt="" size="sm" />}
        name="Mihai Ionescu"
        time="11:48"
        dateTime="2026-10-08T11:48"
        status="Seen"
      >
        Yes, they shipped this morning. Banner and Bottom Navigation already use them.
      </ChatBubble>
    </div>
  );
}
