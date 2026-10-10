import { ArrowUp } from "@stefan-florescu/icons";
import { render, screen } from "@testing-library/react";

import { Kbd } from "./kbd";

describe("Kbd", () => {
  it("renders a semantic <kbd> element", () => {
    render(<Kbd>Shift</Kbd>);
    const key = screen.getByText("Shift");
    expect(key.tagName).toBe("KBD");
    expect(key).toHaveAttribute("data-slot", "kbd");
  });

  it("uses the key styles by default", () => {
    render(<Kbd>Esc</Kbd>);
    expect(screen.getByText("Esc")).toHaveClass(
      "px-2",
      "py-1.5",
      "text-xs",
      "font-semibold",
      "text-heading",
      "bg-neutral-tertiary",
      "border",
      "border-default-medium",
      "rounded-base",
    );
  });

  it("has a compact size for hints", () => {
    render(<Kbd size="sm">K</Kbd>);
    const key = screen.getByText("K");
    expect(key).toHaveClass("px-1.5", "py-0.5", "rounded");
    expect(key).not.toHaveClass("rounded-base", "py-1.5");
  });

  it("gives an icon-only key a text alternative through its sr-only label", () => {
    render(
      <p>
        Press{" "}
        <Kbd>
          <ArrowUp aria-hidden />
          <span className="sr-only">Arrow key up</span>
        </Kbd>
      </p>,
    );
    const key = screen.getByText("Arrow key up").closest("kbd");
    expect(key).toHaveTextContent("Arrow key up");
    expect(key?.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("merges className and forwards attributes", () => {
    render(
      <Kbd className="me-1" title="Control">
        Ctrl
      </Kbd>,
    );
    const key = screen.getByText("Ctrl");
    expect(key).toHaveClass("me-1", "rounded-base");
    expect(key).toHaveAttribute("title", "Control");
  });
});
