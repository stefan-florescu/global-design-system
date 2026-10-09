import { useId } from "react";

import { BedDouble, Calendar, Users } from "@stefan-florescu/icons";
import { Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputAdvanced() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-xs space-y-2">
      <div>
        <Label htmlFor={`${id}-bedrooms`} className="sr-only">
          Choose bedrooms number:
        </Label>
        <NumberInput
          id={`${id}-bedrooms`}
          stepper
          defaultValue={2}
          min={1}
          max={5}
          caption={
            <>
              <BedDouble aria-hidden />
              <span>Bedrooms</span>
            </>
          }
          required
        />
      </div>
      <div>
        <Label htmlFor={`${id}-nights`} className="sr-only">
          Choose number of nights:
        </Label>
        <NumberInput
          id={`${id}-nights`}
          stepper
          defaultValue={7}
          min={1}
          max={30}
          caption={
            <>
              <Calendar aria-hidden />
              <span>Night stays</span>
            </>
          }
          required
        />
      </div>
      <div>
        <Label htmlFor={`${id}-guests`} className="sr-only">
          Choose guests:
        </Label>
        <NumberInput
          id={`${id}-guests`}
          stepper
          defaultValue={3}
          min={1}
          max={5}
          caption={
            <>
              <Users aria-hidden />
              <span>Guests</span>
            </>
          }
          required
        />
      </div>
    </form>
  );
}
