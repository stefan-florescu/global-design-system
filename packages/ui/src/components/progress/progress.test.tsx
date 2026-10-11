import { render, screen } from "@testing-library/react";

import { Progress } from "./progress";

describe("Progress", () => {
  it("renders a named progressbar with its value", () => {
    render(<Progress value={45} aria-label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "45");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "45%");
    expect(bar).toHaveClass("bg-neutral-quaternary", "h-2", "rounded-full", "w-full");
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill).toHaveClass("bg-brand", "rounded-full", "h-full");
    expect(fill.style.width).toBe("45%");
  });

  it("uses textLabel as the accessible name", () => {
    render(<Progress value={10} textLabel="Storage" />);
    expect(screen.getByRole("progressbar", { name: "Storage" })).toBeInTheDocument();
  });

  it("supports aria-labelledby", () => {
    render(
      <>
        <span id="lbl">Profile</span>
        <Progress value={10} aria-labelledby="lbl" />
      </>,
    );
    const bar = screen.getByRole("progressbar", { name: "Profile" });
    expect(bar).not.toHaveAttribute("aria-label");
  });

  it("scales value against max and clamps out-of-range values", () => {
    const { rerender } = render(
      <Progress value={376.3} max={500} aria-label="Storage" valueText="376.3 of 500 GB used" />,
    );
    let bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemax", "500");
    expect(bar).toHaveAttribute("aria-valuetext", "376.3 of 500 GB used");
    expect((bar.firstElementChild as HTMLElement).style.width).toBe("75.26%");

    rerender(<Progress value={140} aria-label="Storage" />);
    bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
    expect((bar.firstElementChild as HTMLElement).style.width).toBe("100%");

    rerender(<Progress value={-5} aria-label="Storage" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it.each([
    ["sm", "h-1.5"],
    ["md", "h-2"],
    ["lg", "h-2.5"],
    ["xl", "h-4"],
  ] as const)("applies the %s size", (size, height) => {
    render(<Progress value={45} size={size} aria-label="Upload" />);
    expect(screen.getByRole("progressbar")).toHaveClass(height);
  });

  it.each([
    ["dark", "bg-dark", "text-dark-foreground"],
    ["success", "bg-success", "text-success-foreground"],
    ["danger", "bg-danger", "text-danger-foreground"],
    ["warning", "bg-warning", "text-warning-foreground"],
  ] as const)("applies the %s colour", (variant, bg, text) => {
    render(<Progress value={45} variant={variant} aria-label="Upload" />);
    expect(screen.getByRole("progressbar").firstElementChild).toHaveClass(bg, text);
  });

  it("draws the value inside a 16px bar", () => {
    render(<Progress value={45} aria-label="Upload" labelProgress />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveClass("h-4");
    expect(bar.firstElementChild).toHaveClass("text-xs", "text-brand-foreground", "p-0.5");
    expect(bar).toHaveTextContent("45%");
  });

  it("draws the labels outside, hidden from assistive technology", () => {
    const { container } = render(
      <Progress
        value={45}
        textLabel="Stefan DS"
        labelText
        textLabelPosition="outside"
        labelProgress
        progressLabelPosition="outside"
      />,
    );
    const row = container.querySelector("[data-slot=progress-label]");
    expect(row).toHaveAttribute("aria-hidden", "true");
    expect(row).toHaveTextContent("Stefan DS45%");
    expect(row).toHaveClass("text-sm", "font-medium", "text-body", "justify-between");
    const bar = screen.getByRole("progressbar", { name: "Stefan DS" });
    expect(bar).toHaveClass("h-2");
    expect(bar).not.toHaveTextContent("45%");
  });

  it("merges className on the wrapper and forwards attributes", () => {
    const { container } = render(
      <Progress value={1} aria-label="Upload" className="mb-6" data-testid="p" />,
    );
    expect(container.firstElementChild).toHaveClass("w-full", "mb-6");
    expect(screen.getByTestId("p")).toBe(container.firstElementChild);
  });
});
