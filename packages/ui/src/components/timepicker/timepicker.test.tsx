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

  it("shows a decorative clock icon by default", () => {
    const { container } = render(<Timepicker aria-label="Start time" />);
    expect(container.querySelector("svg")?.closest("[aria-hidden]")).not.toBeNull();
  });

  it("renders the bare field when icon is null", () => {
    const { container } = render(<Timepicker aria-label="Start time" icon={null} />);
    expect(container.querySelector("svg")).toBeNull();
    expect(container.firstChild).toBe(screen.getByLabelText("Start time"));
  });

  it("marks invalid times", () => {
    render(<Timepicker aria-label="End time" invalid />);
    expect(screen.getByLabelText("End time")).toHaveAttribute("aria-invalid", "true");
  });
});
