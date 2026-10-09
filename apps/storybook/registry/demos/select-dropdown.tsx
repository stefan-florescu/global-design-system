"use client";

import { useId, useState } from "react";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Label,
  Select,
} from "@stefan-florescu/ui";

const countries = [
  {
    code: "US",
    name: "United States",
    states: ["California", "Texas", "Washington", "Florida", "Virginia", "Georgia", "Michigan"],
  },
  {
    code: "AU",
    name: "Australia",
    states: ["New South Wales", "Victoria", "Queensland", "Western Australia", "Tasmania"],
  },
  {
    code: "GB",
    name: "United Kingdom",
    states: ["England", "Scotland", "Wales", "Northern Ireland"],
  },
  {
    code: "FR",
    name: "France",
    states: ["Île-de-France", "Brittany", "Normandy", "Occitania", "Grand Est"],
  },
  {
    code: "CA",
    name: "Canada",
    states: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
  },
];

export default function SelectDropdown() {
  // Unique ids, so the example can appear more than once on a page.
  const id = useId();
  const [country, setCountry] = useState(countries[0]!);

  return (
    <form className="mx-auto w-full max-w-sm">
      <div className="flex">
        <input type="hidden" name="country" value={country.code} />
        <Dropdown>
          {/* The code is the visible label; the hidden text gives the full name and purpose. */}
          <DropdownTrigger
            variant="secondary"
            className="border-input hover:text-fg-brand shrink-0 rounded-e-none shadow-none"
          >
            {country.code}
            <span className="sr-only"> ({country.name}), choose a country</span>
          </DropdownTrigger>
          <DropdownMenu className="w-54">
            {countries.map((option) => (
              <DropdownItem
                key={option.code}
                className="rounded-md"
                onClick={() => setCountry(option)}
              >
                {option.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Label htmlFor={`${id}-states`} className="sr-only">
          Choose a state
        </Label>
        <Select
          id={`${id}-states`}
          name="state"
          // A new country starts again from the placeholder.
          key={country.code}
          defaultValue=""
          className="rounded-s-none border-s-0"
        >
          <option value="">Choose a state</option>
          {country.states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </div>
    </form>
  );
}
