import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NumberInput } from "./number-input";

describe("NumberInput", () => {
  it("is a spin button that reports numbers", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="Quantity" onValueChange={onValueChange} />);
    const input = screen.getByRole("spinbutton", { name: "Quantity" });
    await user.type(input, "12");
    expect(onValueChange).toHaveBeenLastCalledWith(12);
    await user.clear(input);
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("steps with the buttons and stops at min and max", async () => {
    const user = userEvent.setup();
    render(<NumberInput aria-label="Guests" stepper defaultValue={1} min={1} max={3} />);
    const input = screen.getByRole("spinbutton", { name: "Guests" });
    const decrease = screen.getByRole("button", { name: "Decrease" });
    const increase = screen.getByRole("button", { name: "Increase" });
    expect(decrease).toBeDisabled();
    await user.click(increase);
    await user.click(increase);
    expect(input).toHaveValue(3);
    expect(increase).toBeDisabled();
    expect(increase).toHaveAttribute("aria-controls", input.id);
    await user.click(decrease);
    expect(input).toHaveValue(2);
  });

  it("handles decimal steps", async () => {
    const user = userEvent.setup();
    render(<NumberInput aria-label="Price" stepper defaultValue={0.1} step={0.1} />);
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(0.2);
  });
});
