import { Label, Timepicker } from "@stefan-florescu/ui";

export default function TimepickerDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="start-time">Start time</Label>
        <Timepicker id="start-time" defaultValue="09:00" />
      </div>
    </div>
  );
}
