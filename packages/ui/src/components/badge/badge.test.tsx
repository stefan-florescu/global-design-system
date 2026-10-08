import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its label with the brand variant by default", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toHaveClass("bg-brand-subtle", "text-brand-subtle-foreground");
  });

  it("renders a link when given href", () => {
    render(<Badge href="/changelog">Changelog</Badge>);
    expect(screen.getByRole("link", { name: "Changelog" })).toHaveAttribute("href", "/changelog");
  });

  it("shows a named remove button and reports presses", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Badge onDismiss={onDismiss}>React</Badge>);
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("names the remove button with dismissLabel", () => {
    render(
      <Badge onDismiss={() => {}} dismissLabel="Remove React">
        React
      </Badge>,
    );
    expect(screen.getByRole("button", { name: "Remove React" })).toBeInTheDocument();
  });

  it("applies pill, bordered, size and icon-only styles", () => {
    render(
      <Badge pill bordered size="lg" iconOnly>
        <span className="sr-only">Verified</span>
      </Badge>,
    );
    const badge = screen.getByText("Verified").parentElement;
    expect(badge).toHaveClass("rounded-full", "border", "text-sm", "size-7", "p-0");
  });
});
