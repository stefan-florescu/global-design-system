import { Checkbox, Fieldset } from "@stefan-florescu/ui";

export default function CheckboxInline() {
  return (
    <Fieldset legend="Days" orientation="horizontal">
      <Checkbox name="days" value="mon" label="Mon" />
      <Checkbox name="days" value="tue" label="Tue" />
      <Checkbox name="days" value="wed" label="Wed" />
      <Checkbox name="days" value="thu" label="Thu" />
      <Checkbox name="days" value="fri" label="Fri" />
    </Fieldset>
  );
}
