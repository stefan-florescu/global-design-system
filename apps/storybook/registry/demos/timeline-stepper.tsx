import { Calendar } from "@stefan-florescu/icons";
import {
  Badge,
  Button,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "@stefan-florescu/ui";

const releases = [
  { date: "2025-01-09", label: "January 09th, 2025", title: "Flowbite Library v1.0.0" },
  { date: "2025-03-14", label: "March 14th, 2025", title: "Flowbite Library v1.2.0" },
  { date: "2025-09-26", label: "September 26th, 2025", title: "Flowbite Library v1.3.0" },
];

export default function TimelineStepper() {
  return (
    <Timeline horizontal>
      {releases.map(({ date, label, title }) => (
        <TimelineItem key={title}>
          <TimelinePoint icon={<Calendar />} />
          <TimelineContent>
            <TimelineTime dateTime={date}>
              <Badge variant="gray" bordered>
                {label}
              </Badge>
            </TimelineTime>
            <TimelineTitle headingLevel={4}>{title}</TimelineTitle>
            <TimelineBody>
              Get started with dozens of web components and interactive elements.
            </TimelineBody>
            <Button variant="secondary" size="sm" aria-label={`Read more about ${title}`}>
              Read more
            </Button>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
