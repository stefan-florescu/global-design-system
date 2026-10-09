import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Clipboard } from "./clipboard";

describe("Clipboard", () => {
  it("copies the value, confirms and announces it", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<Clipboard value="npm install @stefan-florescu/ui" onCopy={onCopy} />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    await expect(navigator.clipboard.readText()).resolves.toBe("npm install @stefan-florescu/ui");
    expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Copied!");
    expect(onCopy).toHaveBeenCalledWith("npm install @stefan-florescu/ui");
  });

  it("returns to its normal state after resetAfter", async () => {
    const user = userEvent.setup();
    render(<Clipboard value="abc" resetAfter={50} />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument());
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("uses the label as the name of an icon-only button", async () => {
    const user = userEvent.setup();
    render(
      <Clipboard
        value="abc"
        variant="ghost"
        iconOnly
        label="Copy API key"
        copiedLabel="API key copied"
      />,
    );
    await user.click(screen.getByRole("button", { name: "Copy API key" }));
    expect(screen.getByRole("button", { name: "API key copied" })).toBeInTheDocument();
  });

  it("is a brand button by default and supports Flowbite's other triggers", () => {
    const { rerender } = render(<Clipboard value="abc" />);
    const button = () => screen.getByRole("button");
    expect(button()).toHaveClass("bg-brand", "text-brand-foreground", "px-4", "py-2.5");
    rerender(<Clipboard value="abc" variant="secondary" />);
    expect(button()).toHaveClass("bg-neutral-secondary-medium", "border-default-medium");
    rerender(<Clipboard value="abc" variant="ghost" size="sm" iconOnly label="Copy" />);
    expect(button()).toHaveClass("text-body", "hover:bg-neutral-quaternary", "p-1.5");
    rerender(<Clipboard value="abc" variant="tertiary" />);
    expect(button()).toHaveClass("bg-neutral-primary-strong", "border-default-strong", "text-xs");
  });

  it("does not copy when disabled", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<Clipboard value="abc" disabled onCopy={onCopy} />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(onCopy).not.toHaveBeenCalled();
  });
});
