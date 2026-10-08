import { Fieldset, Radio } from "@stefan-florescu/ui";

export default function TimepickerSlots() {
  return (
    <Fieldset
      legend="Available times"
      className="w-full max-w-sm"
      contentClassName="grid grid-cols-3 gap-2"
    >
      <Radio name="slot" value="09:00" label="09:00" bordered />
      <Radio name="slot" value="09:30" label="09:30" bordered />
      <Radio name="slot" value="10:00" label="10:00" bordered defaultChecked />
      <Radio name="slot" value="10:30" label="10:30" bordered />
      <Radio name="slot" value="11:00" label="11:00" bordered />
      <Radio name="slot" value="11:30" label="11:30" bordered />
    </Fieldset>
  );
}
