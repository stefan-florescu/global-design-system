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
          <ol className="border-default relative ms-3.5 mb-4 border-s md:mb-5">
            {releases.map(({ title, text, action }, index) => (
              <li key={title} className={index < releases.length - 1 ? "ms-6 mb-11" : "ms-6"}>
                <span className="bg-brand-softer text-fg-brand ring-buffer-medium absolute -start-3 flex size-6 items-center justify-center rounded-full ring-8">
                  <Calendar aria-hidden className="size-3" />
                </span>
                <h3 className="text-heading my-2 flex items-start text-lg font-semibold">
                  {title}
                </h3>
                <p className="text-body mb-5">{text}</p>
                <Button variant="secondary" size="sm">
                  {action === "Download" ? (
                    <Download aria-hidden className="-ms-0.5" />
                  ) : (
                    <Copy aria-hidden className="-ms-0.5" />
                  )}
                  {action}
                </Button>
              </li>
            ))}
          </ol>
        </ModalBody>
        <Button fullWidth>My Downloads</Button>
      </ModalContent>
    </Modal>
  );
}
