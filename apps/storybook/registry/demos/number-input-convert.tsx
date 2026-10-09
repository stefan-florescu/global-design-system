import { useId } from "react";

import { ArrowRightLeft, RefreshCw } from "@stefan-florescu/icons";
import {
  Button,
  Label,
  NumberInput,
  Select,
  cn,
  fieldGroupClassName,
  fieldGroupItemClassName,
  fieldSelectAddonClassName,
} from "@stefan-florescu/ui";

export default function NumberInputConvert() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();

  return (
    <form className="mx-auto w-full max-w-xl">
      <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row">
        <div className={cn(fieldGroupClassName, "shadow-none")}>
          <Label htmlFor={`${id}-fiat`} className="sr-only">
            Amount in fiat currency
          </Label>
          <NumberInput
            id={`${id}-fiat`}
            min={0}
            placeholder="421 USD"
            required
            className={cn(fieldGroupItemClassName, "rounded-e-none")}
          />
          <div className="shrink-0">
            <Label htmlFor={`${id}-fiat-currency`} className="sr-only">
              Fiat currency
            </Label>
            <Select
              id={`${id}-fiat-currency`}
              className={cn(fieldSelectAddonClassName, "rounded-s-none")}
            >
              <option>USD</option>
              <option>GBP</option>
              <option>EUR</option>
              <option>CAD</option>
            </Select>
          </div>
        </div>
        <ArrowRightLeft aria-hidden className="text-body size-4 shrink-0" />
        <div className={cn(fieldGroupClassName, "shadow-none")}>
          <Label htmlFor={`${id}-crypto`} className="sr-only">
            Amount in crypto currency
          </Label>
          <NumberInput
            id={`${id}-crypto`}
            min={0}
            step={0.001}
            placeholder="0.323 BTC"
            required
            className={cn(fieldGroupItemClassName, "rounded-e-none")}
          />
          <div className="shrink-0">
            <Label htmlFor={`${id}-crypto-currency`} className="sr-only">
              Crypto currency
            </Label>
            <Select
              id={`${id}-crypto-currency`}
              className={cn(fieldSelectAddonClassName, "rounded-s-none")}
            >
              <option>BTC</option>
              <option>ETH</option>
              <option>DOGE</option>
              <option>SOL</option>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-body text-sm">Last update: 20:45 AM, November 20, 2023</p>
        <Button
          type="reset"
          variant="ghost"
          className="text-fg-brand h-auto p-0 hover:bg-transparent hover:underline [&_svg]:size-3"
        >
          Refresh
          <RefreshCw aria-hidden />
        </Button>
      </div>
    </form>
  );
}
