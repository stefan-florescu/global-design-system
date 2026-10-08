import { render, screen } from "@testing-library/react";

import { Timepicker } from "./timepicker";

describe("Timepicker", () => {
  it("renders a native time field with limits", () => {
    render(<Timepicker aria-label="Start time" min="09:00" max="18:00" defaultValue="10:30" />);
    const input = screen.getByLabelText("Start time");
    expect(input).toHaveAttribute("type", "time");
    expect(input).toHaveAttribute("min", "09:00");
    expect(input).toHaveValue("10:30");
  });
});
