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
        <div
          role="progressbar"
          aria-labelledby={`${id}-label`}
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuetext="376,3 of 500 GB used"
          className="bg-neutral-quaternary mb-6 h-2.5 w-full rounded-full"
        >
          <div
            className="bg-danger h-2.5 rounded-full"
            style={{ width: `${(used / total) * 100}%` }}
          />
        </div>
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
