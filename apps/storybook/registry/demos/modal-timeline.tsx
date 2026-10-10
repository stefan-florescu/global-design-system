import { Calendar, Copy, Download } from "@stefan-florescu/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTitle,
} from "@stefan-florescu/ui";

const releases = [
  {
    title: "Stefan Figma Design System v.2.10",
    text: "500+ components & over 50 new pages",
    action: "Download",
  },
  { title: "Stefan Application UI", text: "Over 70 new pages", action: "Download" },
  {
    title: "Stefan Design System Free",
    text: "All atomic components and variables",
    action: "Duplicate in Figma",
  },
];

export default function ModalTimeline() {
  return (
    <Modal size="lg">
      <ModalTrigger>Toggle modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Changelog</ModalTitle>
          <ModalClose label="Close modal" />
        </ModalHeader>
        <ModalBody>
          <Timeline className="ms-3.5 mb-4 md:mb-5">
            {releases.map(({ title, text, action }) => (
              <TimelineItem key={title} className="mb-11">
                {/* The modal is a raised surface, so the ring matches it (buffer-medium). */}
                <TimelinePoint icon={<Calendar />} className="text-fg-brand ring-buffer-medium" />
                <TimelineContent>
                  <TimelineTitle className="flex items-start">{title}</TimelineTitle>
                  <TimelineBody className="not-last:mb-5">{text}</TimelineBody>
                  <Button variant="secondary" size="sm">
                    {action === "Download" ? (
                      <Download aria-hidden className="-ms-0.5" />
                    ) : (
                      <Copy aria-hidden className="-ms-0.5" />
                    )}
                    {action}
                  </Button>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </ModalBody>
        <Button fullWidth>My Downloads</Button>
      </ModalContent>
    </Modal>
  );
}
