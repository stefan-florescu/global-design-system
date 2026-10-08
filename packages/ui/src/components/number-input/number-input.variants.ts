/*
 * Number field: the shared field styles; with `stepper`, the field sits between −/+ buttons
 * that share its `input` border, and the browser's own spin buttons are hidden.
 */
export const numberInputStepperFieldClassName =
  "rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

export const numberInputButtonClassName =
  "rounded-none border-input bg-muted text-foreground hover:bg-accent focus-visible:z-raised";
