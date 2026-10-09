"use client";

import { useId } from "react";

import { ArrowRight, CodeXml, Database, SwatchBook, type LucideIcon } from "@stefan-florescu/icons";
import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  useModal,
} from "@stefan-florescu/ui";

const jobs: { value: string; title: string; company: string; icon: LucideIcon }[] = [
  { value: "job-1", title: "UI/UX Engineer", company: "Stefan", icon: SwatchBook },
  { value: "job-2", title: "React Developer", company: "Alphabet", icon: CodeXml },
  { value: "job-3", title: "Full Stack Engineer", company: "Apple", icon: Database },
];

function PositionForm() {
  const id = useId();
  const { setOpen } = useModal();

  return (
    <form
      className="pt-4 md:pt-6"
      onSubmit={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
    >
      <fieldset>
        <legend className="text-body mb-4">Select your desired position:</legend>
        <ul className="mb-4 space-y-4">
          {jobs.map(({ value, title, company, icon: Icon }) => (
            <li key={value}>
              {/* Visually hidden, not display: none, so the arrow keys and screen readers reach it. */}
              <input
                type="radio"
                id={`${id}-${value}`}
                name={`${id}-job`}
                value={value}
                required
                className="peer sr-only"
              />
              <label
                htmlFor={`${id}-${value}`}
                className="text-body bg-neutral-primary-soft border-default rounded-base hover:bg-neutral-secondary-medium peer-checked:border-brand-subtle peer-checked:bg-brand-softer peer-checked:text-fg-brand-strong peer-checked:hover:bg-brand-softer peer-focus-visible:outline-ring inline-flex w-full cursor-pointer items-center border p-5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-solid"
              >
                <span className="bg-brand-soft text-fg-brand-strong flex size-9 shrink-0 items-center justify-center rounded">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="ms-2.5 block">
                  <span className="block w-full text-base font-medium">{title}</span>
                  <span className="block w-full font-normal">{company}</span>
                </span>
                <ArrowRight aria-hidden className="ms-auto size-5 rtl:rotate-180" />
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <Button type="submit" fullWidth>
        Next step
        <ArrowRight aria-hidden className="-me-0.5 rtl:rotate-180" />
      </Button>
    </form>
  );
}

export default function ModalRadio() {
  return (
    <Modal size="md">
      <ModalTrigger>Toggle modal</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Open positions</ModalTitle>
          <ModalClose label="Close modal" />
        </ModalHeader>
        <PositionForm />
      </ModalContent>
    </Modal>
  );
}
