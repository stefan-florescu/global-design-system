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
    render(<Clipboard value="abc" iconOnly label="Copy API key" copiedLabel="API key copied" />);
    await user.click(screen.getByRole("button", { name: "Copy API key" }));
    expect(screen.getByRole("button", { name: "API key copied" })).toBeInTheDocument();
  });

  it("accepts Button styles", () => {
    render(<Clipboard value="abc" variant="outline" size="xs" />);
    expect(screen.getByRole("button", { name: "Copy" })).toHaveClass("border-border", "h-8");
  });
});
