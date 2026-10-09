import { Choice, type ChoiceProps } from "./choice";

export type CheckboxProps = ChoiceProps;

/**
 * A native checkbox with an optional label and description. Group related checkboxes in a
 * `Fieldset`.
 */
export function Checkbox(props: CheckboxProps) {
  return <Choice type="checkbox" {...props} />;
}
