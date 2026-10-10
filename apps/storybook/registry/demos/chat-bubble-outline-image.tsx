import { Download } from "@stefan-florescu/icons";
import {
  Avatar,
  ChatBubble,
  ChatBubbleMenu,
  ChatBubbleMenuItem,
  Tooltip,
} from "@stefan-florescu/ui";

export default function ChatBubbleOutlineImage() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Bonnie Green"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status="Delivered"
      variant="outline"
      actions={
        <ChatBubbleMenu>
          <ChatBubbleMenuItem>Reply</ChatBubbleMenuItem>
          <ChatBubbleMenuItem>Forward</ChatBubbleMenuItem>
          <ChatBubbleMenuItem>Copy</ChatBubbleMenuItem>
          <ChatBubbleMenuItem>Report</ChatBubbleMenuItem>
          <ChatBubbleMenuItem>Delete</ChatBubbleMenuItem>
        </ChatBubbleMenu>
      }
    >
      <p>I&apos;m working from home today! 😅</p>
      <div className="group relative my-2.5">
        <div className="rounded-base bg-dark-backdrop/50 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
          <Tooltip content="Download image">
            <button
              type="button"
              aria-label="Download Green hills at noon"
              className="bg-dark-foreground/30 hover:bg-dark-foreground/50 focus:ring-dark-foreground inline-flex size-10 items-center justify-center rounded-full focus:ring-4 focus:outline-none"
            >
              <Download aria-hidden className="text-dark-foreground size-5" />
            </button>
          </Tooltip>
        </div>
        <img src="/images/landscape-2.svg" alt="Green hills at noon" className="rounded-base" />
      </div>
    </ChatBubble>
  );
}
