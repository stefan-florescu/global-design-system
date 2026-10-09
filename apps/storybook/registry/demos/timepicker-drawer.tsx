"use client";

import { useEffect, useId, useState } from "react";

import { Clock, Plus, Trash2 } from "@stefan-florescu/icons";
import {
  Button,
  Checkbox,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Label,
  Select,
  Timepicker,
  Toggle,
  useDrawer,
} from "@stefan-florescu/ui";

const timezones = [
  ["America/New_York", "EST (Eastern Standard Time) - GMT-5 (New York)"],
  ["America/Los_Angeles", "PST (Pacific Standard Time) - GMT-8 (Los Angeles)"],
  ["Europe/London", "GMT (Greenwich Mean Time) - GMT+0 (London)"],
  ["Europe/Paris", "CET (Central European Time) - GMT+1 (Paris)"],
  ["Asia/Tokyo", "JST (Japan Standard Time) - GMT+9 (Tokyo)"],
  ["Australia/Sydney", "AEDT (Australian Eastern Daylight Time) - GMT+11 (Sydney)"],
  ["Canada/Mountain", "MST (Mountain Standard Time) - GMT-7 (Canada)"],
  ["Canada/Central", "CST (Central Standard Time) - GMT-6 (Canada)"],
  ["Canada/Eastern", "EST (Eastern Standard Time) - GMT-5 (Canada)"],
  ["Europe/Berlin", "CET (Central European Time) - GMT+1 (Berlin)"],
  ["Asia/Dubai", "GST (Gulf Standard Time) - GMT+4 (Dubai)"],
  ["Asia/Singapore", "SGT (Singapore Standard Time) - GMT+8 (Singapore)"],
];

const week = [
  { value: "monday", short: "Mon", name: "Monday" },
  { value: "tuesday", short: "Tue", name: "Tuesday" },
  { value: "wednesday", short: "Wed", name: "Wednesday" },
  { value: "thursday", short: "Thu", name: "Thursday" },
  { value: "friday", short: "Fri", name: "Friday" },
  { value: "saturday", short: "Sat", name: "Saturday" },
  { value: "sunday", short: "Sun", name: "Sunday" },
];

// Flowbite's delete button: a small icon button on the drawer background.
const deleteButton =
  "inline-flex cursor-pointer items-center rounded-base p-1.5 text-body hover:bg-neutral-tertiary hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-ring outline-hidden";

function ScheduleForm() {
  const id = useId();
  const { setOpen } = useDrawer();
  // One interval per day; Monday to Friday at first.
  const [days, setDays] = useState(week.slice(0, 5).map((day) => day.value));
  const missing = week.find((day) => !days.includes(day.value));
  // Adding a row focuses it; deleting one focuses "Add interval", so focus is never lost.
  const [focusTarget, setFocusTarget] = useState<{ id: string }>();
  useEffect(() => {
    if (focusTarget) document.getElementById(focusTarget.id)?.focus();
  }, [focusTarget]);

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        setOpen(false);
      }}
    >
      <div className="border-default-medium bg-neutral-secondary-medium mb-6 rounded-lg border p-4">
        <div className="mb-3 flex items-center justify-between">
          <span id={`${id}-hours`} className="text-heading text-base font-medium">
            Business hours
          </span>
          <Toggle aria-labelledby={`${id}-hours`} aria-describedby={`${id}-hours-help`} />
        </div>
        <p id={`${id}-hours-help`} className="text-body text-sm font-normal">
          Enable or disable business working hours for all weekly working days
        </p>
      </div>
      <div className="border-default mb-6 border-b pb-6">
        <Label htmlFor={`${id}-timezone`}>Select a timezone</Label>
        <Select id={`${id}-timezone`} name="timezone" defaultValue="">
          <option value="">Choose a timezone</option>
          {timezones.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      {week
        .filter((day) => days.includes(day.value))
        .map((day) => (
          <div key={day.value} className="mb-6 flex items-center justify-between">
            <Checkbox
              id={`${id}-${day.value}`}
              name="days"
              value={day.value}
              label={day.short}
              aria-label={day.name}
              defaultChecked={day.value === "monday" || day.value === "wednesday"}
              className="min-w-[4rem]"
            />
            <div className="w-full max-w-[7rem]">
              <Label htmlFor={`${id}-${day.value}-start`} className="sr-only">
                {day.name} start time:
              </Label>
              <Timepicker
                id={`${id}-${day.value}-start`}
                name={`start-time-${day.value}`}
                min="09:00"
                max="18:00"
                defaultValue="00:00"
                required
              />
            </div>
            <div className="w-full max-w-[7rem]">
              <Label htmlFor={`${id}-${day.value}-end`} className="sr-only">
                {day.name} end time:
              </Label>
              <Timepicker
                id={`${id}-${day.value}-end`}
                name={`end-time-${day.value}`}
                min="09:00"
                max="18:00"
                defaultValue="00:00"
                required
              />
            </div>
            <button
              type="button"
              className={deleteButton}
              onClick={() => {
                setDays(days.filter((value) => value !== day.value));
                setFocusTarget({ id: `${id}-add` });
              }}
            >
              <Trash2 aria-hidden className="size-5" />
              <span className="sr-only">Delete {day.name} interval</span>
            </button>
          </div>
        ))}
      <Button
        id={`${id}-add`}
        variant="secondary"
        fullWidth
        disabled={!missing}
        onClick={() => {
          if (!missing) return;
          setDays([...days, missing.value]);
          setFocusTarget({ id: `${id}-${missing.value}` });
        }}
      >
        <Plus aria-hidden />
        Add interval
      </Button>
      {/* Pinned to the bottom of the drawer, but in the flow, so it never covers the fields. */}
      <div className="mt-auto grid grid-cols-2 gap-4 pt-6">
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button type="submit">Save all</Button>
      </div>
    </form>
  );
}

export default function TimepickerDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>Set time schedule</DrawerTrigger>
      <DrawerContent>
        <div className="flex min-h-full flex-col">
          <DrawerHeader>
            <DrawerTitle>
              <Clock aria-hidden />
              Time schedule
            </DrawerTitle>
            <DrawerClose label="Close time schedule" />
          </DrawerHeader>
          <ScheduleForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
