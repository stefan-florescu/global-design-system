import { CirclePause } from "@stefan-florescu/icons";
import { Avatar, ChatBubble } from "@stefan-florescu/ui";

// Waveform bars: x, y and height in the 185 × 40 viewBox.
const bars = [
  [0, 17, 6],
  [7, 15.5, 9],
  [21, 6.5, 27],
  [14, 6.5, 27],
  [28, 3, 34],
  [35, 3, 34],
  [42, 5.5, 29],
  [49, 10, 20],
  [56, 13.5, 13],
  [63, 16, 8],
  [70, 12.5, 15],
  [77, 3, 34],
  [84, 3, 34],
  [91, 0.5, 39],
  [98, 0.5, 39],
  [105, 2, 36],
  [112, 6.5, 27],
  [119, 9, 22],
  [126, 11.5, 17],
  [133, 2, 36],
  [140, 2, 36],
  [147, 7, 26],
  [154, 9, 22],
  [161, 9, 22],
  [168, 13.5, 13],
  [175, 16, 8],
  [182, 17.5, 5],
] as const;

export default function ChatBubbleCleanVoiceNote() {
  return (
    <ChatBubble
      avatar={<Avatar src="/avatars/1.svg" alt="" size="sm" />}
      name="Bonnie Green"
      time="11:46"
      dateTime="2026-10-08T11:46"
      status="Delivered"
      variant="clean"
    >
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Pause voice note"
          className="text-body hover:text-heading focus-visible:outline-ring inline-flex items-center self-center rounded-full outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid"
        >
          <CirclePause aria-hidden className="size-6" />
        </button>
        <svg
          aria-hidden
          className="text-fg-brand w-36 md:h-10 md:w-46"
          viewBox="0 0 185 40"
          fill="none"
        >
          {bars.map(([x, y, height], index) => (
            <rect
              key={x}
              x={x}
              y={y}
              width="3"
              height={height}
              rx="1.5"
              className={index < 10 ? "fill-body-subtle" : "fill-neutral-quaternary"}
            />
          ))}
          <rect x="66" y="16" width="8" height="8" rx="4" fill="currentColor" />
        </svg>
        <span className="text-heading inline-flex items-center self-center text-sm font-medium">
          3:42
        </span>
      </div>
    </ChatBubble>
  );
}
