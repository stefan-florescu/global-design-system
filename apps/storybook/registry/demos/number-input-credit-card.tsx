import { useId } from "react";

import { Calendar, CreditCard } from "@stefan-florescu/icons";
import { Button, Input, Label, NumberInput } from "@stefan-florescu/ui";

export default function NumberInputCreditCard() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-sm">
      <Label htmlFor={`${id}-card-number`} className="sr-only">
        Card number:
      </Label>
      <Input
        id={`${id}-card-number`}
        inputMode="numeric"
        autoComplete="cc-number"
        endIcon={<CreditCard />}
        placeholder="4242 4242 4242 4242"
        pattern="^4[0-9]{12}(?:[0-9]{3})?$"
        required
      />
      <div className="my-4 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Label htmlFor={`${id}-card-expiration`} className="sr-only">
            Card expiration date:
          </Label>
          <Input
            id={`${id}-card-expiration`}
            autoComplete="cc-exp"
            startIcon={<Calendar />}
            placeholder="12/23"
            pattern="(0[1-9]|1[0-2])/[0-9]{2}"
            required
          />
        </div>
        <div className="col-span-1">
          <Label htmlFor={`${id}-cvv`} className="sr-only">
            Card CVV code:
          </Label>
          <NumberInput id={`${id}-cvv`} autoComplete="cc-csc" placeholder="CVV" required />
        </div>
      </div>
      <Button type="submit">Pay now</Button>
    </form>
  );
}
