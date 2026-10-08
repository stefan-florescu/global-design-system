import { Avatar, ChatBubble } from "@stefan-florescu/ui";

export default function ChatBubbleImage() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Ana Popescu"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status="Delivered"
    >
      <p className="m-0 mb-2">This is the view from the top.</p>
      <img
        src="/images/landscape-3.svg"
        alt="Green hills under a clear sky"
        className="w-full rounded-lg"
      />
    </ChatBubble>
  );
}
