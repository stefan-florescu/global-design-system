import { Download } from "@stefan-florescu/icons";
import {
  Avatar,
  ChatBubble,
  ChatBubbleMenu,
  ChatBubbleMenuItem,
  Tooltip,
} from "@stefan-florescu/ui";

export default function ChatBubbleGallery() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Bonnie Green"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status={
        <span className="flex items-center justify-between">
          Delivered
          <button
            type="button"
            className="text-fg-brand focus-visible:outline-ring inline-flex items-center text-sm font-medium outline-hidden hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          >
            <Download aria-hidden className="me-1.5 size-4" />
            Save all
          </button>
        </span>
      }
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
      <p>This is the new office &lt;3</p>
      <div className="mt-2.5 grid grid-cols-2 gap-4">
        <div className="group relative">
          <div className="rounded-base bg-dark-backdrop/50 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
            <Tooltip content="Download image">
              <button
                type="button"
                aria-label="Download Blue hills under a pale sun"
                className="bg-dark-foreground/30 hover:bg-dark-foreground/50 focus:ring-dark-foreground inline-flex size-8 items-center justify-center rounded-full focus:ring-4 focus:outline-none"
              >
                <Download aria-hidden className="text-dark-foreground size-5" />
              </button>
            </Tooltip>
          </div>
          <img
            src="/images/landscape-1.svg"
            alt="Blue hills under a pale sun"
            className="rounded-base"
          />
        </div>
        <div className="group relative">
          <div className="rounded-base bg-dark-backdrop/50 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
            <Tooltip content="Download image">
              <button
                type="button"
                aria-label="Download Green hills at noon"
                className="bg-dark-foreground/30 hover:bg-dark-foreground/50 focus:ring-dark-foreground inline-flex size-8 items-center justify-center rounded-full focus:ring-4 focus:outline-none"
              >
                <Download aria-hidden className="text-dark-foreground size-5" />
              </button>
            </Tooltip>
          </div>
          <img src="/images/landscape-2.svg" alt="Green hills at noon" className="rounded-base" />
        </div>
        <div className="group relative">
          <div className="rounded-base bg-dark-backdrop/50 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
            <Tooltip content="Download image">
              <button
                type="button"
                aria-label="Download Rolling hills and a lake"
                className="bg-dark-foreground/30 hover:bg-dark-foreground/50 focus:ring-dark-foreground inline-flex size-8 items-center justify-center rounded-full focus:ring-4 focus:outline-none"
              >
                <Download aria-hidden className="text-dark-foreground size-5" />
              </button>
            </Tooltip>
          </div>
          <img
            src="/images/landscape-3.svg"
            alt="Rolling hills and a lake"
            className="rounded-base"
          />
        </div>
        <div className="group relative">
          <button
            type="button"
            aria-label="Show 7 more images"
            className="rounded-base bg-brand/90 hover:bg-brand/30 focus-visible:outline-ring absolute inset-0 flex items-center justify-center outline-hidden transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid motion-reduce:transition-none"
          >
            <span className="text-brand-foreground text-xl font-medium">+7</span>
          </button>
          <img src="/images/landscape-4.svg" alt="" className="rounded-base" />
        </div>
      </div>
    </ChatBubble>
  );
}
