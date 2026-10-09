import { useId } from "react";

import { Banknote } from "@stefan-florescu/icons";
import {
  Label,
  NumberInput,
  Select,
  cn,
  fieldGroupClassName,
  fieldGroupItemClassName,
  fieldSelectAddonClassName,
} from "@stefan-florescu/ui";

export default function NumberInputCurrency() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className={cn(fieldGroupClassName, "mx-auto max-w-72")}>
      <Label htmlFor={`${id}-amount`} className="sr-only">
        Amount
      </Label>
      <NumberInput
        id={`${id}-amount`}
        startIcon={<Banknote />}
        min={0}
        placeholder="Enter amount"
        required
        className={cn(fieldGroupItemClassName, "rounded-e-none")}
      />
      <div className="shrink-0">
        <Label htmlFor={`${id}-currency`} className="sr-only">
          Currency
        </Label>
        <Select id={`${id}-currency`} className={cn(fieldSelectAddonClassName, "rounded-s-none")}>
          <option>USD</option>
          <option>GBP</option>
          <option>EUR</option>
          <option>CAD</option>
        </Select>
      </div>
    </form>
  );
}
