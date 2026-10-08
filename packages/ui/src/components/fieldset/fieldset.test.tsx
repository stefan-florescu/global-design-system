import { render, screen } from "@testing-library/react";

import { Fieldset } from "./fieldset";

describe("Fieldset", () => {
  it("groups controls under a legend", () => {
    render(
      <Fieldset legend="Notifications">
        <input type="checkbox" aria-label="Email" />
      </Fieldset>,
    );
    expect(screen.getByRole("group", { name: "Notifications" })).toContainElement(
      screen.getByRole("checkbox", { name: "Email" }),
    );
  });

  it("can hide the legend visually", () => {
    render(<Fieldset legend="Size" hideLegend />);
    expect(screen.getByText("Size")).toHaveClass("sr-only");
    expect(screen.getByRole("group", { name: "Size" })).toBeInTheDocument();
  });

  it("styles the fieldset with className and the layout with contentClassName", () => {
    render(
      <Fieldset legend="Plan" className="max-w-sm" contentClassName="grid grid-cols-2">
        <input type="radio" aria-label="Free" />
      </Fieldset>,
    );
    const group = screen.getByRole("group", { name: "Plan" });
    expect(group).toHaveClass("max-w-sm");
    expect(screen.getByRole("radio").parentElement).toHaveClass("grid", "grid-cols-2");
  });
});
