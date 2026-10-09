"use client";

import { useId, useState } from "react";

import { Calendar as CalendarIcon, Clock, MapPin } from "@stefan-florescu/icons";
import { Avatar, AvatarGroup, AvatarGroupCounter, Button, Calendar } from "@stefan-florescu/ui";

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

export default function TimepickerInline() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full">
      <h2 className="text-heading mb-2 text-xl font-semibold">Digital Transformation</h2>
      <div className="mb-3 flex items-center gap-4">
        <div className="flex items-center">
          <CalendarIcon aria-hidden className="text-body me-1 size-5" />
          <span className="text-heading text-base font-medium">30.06.2024</span>
        </div>
        <div className="flex items-center">
          <MapPin aria-hidden className="text-body me-1 size-5" />
          <span className="text-heading text-base font-medium">California, USA</span>
        </div>
      </div>
      <div className="mb-5 flex items-start gap-2">
        <div>
          <div className="text-body mb-2 text-base font-normal">Participants</div>
          <AvatarGroup className="-space-x-2">
            <Avatar src="/avatars/1.svg" alt="Ana Popescu" size="sm" stacked />
            <Avatar src="/avatars/2.svg" alt="Mihai Ionescu" size="sm" stacked />
            <Avatar src="/avatars/3.svg" alt="Elena Dumitru" size="sm" stacked />
            <AvatarGroupCounter
              href="/components/avatar"
              aria-label="99 more participants"
              className="size-8 text-xs"
            >
              +99
            </AvatarGroupCounter>
          </AvatarGroup>
        </div>
        <div>
          <div className="text-body mb-3 text-base font-normal">Duration</div>
          <span className="text-heading block text-base font-medium">30 min</span>
        </div>
        <div>
          <div className="text-body mb-3 text-base font-normal">Meeting Type</div>
          <span className="text-heading block text-base font-medium">Web conference</span>
        </div>
      </div>
      <div className="border-default flex flex-col border-t pt-5 sm:flex-row sm:gap-5">
        <Calendar
          aria-label="Meeting date"
          defaultValue={new Date(2024, 5, 30)}
          defaultMonth={new Date(2024, 5, 1)}
          className="mx-auto sm:mx-0"
        />
        <div className="border-default mt-5 w-full sm:ms-7 sm:mt-0 sm:max-w-[15rem] sm:border-s sm:ps-5">
          <h3 className="text-heading mb-3 text-center text-base font-medium">
            Wednesday 30 June 2024
          </h3>
          <Button
            variant="secondary"
            fullWidth
            aria-expanded={open}
            aria-controls={`${id}-timetable`}
            onClick={() => setOpen((value) => !value)}
          >
            <Clock aria-hidden className="-ms-0.5" />
            Pick a time
          </Button>
          <fieldset id={`${id}-timetable`} hidden={!open} className="mt-5">
            <legend className="sr-only">Pick a time</legend>
            <ul className="grid w-full grid-cols-2 gap-2">
              {times.map((time) => (
                <li key={time}>
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
                    className="bg-neutral-primary text-fg-brand border-brand hover:bg-brand-strong hover:text-brand-foreground peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground peer-focus-visible:outline-ring rounded-base inline-flex w-full cursor-pointer items-center justify-center border p-2 text-center text-sm font-medium peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-solid"
                  >
                    {time}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
