"use client";

import { useId } from "react";

import { Database } from "@stefan-florescu/icons";
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalTitle,
  ModalTrigger,
  Progress,
} from "@stefan-florescu/ui";

export default function ModalProgress() {
  const id = useId();
  const used = 376.3;
  const total = 500;

  return (
    <Modal size="md">
      <ModalTrigger>Toggle modal</ModalTrigger>
      <ModalContent aria-describedby={`${id}-text`}>
        <ModalClose label="Close modal" className="absolute end-2.5 top-3" />
        <Database aria-hidden className="text-fg-disabled mb-4 size-12" />
        <ModalTitle className="mb-1 font-semibold">Approaching Full Capacity</ModalTitle>
        <p id={`${id}-text`} className="text-body">
          Choosing the right server storage solution is essential for maintaining data integrity.
        </p>
        <div className="text-body mt-6 mb-1.5 flex justify-between text-sm">
          <span id={`${id}-label`} className="font-normal">
            My storage
          </span>
          <span className="font-medium">376,3 of 500 GB used</span>
        </div>
        <Progress
          value={used}
          max={total}
          variant="danger"
          size="lg"
          aria-labelledby={`${id}-label`}
          valueText="376,3 of 500 GB used"
          className="mb-6"
        />
        <div className="mt-6 flex items-center gap-4">
          <ModalClose asChild>
            <Button>Upgrade to PRO</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
        </div>
      </ModalContent>
    </Modal>
  );
}
