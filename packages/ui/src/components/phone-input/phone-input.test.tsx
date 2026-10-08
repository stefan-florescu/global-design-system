import { render, screen } from "@testing-library/react";

import { PhoneInput } from "./phone-input";

describe("PhoneInput", () => {
  it("joins a named country select and a phone field", () => {
    render(<PhoneInput aria-label="Phone number" defaultCountry="RO" countryName="country" />);
    const select = screen.getByRole("combobox", { name: "Country code" });
    expect(select).toHaveValue("RO");
    expect(select).toHaveAttribute("name", "country");
    const phone = screen.getByRole("textbox", { name: "Phone number" });
    expect(phone).toHaveAttribute("type", "tel");
    expect(phone).toHaveAttribute("autocomplete", "tel-national");
  });

  it("names each country option fully", () => {
    render(<PhoneInput aria-label="Phone number" />);
    expect(screen.getByRole("option", { name: "Romania +40" })).toBeInTheDocument();
  });

  it("marks both parts invalid", () => {
    render(<PhoneInput aria-label="Phone number" invalid />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });
});
