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

  it("attaches an addon that shares the field's shadow", () => {
    render(<Input aria-label="Website" addon="https://" />);
    expect(screen.getByText("https://")).toHaveClass("rounded-s-base", "border-e-0");
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("rounded-s-none", "shadow-none");
    expect(input.parentElement?.parentElement).toHaveClass("shadow-xs", "rounded-base");
  });

  it("uses Flowbite's field styles and padding-based sizes", () => {
    render(
      <>
        <Input aria-label="Base" />
        <Input aria-label="Small" size="sm" />
        <Input aria-label="Large" size="lg" />
        <Input aria-label="Extra large" size="xl" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Base" })).toHaveClass(
      "rounded-base",
      "bg-neutral-secondary-medium",
      "border-input",
      "shadow-xs",
      "px-3",
      "py-2.5",
      "text-sm",
    );
    expect(screen.getByRole("textbox", { name: "Small" })).toHaveClass("px-2.5", "py-2");
    expect(screen.getByRole("textbox", { name: "Large" })).toHaveClass(
      "px-3.5",
      "py-3",
      "text-base",
    );
    expect(screen.getByRole("textbox", { name: "Extra large" })).toHaveClass("px-4", "py-3.5");
  });
});
