import { Reply } from "@stefan-florescu/icons";
import {
  Avatar,
  Badge,
  Button,
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
} from "@stefan-florescu/ui";

const card = "rounded-base border border-default bg-neutral-primary-soft p-4 shadow-xs";
const link = "font-medium text-heading hover:underline";

export default function TimelineActivityLog() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelinePoint>
          <Avatar src="/avatars/3.svg" size="xs" className="shadow-lg" />
        </TimelinePoint>
        <TimelineContent className={`${card} items-center justify-between sm:flex`}>
          <TimelineTime dateTime="2025-01-15T14:00" className="mb-1 block sm:order-last sm:mb-0">
            <Badge bordered>just now</Badge>
          </TimelineTime>
          <div className="text-body">
            <a href="#activity-log" className={link}>
              Bonnie Green
            </a>{" "}
            moved{" "}
            <a href="#activity-log" className={link}>
              Jese Leos
            </a>{" "}
            to{" "}
            <Badge variant="gray" bordered>
              Funny Group
            </Badge>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint>
          <Avatar src="/avatars/5.svg" size="xs" className="shadow-lg" />
        </TimelinePoint>
        <TimelineContent className={card}>
          <div className="mb-3 items-center justify-between sm:flex">
            <TimelineTime dateTime="2025-01-15T12:00" className="mb-1 block sm:order-last sm:mb-0">
              <Badge bordered>2 hours ago</Badge>
            </TimelineTime>
            <div className="text-body">
              Thomas Lean commented on{" "}
              <a href="#activity-log" className={link}>
                Stefan DS Pro
              </a>
            </div>
          </div>
          <blockquote className="rounded-base border-default-medium bg-neutral-secondary-medium text-body border p-3 text-xs font-normal italic">
            Hi ya&apos;ll! I wanted to share a webinar zeroheight is having regarding how to best
            measure your design system! This is the second session of our new webinar series on
            #DesignSystems discussions where we&apos;ll be speaking about Measurement.
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <Button variant="secondary" size="sm">
              View comment
            </Button>
            <Button size="sm">
              <Reply aria-hidden className="-ms-0.5" />
              Reply
            </Button>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint>
          <Avatar src="/avatars/1.svg" size="xs" className="shadow-lg" />
        </TimelinePoint>
        <TimelineContent className={`${card} items-center justify-between sm:flex`}>
          <TimelineTime dateTime="2025-01-15T11:00" className="mb-1 block sm:order-last sm:mb-0">
            <Badge bordered>3 hours ago</Badge>
          </TimelineTime>
          <div className="text-body">
            <a href="#activity-log" className={link}>
              Bonnie Green
            </a>{" "}
            moved{" "}
            <a href="#activity-log" className={link}>
              Jese Leos
            </a>{" "}
            to{" "}
            <Badge variant="gray" bordered>
              Funny Group
            </Badge>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
