import { render, screen } from "@testing-library/react";

import { Indicator } from "./indicator";

describe("Indicator", () => {
  it("is a 12px brand dot, hidden from assistive technology, by default", () => {
    const { container } = render(<Indicator />);
    const dot = container.querySelector('[data-slot="indicator"]');
    expect(dot).toHaveClass("size-3", "rounded-full", "bg-brand");
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(dot).not.toHaveClass("absolute");
  });

  it.each([
    ["gray", "bg-neutral-quaternary"],
    ["dark", "bg-dark"],
    ["success", "bg-success"],
    ["danger", "bg-danger"],
    ["warning", "bg-warning"],
  ] as const)("applies the %s variant", (variant, bg) => {
    const { container } = render(<Indicator variant={variant} />);
    expect(container.firstChild).toHaveClass(bg);
  });

  it.each([
    ["xs", "size-2"],
    ["sm", "size-2.5"],
    ["lg", "size-3.5"],
    ["xl", "size-4"],
  ] as const)("sizes the %s dot", (size, cls) => {
    const { container } = render(<Indicator size={size} />);
    expect(container.firstChild).toHaveClass(cls);
  });

  it("announces a label instead of the dot", () => {
    render(<Indicator variant="success" label="Online" />);
    const text = screen.getByText("Online");
    expect(text).toHaveClass("sr-only");
    expect(text.parentElement).not.toHaveAttribute("aria-hidden");
  });

  it("shows a count as a 24px bold circle", () => {
    render(<Indicator variant="danger" count={8} />);
    const count = screen.getByText("8");
    expect(count).toHaveClass(
      "h-6",
      "min-w-6",
      "text-xs",
      "font-bold",
      "bg-danger",
      "text-danger-foreground",
    );
    expect(count).not.toHaveAttribute("aria-hidden");
  });

  it("hides the visible count when a label describes it", () => {
    render(<Indicator count={8} label="8 unread messages" />);
    expect(screen.getByText("8")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("8 unread messages")).toHaveClass("sr-only");
  });

  it("caps the count at max", () => {
    const { rerender } = render(<Indicator count={120} max={99} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
    rerender(<Indicator count={42} max={99} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("draws the buffer border with bordered", () => {
    const { container } = render(<Indicator bordered />);
    expect(container.firstChild).toHaveClass("border-2", "border-buffer");
  });

  it("pins itself to the parent with placement", () => {
    const { container, rerender } = render(<Indicator placement="top-end" />);
    expect(container.firstChild).toHaveClass(
      "absolute",
      "top-0",
      "end-0",
      "translate-x-1/2",
      "-translate-y-1/2",
    );
    rerender(<Indicator placement="bottom-start" />);
    expect(container.firstChild).toHaveClass("bottom-0", "start-0", "translate-y-1/2");
  });

  it("holds an icon in a box sized like a count", () => {
    const { container } = render(
      <Indicator size="sm">
        <svg aria-hidden />
      </Indicator>,
    );
    expect(container.firstChild).toHaveClass("h-5", "min-w-5");
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("merges className and forwards attributes", () => {
    const { container } = render(<Indicator className="me-3" id="dot" />);
    expect(container.firstChild).toHaveClass("me-3");
    expect(container.firstChild).toHaveAttribute("id", "dot");
  });
});
