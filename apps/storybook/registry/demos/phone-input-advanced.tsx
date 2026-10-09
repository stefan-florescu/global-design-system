import { useId } from "react";

import {
  Button,
  Label,
  PhoneInput,
  Select,
  cn,
  fieldSelectAddonClassName,
} from "@stefan-florescu/ui";

export default function PhoneInputAdvanced() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-sm">
      <Label htmlFor={`${id}-phone`} className="sr-only">
        Phone number:
      </Label>
      <Label htmlFor={`${id}-method`} className="sr-only">
        Verification method
      </Label>
      <div className="mt-2">
        <PhoneInput
          id={`${id}-phone`}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          required
          endAddon={
            <Select id={`${id}-method`} className={cn(fieldSelectAddonClassName, "rounded-s-none")}>
              <option>Send SMS</option>
              <option>Call</option>
            </Select>
          }
        />
      </div>
      <Button type="submit" fullWidth className="mt-4">
        Activate account
      </Button>
    </form>
  );
}
