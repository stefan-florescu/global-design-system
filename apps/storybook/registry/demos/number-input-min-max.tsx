import { useId } from "react";

import { HelperText, Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputMinMax() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-xs">
      <Label htmlFor={`${id}-quantity`}>Choose quantity:</Label>
      <div className="max-w-32">
        <NumberInput
          id={`${id}-quantity`}
          stepper
          defaultValue={5}
          min={1}
          max={50}
          placeholder="999"
          aria-describedby={`${id}-quantity-help`}
          required
        />
      </div>
      <HelperText id={`${id}-quantity-help`}>
        Please select a 5 digit number from 0 to 9.
      </HelperText>
    </form>
  );
}
