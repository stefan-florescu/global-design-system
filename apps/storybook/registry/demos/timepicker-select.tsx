import { useId } from "react";

import { Label, Select, Timepicker } from "@stefan-florescu/ui";

const timezones = [
  ["America/New_York", "EST - GMT-5 (New York)"],
  ["America/Los_Angeles", "PST - GMT-8 (Los Angeles)"],
  ["Europe/London", "GMT - GMT+0 (London)"],
  ["Europe/Paris", "CET - GMT+1 (Paris)"],
  ["Asia/Tokyo", "JST - GMT+9 (Tokyo)"],
  ["Australia/Sydney", "AEDT - GMT+11 (Sydney)"],
  ["Canada/Mountain", "MST - GMT-7 (Canada)"],
  ["Canada/Central", "CST - GMT-6 (Canada)"],
  ["Canada/Eastern", "EST - GMT-5 (Canada)"],
  ["Europe/Berlin", "CET - GMT+1 (Berlin)"],
  ["Asia/Dubai", "GST - GMT+4 (Dubai)"],
  ["Asia/Singapore", "SGT - GMT+8 (Singapore)"],
];

export default function TimepickerSelect() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="flex justify-center">
      <div>
        <Label htmlFor={`${id}-time`} className="mb-2">
          Select time:
        </Label>
        <div className="flex">
          <Timepicker
            id={`${id}-time`}
            icon={null}
            min="09:00"
            max="18:00"
            defaultValue="00:00"
            required
            className="min-w-auto flex-1 rounded-none rounded-s-lg"
          />
          <div className="shrink-0">
            <Select
              aria-label="Timezone"
              name="timezone"
              defaultValue="America/New_York"
              required
              className="rounded-none rounded-e-lg border-s-0 p-2.5"
            >
              {timezones.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </form>
  );
}
