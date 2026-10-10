import { Calendar, FileArchive } from "@stefan-florescu/icons";
import {
  Badge,
  buttonVariants,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "@stefan-florescu/ui";

export default function TimelineVertical() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelinePoint icon={<Calendar />} />
        <TimelineContent>
          <TimelineTime dateTime="2025-03-13">
            <Badge variant="gray" bordered>
              March 13th, 2025
            </Badge>
          </TimelineTime>
          <TimelineTitle headingLevel={4} className="flex items-center">
            Stefan DS Application UI v2.0.0
            <Badge bordered className="ms-2">
              Latest
            </Badge>
          </TimelineTitle>
          <TimelineBody>
            Get access to over 20+ pages including a dashboard layout, charts, kanban board,
            calendar, and pre-order E-commerce & Marketing pages.
          </TimelineBody>
          <a href="/changelog" className={buttonVariants({ variant: "secondary" })}>
            <FileArchive aria-hidden className="-ms-0.5" />
            Download ZIP
          </a>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint icon={<Calendar />} />
        <TimelineContent>
          <TimelineTime dateTime="2025-01-09">
            <Badge variant="gray" bordered>
              January 09th, 2025
            </Badge>
          </TimelineTime>
          <TimelineTitle headingLevel={4}>Stefan DS Figma v1.3.0</TimelineTitle>
          <TimelineBody>
            All of the pages and components are first designed in Figma and we keep a parity between
            the two versions even as we update the project.
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint icon={<Calendar />} />
        <TimelineContent>
          <TimelineTime dateTime="2024-10-14">
            <Badge variant="gray" bordered>
              October 14th, 2024
            </Badge>
          </TimelineTime>
          <TimelineTitle headingLevel={4}>Stefan DS Library v1.2.2</TimelineTitle>
          <TimelineBody>
            Get started with dozens of web components and interactive elements built on top of
            Tailwind CSS.
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
