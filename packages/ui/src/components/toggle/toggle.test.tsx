import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("is a labelled switch that toggles", async () => {
    const user = userEvent.setup();
    render(<Toggle label="Dark mode" description="Use the dark theme." />);
    const toggle = screen.getByRole("switch", { name: "Dark mode" });
    expect(toggle).toHaveAccessibleDescription("Use the dark theme.");
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
    await user.keyboard(" ");
    expect(toggle).not.toBeChecked();
  });

  it("can start on and be disabled", () => {
    render(<Toggle label="Wi-Fi" defaultChecked disabled />);
    const toggle = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(toggle).toBeChecked();
    expect(toggle).toBeDisabled();
  });

  it("applies sizes to the track", () => {
    const { container } = render(<Toggle aria-label="Big" size="lg" />);
    expect(container.querySelector("[aria-hidden]")).toHaveClass("h-7", "w-13");
  });
});
