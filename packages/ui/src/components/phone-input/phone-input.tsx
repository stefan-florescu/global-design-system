import { useId } from "react";

import { cn } from "../../lib/cn";
import { Input, type InputProps } from "../input";
import { Select } from "../select";

import { phoneInputCountryClassName, phoneInputNumberClassName } from "./phone-input.variants";

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
  { code: "GB", dialCode: "+44", name: "United Kingdom" },
  { code: "DE", dialCode: "+49", name: "Germany" },
  { code: "FR", dialCode: "+33", name: "France" },
  { code: "ES", dialCode: "+34", name: "Spain" },
  { code: "IT", dialCode: "+39", name: "Italy" },
  { code: "NL", dialCode: "+31", name: "Netherlands" },
  { code: "RO", dialCode: "+40", name: "Romania" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "AU", dialCode: "+61", name: "Australia" },
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
};

/** A country-code select joined to a phone number field. */
export function PhoneInput({
  countries = defaultPhoneCountries,
  defaultCountry = countries[0]?.code,
  countryName,
  countryLabel = "Country code",
  size,
  invalid,
  valid,
  disabled,
  className,
  ...props
}: PhoneInputProps) {
  const selectId = useId();
  return (
    <div data-slot="phone-input" className="flex w-full">
      <div className="shrink-0">
        <Select
          id={selectId}
          aria-label={countryLabel}
          name={countryName}
          defaultValue={defaultCountry}
          size={size}
          invalid={invalid}
          valid={valid}
          disabled={disabled}
          className={phoneInputCountryClassName}
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
        className={cn(phoneInputNumberClassName, className)}
        {...props}
      />
    </div>
  );
}
