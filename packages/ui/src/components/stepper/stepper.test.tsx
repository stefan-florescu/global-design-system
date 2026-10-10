import { render, screen, within } from "@testing-library/react";

import { Stepper, StepperItem, type StepperProps } from "./stepper";

function Steps({ variant }: { variant?: StepperProps["variant"] }) {
  return (
    <Stepper variant={variant} aria-label="Registration progress">
      <StepperItem status="complete" icon={<svg data-testid="icon-1" />} description="Done">
        Personal info
      </StepperItem>
      <StepperItem status="current" icon={<svg data-testid="icon-2" />} description="Now">
        Account info
      </StepperItem>
      <StepperItem icon={<svg data-testid="icon-3" />} description="Later">
        Confirmation
      </StepperItem>
    </Stepper>
  );
}

const variants = ["default", "progress", "detailed", "vertical", "breadcrumb", "timeline"] as const;

describe("Stepper", () => {
  it.each(variants)("%s: is a named ordered list that marks the current step", (variant) => {
    render(<Steps variant={variant} />);
    const list = screen.getByRole("list", { name: "Registration progress" });
    expect(list.tagName).toBe("OL");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[2]).not.toHaveAttribute("aria-current");
  });

  it.each(variants)("%s: says where each step stands in hidden text", (variant) => {
    render(<Steps variant={variant} />);
    const [first, , third] = screen.getAllByRole("listitem");
    expect(first).toHaveTextContent(/Personal info.*, completed/);
    expect(third).toHaveTextContent(/Confirmation.*, not started/);
    const hiddenText = first?.querySelector(".sr-only");
    expect(hiddenText).toHaveTextContent(/, completed$/);
  });

  it("numbers the steps and joins them with hidden connectors in the default stepper", () => {
    const { container } = render(<Steps />);
    const [first, second, third] = screen.getAllByRole("listitem");
    expect(first).toHaveClass("text-fg-brand", "md:w-full");
    expect(first?.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(second).toHaveTextContent(/^2Account info/);
    expect(third).toHaveTextContent(/^3Confirmation/);
    expect(third).not.toHaveClass("md:w-full");
    // One slash and one line after each step but the last, all hidden.
    const hidden = container.querySelectorAll(
      "li > span[aria-hidden], li > span > span[aria-hidden]",
    );
    expect(hidden).toHaveLength(4);
  });

  it("shows a filled number for the current step, so it isn't told by colour alone", () => {
    render(<Steps variant="breadcrumb" />);
    const marker = screen.getAllByRole("listitem")[1]?.querySelector("[data-slot=stepper-marker]");
    expect(marker).toHaveClass("bg-brand", "text-brand-foreground");
  });

  it("hides the names of a progress stepper visually and draws a check once complete", () => {
    render(<Steps variant="progress" />);
    expect(screen.getByText("Personal info, completed")).toHaveClass("sr-only");
    expect(screen.queryByTestId("icon-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("icon-2").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("icon-2").parentElement).toHaveClass("border-brand");
  });

  it("shows descriptions in detailed and timeline steppers", () => {
    render(<Steps variant="timeline" />);
    expect(screen.getByText("Later")).toHaveClass("text-sm");
    expect(screen.getAllByRole("listitem")[2]).toHaveClass("mb-0");
  });

  it("numbers the vertical cards and colours them by status", () => {
    render(<Steps variant="vertical" />);
    const [first, second] = screen.getAllByRole("listitem");
    expect(first).toHaveTextContent(/^1\. Personal info/);
    expect(first?.firstElementChild).toHaveClass("bg-success-soft");
    expect(second?.firstElementChild).toHaveClass("bg-brand-softer", "ring-brand");
  });

  it("takes custom status text and classes", () => {
    render(
      <Stepper className="mb-8">
        <StepperItem status="complete" statusLabel=" (fertig)" className="font-bold">
          Konto
        </StepperItem>
        <StepperItem statusLabel="">Ende</StepperItem>
      </Stepper>,
    );
    const [first, second] = screen.getAllByRole("listitem");
    expect(screen.getByRole("list")).toHaveClass("mb-8");
    expect(first).toHaveTextContent("Konto (fertig)");
    expect(first).toHaveClass("font-bold");
    expect(second).toHaveTextContent(/^2Ende$/);
  });
});
