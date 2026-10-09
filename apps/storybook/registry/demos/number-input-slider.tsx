"use client";

import { useId, useState } from "react";

import { DollarSign } from "@stefan-florescu/icons";
import {
  Label,
  NumberInput,
  Range,
  Select,
  cn,
  fieldGroupClassName,
  fieldGroupItemClassName,
  fieldSelectAddonClassName,
} from "@stefan-florescu/ui";

export default function NumberInputSlider() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const [amount, setAmount] = useState<number | null>(1000);

  return (
    <form className="mx-auto w-full max-w-96">
      <div className={cn(fieldGroupClassName, "mb-4")}>
        <div className="shrink-0">
          <Label htmlFor={`${id}-currency`} className="sr-only">
            Currency
          </Label>
          <Select id={`${id}-currency`} className={cn(fieldSelectAddonClassName, "rounded-e-none")}>
            <option>USD</option>
            <option>GBP</option>
            <option>EUR</option>
            <option>CAD</option>
          </Select>
        </div>
        <Label htmlFor={`${id}-amount`} className="sr-only">
          Amount
        </Label>
        <NumberInput
          id={`${id}-amount`}
          startIcon={<DollarSign className="text-heading" />}
          min={100}
          max={1500}
          placeholder="Enter amount"
          value={amount}
          onValueChange={setAmount}
          required
          className={cn(fieldGroupItemClassName, "rounded-s-none")}
        />
      </div>
      <div className="relative pb-6">
        <Label htmlFor={`${id}-range`} className="sr-only">
          Amount slider
        </Label>
        <Range
          id={`${id}-range`}
          min={100}
          max={1500}
          value={amount ?? 100}
          aria-valuetext={`$${amount ?? 100}`}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <span className="text-body absolute start-0 bottom-0 text-sm">Min ($100)</span>
        <span className="text-body absolute start-1/3 bottom-0 -translate-x-1/2 text-sm rtl:translate-x-1/2">
          $500
        </span>
        <span className="text-body absolute start-2/3 bottom-0 -translate-x-1/2 text-sm rtl:translate-x-1/2">
          $1000
        </span>
        <span className="text-body absolute end-0 bottom-0 text-sm">Max ($1500)</span>
      </div>
    </form>
  );
}
