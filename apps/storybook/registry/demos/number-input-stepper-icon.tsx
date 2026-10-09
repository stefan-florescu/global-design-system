import { useId } from "react";

import { BedDouble } from "@stefan-florescu/icons";
import { HelperText, Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputStepperIcon() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-xs">
      <Label htmlFor={`${id}-bedrooms`}>Choose quantity:</Label>
      <div className="max-w-44">
        <NumberInput
          id={`${id}-bedrooms`}
          stepper
          defaultValue={3}
          min={1}
          max={5}
          caption={
            <>
              <BedDouble aria-hidden />
              <span>Bedrooms</span>
            </>
          }
          aria-describedby={`${id}-bedrooms-help`}
          required
        />
      </div>
      <HelperText id={`${id}-bedrooms-help`}>Please select the number of bedrooms.</HelperText>
    </form>
  );
}
