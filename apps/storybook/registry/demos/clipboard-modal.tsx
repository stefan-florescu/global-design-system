"use client";

import { useId } from "react";

import { Share2 } from "@stefan-florescu/icons";
import {
  Button,
  Clipboard,
  Input,
  Label,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@stefan-florescu/ui";

const url = "https://stefan-florescu.dev/components/alert";

export default function ClipboardModal() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <Modal size="lg">
      <ModalTrigger variant="secondary">
        <Share2 aria-hidden className="-ms-0.5" />
        Share course
      </ModalTrigger>
      {/* Share modal: no padding on the box, a header without a divider. */}
      <ModalContent className="p-0 shadow-xs md:p-0">
        <ModalHeader className="border-b-0 p-4 md:p-5">
          <ModalTitle>Share course</ModalTitle>
          <ModalClose
            label="Close share course"
            className="hover:bg-neutral-tertiary-medium size-8 rounded"
          />
        </ModalHeader>
        <div className="px-4 pb-4 md:px-5 md:pb-5">
          <Label htmlFor={`${id}-url`}>Share the course link below with your friends:</Label>
          <div className="relative mb-4">
            <Input id={`${id}-url`} className="text-body pe-12" readOnly value={url} />
            <Clipboard
              value={url}
              variant="ghost"
              size="sm"
              iconOnly
              showTooltip
              label="Copy course link"
              className="absolute end-1.5 top-1/2 -translate-y-1/2"
            />
          </div>
          <ModalClose asChild>
            <Button variant="secondary">Close</Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  );
}
