import { fireEvent, render, screen } from "@testing-library/react";

import { Range } from "./range";

describe("Range", () => {
  it("is a native slider with limits", () => {
    const onChange = vi.fn();
    render(<Range aria-label="Volume" min={0} max={10} defaultValue={4} onChange={onChange} />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveValue("4");
    fireEvent.change(slider, { target: { value: "7" } });
    expect(onChange).toHaveBeenCalled();
    expect(slider).toHaveValue("7");
  });

  it("applies Flowbite's sizes", () => {
    render(
      <>
        <Range aria-label="Small" size="sm" />
        <Range aria-label="Default" />
        <Range aria-label="Large" size="lg" />
      </>,
    );
    expect(screen.getByRole("slider", { name: "Small" })).toHaveClass("h-1");
    expect(screen.getByRole("slider", { name: "Default" })).toHaveClass(
      "h-2",
      "bg-neutral-quaternary",
    );
    expect(screen.getByRole("slider", { name: "Large" })).toHaveClass("h-3");
  });

  it("can be disabled", () => {
    render(<Range aria-label="Locked" disabled />);
    expect(screen.getByRole("slider", { name: "Locked" })).toBeDisabled();
  });
});
