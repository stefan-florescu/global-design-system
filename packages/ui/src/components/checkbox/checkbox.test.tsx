import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("is a labelled checkbox with a description", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Remember me" description="Stay signed in for 30 days." />);
    const checkbox = screen.getByRole("checkbox", { name: "Remember me" });
    expect(checkbox).toHaveAccessibleDescription("Stay signed in for 30 days.");
    await user.click(screen.getByText("Remember me"));
    expect(checkbox).toBeChecked();
  });

  it("toggles with Space and shows the check mark only through CSS", async () => {
    const user = userEvent.setup();
    const { container } = render(<Checkbox label="Subscribe" />);
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toHaveClass("hidden", "peer-checked:block");
  });

  it("can be disabled or invalid", () => {
    render(
      <>
        <Checkbox label="Locked" disabled />
        <Checkbox label="Terms" invalid />
      </>,
    );
    expect(screen.getByRole("checkbox", { name: "Locked" })).toBeDisabled();
    expect(screen.getByText("Locked")).toHaveClass("text-fg-disabled");
    expect(screen.getByRole("checkbox", { name: "Terms" })).toHaveAttribute("aria-invalid", "true");
  });

  it("uses the input border so the box reaches 3:1", () => {
    render(<Checkbox aria-label="Bare" />);
    expect(screen.getByRole("checkbox", { name: "Bare" })).toHaveClass(
      "border-input",
      "rounded-xs",
      "checked:bg-brand",
    );
  });

  it("makes the whole bordered box clickable", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Pro plan" variant="bordered" />);
    expect(screen.getByText("Pro plan")).toHaveClass("w-full", "py-4");
    await user.click(screen.getByText("Pro plan"));
    expect(screen.getByRole("checkbox", { name: "Pro plan" })).toBeChecked();
  });

  it("names a bordered card by its title and describes it by its description", async () => {
    const user = userEvent.setup();
    render(
      <Checkbox
        variant="bordered"
        icon={<svg />}
        label="1TB SSD storage"
        description="Get ultra-fast storage."
      />,
    );
    const checkbox = screen.getByRole("checkbox", { name: "1TB SSD storage" });
    expect(checkbox).toHaveAccessibleDescription("Get ultra-fast storage.");
    await user.click(screen.getByText("Get ultra-fast storage."));
    expect(checkbox).toBeChecked();
  });

  it("keeps the card variant's checkbox focusable", async () => {
    const user = userEvent.setup();
    render(<Checkbox variant="card" label="React Js" description="A JavaScript library." />);
    const checkbox = screen.getByRole("checkbox", { name: "React Js" });
    expect(checkbox).toHaveClass("sr-only");
    expect(checkbox).toHaveAccessibleDescription("A JavaScript library.");
    await user.tab();
    expect(checkbox).toHaveFocus();
    await user.keyboard(" ");
    expect(checkbox).toBeChecked();
  });

  it("shows the mixed state with indeterminate", () => {
    const { rerender } = render(<Checkbox aria-label="Select all" indeterminate />);
    const box = screen.getByRole("checkbox", { name: "Select all" });
    expect((box as HTMLInputElement).indeterminate).toBe(true);
    rerender(<Checkbox aria-label="Select all" indeterminate={false} />);
    expect((box as HTMLInputElement).indeterminate).toBe(false);
  });
});
