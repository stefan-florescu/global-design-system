import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("is a labelled switch that toggles from its label and with Space", async () => {
    const user = userEvent.setup();
    render(<Toggle label="Toggle me" />);
    const toggle = screen.getByRole("switch", { name: "Toggle me" });
    expect(toggle).not.toBeChecked();
    await user.click(screen.getByText("Toggle me"));
    expect(toggle).toBeChecked();
    toggle.focus();
    await user.keyboard(" ");
    expect(toggle).not.toBeChecked();
  });

  it("names the switch by its title and describes it by its description", () => {
    render(<Toggle bordered label="Weekly newsletter" description="Once a week." />);
    const toggle = screen.getByRole("switch", { name: "Weekly newsletter" });
    expect(toggle).toHaveAccessibleDescription("Once a week.");
  });

  it("can start on and be disabled", () => {
    render(<Toggle label="Wi-Fi" defaultChecked disabled />);
    const toggle = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(toggle).toBeChecked();
    expect(toggle).toBeDisabled();
    expect(screen.getByText("Wi-Fi")).toHaveClass("text-fg-disabled");
  });

  it("applies the sizes to the track", () => {
    const { container } = render(
      <>
        <Toggle aria-label="Base" />
        <Toggle aria-label="Large" size="lg" />
      </>,
    );
    const tracks = container.querySelectorAll("[aria-hidden]");
    expect(tracks[0]).toHaveClass("h-5", "w-9", "after:size-4");
    expect(tracks[1]).toHaveClass("h-6", "w-11", "after:size-5");
  });
});
