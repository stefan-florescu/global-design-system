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

  it("joins the control buttons to a 40px field", () => {
    render(<NumberInput aria-label="Quantity" stepper />);
    expect(screen.getByRole("spinbutton")).toHaveClass("h-10", "border-x-0", "text-center");
    expect(screen.getByRole("button", { name: "Decrease" })).toHaveClass("rounded-e-none");
    expect(screen.getByRole("button", { name: "Increase" })).toHaveClass("rounded-s-none");
  });

  it("draws round 24px buttons for the counter variant", async () => {
    const user = userEvent.setup();
    render(<NumberInput aria-label="Count" variant="counter" defaultValue={12} />);
    const increase = screen.getByRole("button", { name: "Increase" });
    expect(increase).toHaveClass("size-6", "rounded-full");
    await user.click(increase);
    expect(screen.getByRole("spinbutton", { name: "Count" })).toHaveValue(13);
  });

  it("adds the caption to the field's description", () => {
    render(
      <>
        <NumberInput aria-label="Bedrooms" stepper caption="Bedrooms" aria-describedby="hint" />
        <p id="hint">Pick a number.</p>
      </>,
    );
    expect(screen.getByRole("spinbutton")).toHaveAccessibleDescription("Pick a number. Bedrooms");
  });
});
