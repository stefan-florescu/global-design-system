import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its label with Flowbite's brand badge by default", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toHaveClass(
      "bg-brand-softer",
      "text-fg-brand-strong",
      "text-xs",
      "px-1.5",
      "py-0.5",
      "rounded",
    );
  });

  it.each([
    ["alternative", "bg-neutral-primary-soft", "text-heading"],
    ["gray", "bg-neutral-secondary-medium", "text-heading"],
    ["danger", "bg-danger-soft", "text-fg-danger-strong"],
    ["success", "bg-success-soft", "text-fg-success-strong"],
    ["warning", "bg-warning-soft", "text-fg-warning"],
  ] as const)("applies the %s variant", (variant, bg, text) => {
    render(<Badge variant={variant}>Label</Badge>);
    expect(screen.getByText("Label")).toHaveClass(bg, text);
  });

  it("draws a border, or an inset ring when large", () => {
    const { rerender } = render(<Badge bordered>Label</Badge>);
    expect(screen.getByText("Label")).toHaveClass("border", "border-brand-subtle");
    rerender(
      <Badge bordered size="lg">
        Label
      </Badge>,
    );
    expect(screen.getByText("Label")).toHaveClass("ring-1", "ring-inset", "text-sm", "px-2");
    expect(screen.getByText("Label")).not.toHaveClass("border");
  });

  it("renders a link with Flowbite's hover fill when given href", () => {
    render(
      <Badge href="/changelog" variant="success">
        Changelog
      </Badge>,
    );
    const link = screen.getByRole("link", { name: "Changelog" });
    expect(link).toHaveAttribute("href", "/changelog");
    expect(link).toHaveClass("hover:bg-success-medium", "focus-visible:outline-2");
  });

  it("shows a decorative dot", () => {
    const { container } = render(<Badge dot>Online</Badge>);
    const dot = container.querySelector("[data-slot=badge-dot]");
    expect(dot).toHaveAttribute("aria-hidden");
    expect(dot).toHaveClass("bg-fg-brand-strong", "size-1.5", "rounded-full");
  });

  it("shows a named remove button and reports presses", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Badge onDismiss={onDismiss}>React</Badge>);
    const remove = screen.getByRole("button", { name: "Remove" });
    expect(remove).toHaveClass("hover:bg-brand-soft");
    await user.click(remove);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("can be dismissed with the keyboard", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Badge onDismiss={onDismiss} dismissLabel="Remove React">
        React
      </Badge>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Remove React" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("applies pill and icon-only styles", () => {
    render(
      <Badge pill iconOnly size="lg">
        <span className="sr-only">Verified</span>
      </Badge>,
    );
    const badge = screen.getByText("Verified").parentElement;
    expect(badge).toHaveClass("rounded-full", "size-6", "p-0");
  });
});
