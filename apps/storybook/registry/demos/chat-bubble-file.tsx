import { Download, FileText } from "@stefan-florescu/icons";
import { Avatar, ChatBubble, ChatBubbleMenu, ChatBubbleMenuItem } from "@stefan-florescu/ui";

export default function ChatBubbleFile() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Bonnie Green"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status="Delivered"
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
      <div className="rounded-base bg-neutral-tertiary flex items-start p-2">
        <div className="me-1.5">
          <span className="text-heading flex items-center gap-2 pb-2 text-sm font-medium">
            <FileText aria-hidden className="size-5 shrink-0" />
            Flowbite Terms &amp; Conditions
          </span>
          <span className="text-heading flex gap-2 text-xs font-normal">
            12 Pages
            <span aria-hidden className="bg-body-subtle size-0.75 self-center rounded-full" />
            18 MB
            <span aria-hidden className="bg-body-subtle size-0.75 self-center rounded-full" />
            PDF
          </span>
        </div>
        <div className="inline-flex items-center self-center">
          <button
            type="button"
            aria-label="Download Flowbite Terms &amp; Conditions"
            className="text-heading bg-neutral-tertiary hover:bg-neutral-quaternary focus:ring-neutral-quaternary rounded-base focus-visible:outline-ring box-border border border-transparent p-2 leading-5 font-medium outline-hidden focus:ring-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
          >
            <Download aria-hidden className="size-5" />
          </button>
        </div>
      </div>
    </ChatBubble>
  );
}
