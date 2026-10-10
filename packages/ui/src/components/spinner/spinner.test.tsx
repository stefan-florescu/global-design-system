import { render, screen } from "@testing-library/react";

import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("is a status region that says it is loading, with the SVG hidden", () => {
    render(<Spinner />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading…");
    expect(screen.getByText("Loading…")).toHaveClass("sr-only");
    const svg = status.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("size-8", "animate-spin", "motion-reduce:animate-none");
  });

  it("draws Flowbite's grey track and brand arc by default", () => {
    const { container } = render(<Spinner />);
    const [track, arc] = container.querySelectorAll("path");
    expect(track).toHaveClass("fill-neutral-tertiary");
    expect(arc).toHaveClass("fill-fg-brand");
  });

  it("takes a label, size, colour and region classes", () => {
    render(<Spinner label="Loading orders" size="xs" variant="danger" className="text-center" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading orders");
    expect(status).toHaveClass("text-center");
    const svg = status.querySelector("svg");
    expect(svg).toHaveClass("size-4");
    expect(svg).not.toHaveClass("size-8");
    expect(svg?.querySelectorAll("path")[1]).toHaveClass("fill-fg-danger");
  });

  it("keeps 3:1 colours in dark mode", () => {
    const { container } = render(<Spinner variant="dark" />);
    expect(container.querySelectorAll("path")[1]).toHaveClass("fill-dark", "dark:fill-body");
  });

  it("renders only a hidden SVG when decorative", () => {
    const { container } = render(
      <button type="button" aria-busy="true">
        <Spinner decorative variant="current" className="me-2" />
        Saving
      </button>,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAccessibleName("Saving");
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("me-2", "size-8");
    const [track, arc] = container.querySelectorAll("path");
    expect(track).toHaveClass("fill-current", "opacity-25");
    expect(arc).toHaveClass("fill-current");
  });

  it("can leave sizing to its container", () => {
    const { container } = render(<Spinner decorative size={null} />);
    expect(container.querySelector("svg")?.getAttribute("class")).not.toMatch(/size-/);
  });
});
