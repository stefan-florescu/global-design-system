import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./input";

describe("Input", () => {
  it("is a text field that takes input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await user.type(input, "Ana");
    expect(input).toHaveValue("Ana");
    expect(input).toHaveAttribute("type", "text");
  });

  it("marks invalid and valid values", () => {
    render(
      <>
        <Input aria-label="Email" invalid />
        <Input aria-label="Username" valid />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox", { name: "Username" })).toHaveAttribute("data-valid", "true");
  });

  it("hides icons from assistive technology and pads for them", () => {
    render(<Input aria-label="Email" startIcon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("textbox")).toHaveClass("ps-9");
  });

  it("attaches an addon", () => {
    render(<Input aria-label="Username" addon="@" />);
    expect(screen.getByText("@")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("rounded-s-none");
  });

  it("applies sizes", () => {
    render(<Input aria-label="Big" size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-12", "text-base");
  });
});
