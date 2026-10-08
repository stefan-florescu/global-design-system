import { Download, FileText } from "@stefan-florescu/icons";
import { Avatar, Button, ChatBubble } from "@stefan-florescu/ui";

export default function ChatBubbleFile() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Ana Popescu"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status="Delivered"
    >
      <div className="bg-background flex items-center gap-3 rounded-lg p-2">
        <FileText aria-hidden className="text-muted-foreground size-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="m-0 truncate font-medium">Design tokens guide</p>
          <p className="text-muted-foreground m-0 text-xs">12 pages · 1.8 MB · PDF</p>
        </div>
        <Button variant="ghost" size="sm" iconOnly aria-label="Download Design tokens guide">
          <Download aria-hidden />
        </Button>
      </div>
    </ChatBubble>
  );
}
