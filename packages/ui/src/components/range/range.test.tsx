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

  it("applies sizes", () => {
    render(<Range aria-label="Thin" size="sm" />);
    expect(screen.getByRole("slider")).toHaveClass("h-1");
  });
});
