import { Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerRange() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <div className="grid gap-2">
        <Label htmlFor="range-start">Start</Label>
        <Timepicker id="range-start" defaultValue="09:00" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="range-end">End</Label>
        <Timepicker id="range-end" defaultValue="17:30" />
      </div>
    </div>
  );
}
