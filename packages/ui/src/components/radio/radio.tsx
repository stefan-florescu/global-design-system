import { Choice, type ChoiceProps } from "../checkbox/choice";

export type RadioProps = ChoiceProps;

/**
 * A native radio button with an optional label and description. Give every radio in a group the
 * same `name`, and wrap the group in a `Fieldset` with a legend.
 */
export function Radio(props: RadioProps) {
  return <Choice type="radio" {...props} />;
}
