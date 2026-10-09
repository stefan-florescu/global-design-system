"use client";

import { useId } from "react";

import { Clock } from "@stefan-florescu/icons";
import {
  Button,
  Calendar,
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  useModal,
} from "@stefan-florescu/ui";

const times = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 AM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
];

function AppointmentForm() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const { setOpen } = useModal();

  return (
    <form
      className="p-4 pt-0"
      onSubmit={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
    >
      <div className="my-5 flex justify-center">
        <Calendar
          aria-label="Appointment date"
          defaultValue={new Date(2024, 5, 30)}
          defaultMonth={new Date(2024, 5, 1)}
        />
      </div>
      <fieldset className="mb-5">
        <legend className="text-heading mb-2 block text-sm font-medium">Pick your time</legend>
        <ul className="grid w-full grid-cols-3 gap-2">
          {times.map((time) => (
            <li key={time}>
              {/* Visually hidden, not display: none, so the arrow keys and screen readers reach it. */}
              <input
                type="radio"
                id={`${id}-${time}`}
                name={`${id}-timetable`}
                value={time}
                defaultChecked={time === "12:00 AM"}
                className="peer sr-only"
              />
              <label
                htmlFor={`${id}-${time}`}
                className="bg-neutral-primary-soft text-fg-brand border-brand hover:bg-brand-strong hover:text-brand-foreground peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground peer-focus-visible:outline-ring rounded-base inline-flex w-full cursor-pointer items-center justify-center border p-2 text-center text-sm font-medium peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-solid"
              >
                {time}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className="grid grid-cols-2 gap-2">
        <Button type="submit">Save</Button>
        <ModalClose asChild>
          <Button variant="secondary">Discard</Button>
        </ModalClose>
      </div>
    </form>
  );
}

export default function TimepickerModal() {
  return (
    <Modal>
      <ModalTrigger variant="secondary">
        <Clock aria-hidden className="-ms-0.5" />
        Schedule appointment
      </ModalTrigger>
      {/* Flowbite's 368px box, without a border or shadow, split into padded sections. */}
      <ModalContent className="max-w-[23rem] border-0 p-0 shadow-none md:p-0">
        <ModalHeader className="p-4 md:p-4">
          <ModalTitle className="text-base">Schedule an appointment</ModalTitle>
          <ModalClose label="Close appointment" />
        </ModalHeader>
        <AppointmentForm />
      </ModalContent>
    </Modal>
  );
}
