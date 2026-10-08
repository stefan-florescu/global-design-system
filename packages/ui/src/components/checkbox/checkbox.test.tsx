import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("is a labelled checkbox with a description", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Remember me" description="Stay signed in for 30 days." />);
    const checkbox = screen.getByRole("checkbox", { name: "Remember me" });
    expect(checkbox).toHaveAccessibleDescription("Stay signed in for 30 days.");
    await user.click(screen.getByText("Remember me"));
    expect(checkbox).toBeChecked();
  });

  it("toggles with Space", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Subscribe" />);
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("can be disabled or invalid", () => {
    render(
      <>
        <Checkbox label="Locked" disabled />
        <Checkbox label="Terms" invalid />
      </>,
    );
    expect(screen.getByRole("checkbox", { name: "Locked" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "Terms" })).toHaveAttribute("aria-invalid", "true");
  });

  it("makes the whole bordered box clickable", () => {
    render(<Checkbox label="Pro plan" bordered />);
    expect(screen.getByText("Pro plan")).toHaveClass("after:absolute", "after:inset-0");
  });
});
