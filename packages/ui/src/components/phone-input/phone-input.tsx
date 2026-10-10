import { useId, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { Input, type InputProps } from "../input";
import {
  fieldGroupClassName,
  fieldGroupItemClassName,
  fieldSelectAddonClassName,
} from "../input/input.variants";
import { Select } from "../select";

import {
  phoneInputCountryClassName,
  phoneInputNumberClassName,
  phoneInputNumberWithEndClassName,
} from "./phone-input.variants";

export type PhoneCountry = {
  /** ISO 3166 code, such as "RO". */
  code: string;
  /** International dialling code, such as "+40". */
  dialCode: string;
  /** Country name, read by screen readers. */
  name: string;
};

export const defaultPhoneCountries: PhoneCountry[] = [
  { code: "US", dialCode: "+1", name: "United States" },
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "FR", dialCode: "+33", name: "France" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "ES", dialCode: "+34", name: "Spain" },
  { code: "IT", dialCode: "+39", name: "Italy" },
  { code: "NL", dialCode: "+31", name: "Netherlands" },
  { code: "RO", dialCode: "+40", name: "Romania" },
];

export type PhoneInputProps = Omit<InputProps, "type" | "addon" | "startIcon"> & {
  /** Countries offered in the code select. */
  countries?: PhoneCountry[];
  /** ISO code selected first. */
  defaultCountry?: string;
  /** Form name for the selected country code. */
  countryName?: string;
  /** Accessible name of the country select. */
  countryLabel?: string;
  /**
   * A control joined to the field's end, such as a `Select` for "Send SMS" / "Call". Square its
   * start corners (`rounded-s-none`).
   */
  endAddon?: ReactNode;
};

/** A country-code select joined to a phone number field. */
export function PhoneInput({
  countries = defaultPhoneCountries,
  defaultCountry = countries[0]?.code,
  countryName,
  countryLabel = "Country code",
  endAddon,
  size,
  invalid,
  valid,
  disabled,
  className,
  ...props
}: PhoneInputProps) {
  const selectId = useId();
  return (
    <div data-slot="phone-input" className={fieldGroupClassName}>
      <div className="relative shrink-0">
        <Select
          id={selectId}
          aria-label={countryLabel}
          name={countryName}
          defaultValue={defaultCountry}
          size={size}
          invalid={invalid}
          valid={valid}
          disabled={disabled}
          className={cn(fieldSelectAddonClassName, phoneInputCountryClassName)}
        >
          {countries.map((country) => (
            <option
              key={country.code}
              value={country.code}
              aria-label={`${country.name} ${country.dialCode}`}
            >
              {country.code} {country.dialCode}
            </option>
          ))}
        </Select>
      </div>
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        size={size}
        invalid={invalid}
        valid={valid}
        disabled={disabled}
        className={cn(
          fieldGroupItemClassName,
          phoneInputNumberClassName,
          endAddon != null && phoneInputNumberWithEndClassName,
          className,
        )}
        {...props}
      />
      {endAddon != null ? <div className="relative shrink-0">{endAddon}</div> : null}
    </div>
  );
}
