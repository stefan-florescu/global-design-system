import { ArrowRight } from "@stefan-florescu/icons";
import {
  buttonVariants,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "@stefan-florescu/ui";

export default function TimelineDemo() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime dateTime="2022-02">February 2022</TimelineTime>
          <TimelineTitle headingLevel={4}>Application UI code in Tailwind CSS</TimelineTitle>
          <TimelineBody>
            Get access to over 20+ pages including a dashboard layout, charts, kanban board,
            calendar, and pre-order E-commerce & Marketing pages.
          </TimelineBody>
          <a href="/changelog" className={buttonVariants({ variant: "secondary" })}>
            Learn more
            <ArrowRight aria-hidden className="-me-0.5" />
          </a>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime dateTime="2022-03">March 2022</TimelineTime>
          <TimelineTitle headingLevel={4}>Marketing UI design in Figma</TimelineTitle>
          <TimelineBody>
            All of the pages and components are first designed in Figma and we keep a parity between
            the two versions even as we update the project.
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent>
          <TimelineTime dateTime="2022-04">April 2022</TimelineTime>
          <TimelineTitle headingLevel={4}>E-Commerce UI code in Tailwind CSS</TimelineTitle>
          <TimelineBody>
            Get started with dozens of web components and interactive elements built on top of
            Tailwind CSS.
          </TimelineBody>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
