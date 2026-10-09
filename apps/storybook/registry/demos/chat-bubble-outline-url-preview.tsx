import { Avatar, ChatBubble, ChatBubbleMenu, ChatBubbleMenuItem } from "@stefan-florescu/ui";

export default function ChatBubbleOutlineUrlPreview() {
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
      <p className="py-2.5">
        Check out this open-source UI component library based on Tailwind CSS:
      </p>
      <p className="pb-2.5">
        <a
          href="https://github.com/themesberg/flowbite"
          className="text-fg-brand font-medium break-all underline hover:no-underline"
        >
          https://github.com/themesberg/flowbite
        </a>
      </p>
      <a
        href="https://github.com/themesberg/flowbite"
        className="rounded-base bg-neutral-tertiary hover:bg-neutral-quaternary mb-2 block p-4"
      >
        <img src="/images/landscape-5.svg" alt="" className="rounded-base mb-2" />
        <span className="text-heading text-sm font-medium">
          GitHub - themesberg/flowbite: The most popular and open source libra ...
        </span>
        <span className="text-body mt-2 block text-xs font-normal">github.com</span>
      </a>
    </ChatBubble>
  );
}
