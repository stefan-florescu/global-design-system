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

  it("uses the label styles", () => {
    render(<Label htmlFor="x">Name</Label>);
    expect(screen.getByText("Name")).toHaveClass(
      "block",
      "mb-2.5",
      "text-sm",
      "font-medium",
      "text-heading",
    );
  });

  it("colours the label for validation states", () => {
    render(
      <>
        <Label variant="success">Valid</Label>
        <Label variant="danger">Invalid</Label>
      </>,
    );
    expect(screen.getByText("Valid")).toHaveClass("text-fg-success-strong");
    expect(screen.getByText("Invalid")).toHaveClass("text-fg-danger-strong");
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
