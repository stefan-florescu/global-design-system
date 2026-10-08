import { render, screen } from "@testing-library/react";

import { Label } from "./label";

describe("Label", () => {
  it("names its control", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("shows a decorative required marker", () => {
    render(
      <>
        <Label htmlFor="name" required>
          Name
        </Label>
        <input id="name" required />
      </>,
    );
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("textbox", { name: "Name" })).toBeRequired();
  });
});
